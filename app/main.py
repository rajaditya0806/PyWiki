from pathlib import Path
import markdown                                   # NEW
from fastapi import FastAPI, Request, HTTPException  # NEW: HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import re
from datetime import datetime, timezone
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).parent
CONTENT_DIR = BASE_DIR.parent / "content"         # NEW

app = FastAPI(title="PyWiki")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


# NEW: scan content/<category>/<slug>.md and build the sidebar data
def category_label(folder: str) -> str:
    m = re.match(r"^(\d+)-(.+)$", folder)
    if not m:                                   # no number prefix: just prettify the name
        return folder.replace("-", " ").title()
    number, name = m.groups()
    return f"Phase {int(number)} · {name.replace('-', ' ').title()}"


templates.env.filters["label"] = category_label


# NEW: scan content/<category>/<slug>.md and build the sidebar data
def load_articles():
    categories = {}
    for category_dir in sorted(CONTENT_DIR.iterdir()):
        if not category_dir.is_dir():
            continue
        articles = []
        for file in sorted(category_dir.glob("*.md")):
            lines = file.read_text(encoding="utf-8").splitlines()
            title = lines[0].lstrip("# ").strip() if lines else file.stem
            articles.append({"slug": file.stem, "title": title})
        categories[category_dir.name] = articles
    return categories


# NEW: make this function callable from inside ANY template
templates.env.globals["get_categories"] = load_articles


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(request, "home.html", {"title": "Home"})


# NEW: one route that serves every article
@app.get("/wiki/{category}/{slug}")
def article(request: Request, category: str, slug: str):
    path = (CONTENT_DIR / category / f"{slug}.md").resolve()

    if not path.is_relative_to(CONTENT_DIR.resolve()) or not path.is_file():
        raise HTTPException(status_code=404, detail="Article not found")

    text = path.read_text(encoding="utf-8")
    md = markdown.Markdown(
        extensions=["fenced_code", "tables", "codehilite", "toc"],
        extension_configs={
            "codehilite": {"guess_lang": False},
            "toc": {"toc_depth": "2-3"},
        },
    )
    html = md.convert(text)

    title = text.splitlines()[0].lstrip("# ").strip()

    return templates.TemplateResponse(
    request, "article.html",
    {"title": title, "content": html, "toc": md.toc if md.toc_tokens else ""},
    )

@app.get("/api/search-index")
def search_index():
    index = []
    for category, articles in load_articles().items():
        for a in articles:
            path = CONTENT_DIR / category / f"{a['slug']}.md"
            index.append({
                "title": a["title"],
                "category": category,
                "url": f"/wiki/{category}/{a['slug']}",
                "text": path.read_text(encoding="utf-8"),
            })
    return index

@app.exception_handler(404)
async def not_found(request: Request, exc):
    return templates.TemplateResponse(
        request, "404.html", {"title": "Not found"}, status_code=404
    )


## NEW: contact form API endpoint
class Contact(BaseModel):
    email: str = Field(max_length=254)
    message: str = Field(default="", max_length=1000)

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

@app.post("/api/contact")
def contact(data: Contact):
    if not EMAIL_RE.match(data.email):
        raise HTTPException(status_code=422, detail="Please enter a valid email.")

    entry = {
        "email": data.email,
        "message": data.message,
        "time": datetime.now(timezone.utc).isoformat(),
    }
    with open(BASE_DIR.parent / "messages.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")
    return {"ok": True}