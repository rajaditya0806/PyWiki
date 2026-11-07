<div align="center">

# 🐍 PyWiki

**A Wikipedia-style knowledge base for Python, built from scratch.**
Data types, operators, keywords, libraries, and a full learning path, all in one fast, dark-themed site.

[![Live Site](https://img.shields.io/badge/Live-pywiki.vercel.app-1f6feb?style=for-the-badge&logo=vercel&logoColor=white)](https://pywiki.vercel.app)

![Python](https://img.shields.io/badge/Python-3.14-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![Jinja2](https://img.shields.io/badge/Jinja2-B41717?logo=jinja&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

</div>

<!-- Add a screenshot here: save it as docs/screenshot.png, then uncomment the next line -->
<!-- ![PyWiki screenshot](docs/screenshot.png) -->

---

## ✨ Features

- **Content-driven.** Every article is a plain Markdown file. Add a file, and it shows up in the sidebar, on the home page, and in search. No code changes.
- **Learning path.** Content is grouped into numbered phases (Phase 0: Setup through Phase 6: Libraries), so the site reads like a roadmap.
- **Instant search.** The browser downloads a small JSON index once, then filters titles and article text as you type. Press `/` anywhere to jump to the search box.
- **Syntax highlighting.** Code blocks are colored with Pygments in a GitHub-dark theme.
- **"On this page" table of contents** generated from each article's headings, with smooth scrolling.
- **Responsive design.** On phones the sidebar becomes a slide-in drawer, and wide tables scroll instead of breaking the page.
- **Custom 404 page** that keeps the site layout and still returns a proper `404` status code.
- **Contact form** in the footer for visitors to leave their email.

---

## 🧰 Tech stack

| Layer | Tool | Why |
|---|---|---|
| Backend | [FastAPI](https://fastapi.tiangolo.com/) | Routing, JSON endpoints, request validation |
| Templates | [Jinja2](https://jinja.palletsprojects.com/) | One shared layout reused by every page |
| Content | Markdown + [Python-Markdown](https://python-markdown.github.io/) | Articles stay as simple text files |
| Highlighting | [Pygments](https://pygments.org/) | Turns code into colorable HTML |
| Frontend | Vanilla HTML, CSS, JavaScript | No framework needed for a site this size |
| Hosting | [Vercel](https://vercel.com/) | Free hosting with auto-deploys from GitHub |

---

## 📁 Project structure

```
python-website/
├── app/
│   ├── main.py             # FastAPI app: routes, article loader, search index
│   ├── templates/
│   │   ├── base.html       # Shared layout: header, sidebar, footer
│   │   ├── home.html       # Home page with phase cards
│   │   ├── article.html    # Article page + table of contents
│   │   └── 404.html
│   └── static/
│       ├── style.css       # Layout, theme, responsive rules
│       ├── highlight.css   # Pygments color theme
│       ├── search.js       # Instant search
│       ├── menu.js         # Mobile drawer
│       └── contact.js      # Contact form
├── content/                # All articles live here
│   ├── 00-setup/
│   ├── 01-basics/
│   ├── 02-intermediate/
│   └── ...
├── requirements.txt
└── README.md
```

---

## 🚀 Run it locally

**1. Clone and enter the project**

```bash
git clone https://github.com/rajaditya0806/PyWiki
cd PyWiki
```

**2. Create and activate a virtual environment**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Start the server**

```bash
uvicorn app.main:app --reload
```

Open <http://127.0.0.1:8000>. The `--reload` flag restarts the server whenever you save a file. FastAPI also generates interactive API docs at `/docs`.

---

## ✍️ Adding an article

1. Pick a phase folder inside `content/`, or create one named `NN-topic-name` (for example `07-testing`).
2. Create a Markdown file with a short, lowercase, hyphenated name, like `decorators.md`.
3. Start the file with a `# Title` line. That line becomes the sidebar label.

````markdown
# Decorators

A **decorator** wraps a function to add behavior without changing its code.

```python
def shout(func):
    def wrapper():
        return func().upper()
    return wrapper
```
````

Refresh the page and the article appears in the sidebar, on the home page, and in search.

**Naming rules to remember**

| Part | Rule |
|---|---|
| Folder name | `NN-name` controls the order. Use two digits so `10` sorts after `02`. The number becomes "Phase N" in the UI. |
| File name | Becomes the URL: `01-basics/lists.md` is served at `/wiki/01-basics/lists`. |
| First line | `# Title` becomes the sidebar and search label. |

---

## 🔍 How it works

- **Article route.** A single route, `/wiki/{category}/{slug}`, maps the URL to `content/<category>/<slug>.md`, converts the Markdown to HTML, and renders it inside `article.html`.
- **Safe file access.** Because the URL decides which file is read, the route resolves the path and rejects anything outside `content/`, which blocks path traversal attacks.
- **Sidebar and home cards.** A loader scans the `content/` folders on each request and passes the result to the templates, so the navigation always matches what's on disk.
- **Search.** `/api/search-index` returns every article as JSON. `search.js` fetches it once and filters in the browser, so there's no network delay per keystroke. This approach suits a wiki of hundreds of pages; a much larger site would need server-side search.

---

## 🧠 What this project taught me

This is a learning project, and building it covered a lot of ground:

- Virtual environments and dependency management with `requirements.txt`
- Routing, path parameters, and JSON endpoints in FastAPI
- Template inheritance with Jinja2 and why auto-escaping protects against XSS
- Path traversal attacks and validating anything that comes from a URL
- CSS flexbox and grid, sticky positioning, and responsive design with media queries
- Fetching data with JavaScript and building DOM elements safely with `textContent`
- Why serverless hosting can't write to local files, and how to handle forms without a backend database
- Deploying with Git and Vercel

---

## 🗺️ Roadmap

- [ ] More articles for every phase (strings, classes, modules, testing, async)
- [ ] Previous / next links at the bottom of articles
- [ ] "Last updated" date on each article
- [ ] Highlight matching words in search results
- [ ] Light theme toggle

---

## 👤 Author

**Aditya Raj**, full stack developer (MERN, FastAPI, AngularJS) working toward a career as a software development engineer.

[GitHub](https://github.com/rajaditya0806) · [LinkedIn](https://www.linkedin.com/in/aditya-raj-663454362)

---

<div align="center">

If this helped you learn something, consider leaving a ⭐

</div>
