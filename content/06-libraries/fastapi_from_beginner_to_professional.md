# FastAPI: From Absolute Beginner to Professional

A practical learning path for building modern Python APIs. This guide assumes basic Python knowledge and takes you from your first endpoint to a tested, database-backed, secure, deployable API.

## What you will learn

- How HTTP and APIs work
- Routes, methods, path and query parameters
- Pydantic validation and response schemas
- Project structure and dependency injection
- SQLAlchemy, databases, and migrations
- CRUD, authentication, testing, and deployment
- Professional API design and security practices

## 1. What is FastAPI?

FastAPI is a Python framework for building APIs. An API lets different applications communicate. For example, a React frontend can send a request to a FastAPI backend, which reads or changes data and returns JSON.

FastAPI is popular because it provides:
- Type-hint-based request validation
- Automatic interactive API documentation
- Support for asynchronous endpoints
- OpenAPI schema generation
- A relatively small, flexible framework

FastAPI is API-focused. Django is a larger, batteries-included web framework with an ORM, admin panel, templates, and authentication tools built in. Choose based on your application rather than assuming one is always better.

## 2. Prerequisites and setup

You should know Python functions, dictionaries, lists, classes, imports, and exceptions. Basic HTML and HTTP knowledge will help.

Check Python:

```bash
python --version
```

Create a project and virtual environment:

```bash
mkdir fastapi-learning
cd fastapi-learning
python -m venv .venv
```

Activate it:

```bash
# Windows Command Prompt
.venv\\Scripts\\activate

# Windows PowerShell
.venv\\Scripts\\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Install FastAPI and its standard development tools:

```bash
python -m pip install "fastapi[standard]"
```

Save dependencies:

```bash
python -m pip freeze > requirements.txt
```

Suggested starting structure:

```text
fastapi-learning/
├── .venv/
├── main.py
├── requirements.txt
└── .gitignore
```

Example `.gitignore`:

```gitignore
.venv/
__pycache__/
*.py[cod]
.env
.pytest_cache/
.coverage
```

Never commit your virtual environment or real secret files.

## 3. Your first API

Create `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, FastAPI!"}
```

Start the development server:

```bash
fastapi dev main.py
```

Visit:
- `http://127.0.0.1:8000/` — your endpoint
- `http://127.0.0.1:8000/docs` — interactive Swagger UI
- `http://127.0.0.1:8000/redoc` — alternative documentation

What each part means:

- `FastAPI()` creates the application.
- `@app.get("/")` registers a GET route at `/`.
- `home()` handles matching requests.
- The returned dictionary becomes a JSON response.

Try changing the message and refreshing the page.

## 4. HTTP and routing fundamentals

An HTTP request contains a method, path, headers, and sometimes a body.

| Method | Typical use |
|---|---|
| GET | Read information |
| POST | Create a resource or trigger an operation |
| PUT | Replace a resource |
| PATCH | Partially update a resource |
| DELETE | Delete a resource |

### Path parameters

A path parameter identifies a particular resource:

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
```

Try `/users/12`. FastAPI converts the value to an integer and validates it.

### Query parameters

Query parameters commonly filter or limit results:

```python
@app.get("/products")
def list_products(category: str | None = None, limit: int = 10):
    return {"category": category, "limit": limit}
```

Try `/products?category=books&limit=5`.

### Status codes

Useful codes include:

- `200 OK`: successful request
- `201 Created`: a resource was created
- `204 No Content`: success with no response body
- `400 Bad Request`: request cannot be processed
- `401 Unauthorized`: authentication is missing or invalid
- `403 Forbidden`: user is not allowed to perform the action
- `404 Not Found`: resource does not exist
- `409 Conflict`: request conflicts with current state
- `422 Unprocessable Content`: input validation failed
- `500 Internal Server Error`: unexpected server error

Set a creation status explicitly:

```python
from fastapi import status

@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user():
    return {"message": "Created"}
```

## 5. Pydantic: request validation

Pydantic models define the shape and validation rules of data. FastAPI uses them to validate JSON request bodies.

```python
from pydantic import BaseModel, Field

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    author: str
    pages: int = Field(gt=0)

@app.post("/books")
def create_book(book: BookCreate):
    return {
        "title": book.title,
        "author": book.author,
        "pages": book.pages
    }
```

Example JSON body:

```json
{
  "title": "Learning Python",
  "author": "Sam",
  "pages": 250
}
```

FastAPI reads the JSON, validates the fields, and passes a `BookCreate` object to the function. Invalid input produces a validation response automatically.

More validation examples:

```python
class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    age: int = Field(ge=13, le=120)
    bio: str | None = None
```

`Field()` can set constraints such as `gt` (greater than), `ge` (greater than or equal), `lt`, `le`, and string length limits.

### Separate input and output models

Do not accept or expose internal fields unnecessarily.

```python
class UserCreate(BaseModel):
    username: str
    password: str

class UserPublic(BaseModel):
    id: int
    username: str
```

The public schema deliberately excludes the password.

## 6. Response models and errors

A response model documents and filters the data returned by an endpoint:

```python
class ProductPublic(BaseModel):
    id: int
    name: str
    price: float

@app.get("/products/{product_id}", response_model=ProductPublic)
def get_product(product_id: int):
    return {
        "id": product_id,
        "name": "Keyboard",
        "price": 1200,
        "internal_note": "Do not expose"
    }
```

Use `HTTPException` for expected HTTP errors:

```python
from fastapi import HTTPException

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id != 1:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": 1, "name": "Notebook"}
```

Use accurate status codes. Do not return a successful status when an operation failed.

## 7. Organising a real application

A single file is fine for your first examples. Larger projects should be separated by responsibility.

```text
app/
├── main.py
├── api/
│   └── routes/
│       ├── users.py
│       └── tasks.py
├── schemas/
│   ├── user.py
│   └── task.py
├── models/
│   └── task.py
├── services/
│   └── task_service.py
├── database.py
└── core/
    └── config.py
```

A router in `app/api/routes/tasks.py`:

```python
from fastapi import APIRouter

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/")
def list_tasks():
    return [{"id": 1, "title": "Learn FastAPI"}]
```

Connect it in `app/main.py`:

```python
from fastapi import FastAPI
from app.api.routes.tasks import router as tasks_router

app = FastAPI(title="Task Manager API")
app.include_router(tasks_router)

@app.get("/")
def home():
    return {"message": "Task Manager API"}
```

Run from the project root:

```bash
fastapi dev app/main.py
```

Typical responsibilities:
- `routes`: HTTP endpoints
- `schemas`: Pydantic input/output models
- `models`: database models
- `services`: business rules
- `database.py`: database setup
- `core`: configuration and security utilities

This is one useful structure, not a framework requirement.

## 8. Dependency injection

Dependency injection supplies a function with something it needs. FastAPI uses `Depends`.

```python
from fastapi import Depends

def get_settings():
    return {"mode": "development"}

@app.get("/settings")
def read_settings(settings: dict = Depends(get_settings)):
    return settings
```

Dependencies are useful for database sessions, authentication checks, shared parameters, and permission checks.

Example API-key dependency (for demonstration only):

```python
from fastapi import Depends, Header, HTTPException

def verify_api_key(x_api_key: str | None = Header(default=None)):
    if x_api_key != "development-key":
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.get("/private", dependencies=[Depends(verify_api_key)])
def private_data():
    return {"message": "Access granted"}
```

Do not hard-code production credentials. Use secure configuration and a proper authentication design.

## 9. Databases with SQLAlchemy

A Python list loses its data when the process stops. A database stores it persistently.

Common databases:
- SQLite: simple local learning and prototypes
- PostgreSQL: widely used production relational database
- MySQL: another established relational database

Install SQLAlchemy:

```bash
python -m pip install sqlalchemy
```

A minimal SQLAlchemy 2.x SQLite setup:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

DATABASE_URL = "sqlite:///./tasks.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    completed: Mapped[bool] = mapped_column(default=False)

Base.metadata.create_all(bind=engine)
```

Key ideas:
- Engine configures the database connection.
- Session represents a unit of work with the database.
- ORM model maps a Python class to a table.
- `create_all()` creates missing tables in this simple example.

For real schema changes, use Alembic migrations rather than expecting `create_all()` to alter existing tables.

A session dependency:

```python
from collections.abc import Generator
from sqlalchemy.orm import Session

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Use it in a route:

```python
from fastapi import Depends
from sqlalchemy.orm import Session

@app.get("/tasks")
def read_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()
```

For a maintainable application, put database operations in a repository or service layer and define intentional response schemas.

## 10. Build a CRUD Task API

CRUD means Create, Read, Update, Delete. First build an in-memory version to understand the HTTP flow; then replace the dictionary with SQLAlchemy.

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="Task Manager")

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: str = ""

class TaskPublic(TaskCreate):
    id: int
    completed: bool = False

tasks: dict[int, TaskPublic] = {}
next_id = 1

@app.post("/tasks", response_model=TaskPublic,
          status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate):
    global next_id
    new_task = TaskPublic(
        id=next_id,
        title=task.title,
        description=task.description,
        completed=False
    )
    tasks[next_id] = new_task
    next_id += 1
    return new_task

@app.get("/tasks", response_model=list[TaskPublic])
def list_tasks():
    return list(tasks.values())

@app.get("/tasks/{task_id}", response_model=TaskPublic)
def get_task(task_id: int):
    task = tasks.get(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.patch("/tasks/{task_id}", response_model=TaskPublic)
def update_task(task_id: int, completed: bool):
    task = tasks.get(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    updated = task.model_copy(update={"completed": completed})
    tasks[task_id] = updated
    return updated

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    del tasks[task_id]
    return None
```

This is a teaching example, not production storage: data disappears after restart, and there is no multi-user isolation.

Test every endpoint in `/docs`: create a task, list tasks, retrieve one, update it, delete it, then verify that retrieving it returns 404.

## 11. Authentication and authorization

Authentication answers “Who are you?” Authorization answers “What are you allowed to do?”

A common API pattern sends a bearer token in the header:

```text
Authorization: Bearer <access-token>
```

FastAPI offers tools such as `OAuth2PasswordBearer` to extract and document bearer tokens. That utility alone is not a complete login system.

A real authentication flow typically includes:
1. User registration.
2. Secure password hashing.
3. Password verification at login.
4. Issuing short-lived access tokens.
5. Token validation on protected routes.
6. Permission checks for each protected operation.
7. Expiry, refresh, revocation, and account recovery planning.

Never store plain-text passwords or invent your own cryptography. Use maintained libraries and follow current security recommendations.

A dependency-shaped demonstration:

```python
from fastapi import Depends

def get_current_user():
    # Real code must validate the token and load the user.
    return {"id": 1, "username": "demo"}

@app.get("/profile")
def profile(user: dict = Depends(get_current_user)):
    return user
```

This is not real authentication. Study the official FastAPI security tutorial before implementing login.

## 12. Async programming and background tasks

Python's `async` and `await` support asynchronous I/O.

```python
@app.get("/async-example")
async def async_example():
    return {"message": "Hello"}
```

Async is useful when an endpoint awaits non-blocking operations such as an async database driver or HTTP client.

Remember:
- `async def` does not automatically speed up CPU-heavy work.
- Blocking functions inside an async endpoint can block the event loop.
- Use async-compatible libraries for non-blocking I/O.
- Consider process pools or separate workers for CPU-heavy work.

Small background task example:

```python
from fastapi import BackgroundTasks

def write_log(message: str):
    with open("activity.log", "a", encoding="utf-8") as file:
        file.write(message + "\\n")

@app.post("/notify")
def notify(background_tasks: BackgroundTasks):
    background_tasks.add_task(write_log, "Notification requested")
    return {"message": "Accepted"}
```

Built-in background tasks suit small jobs. For durable, retryable, long-running work, consider a task queue such as Celery or another job system.

## 13. Middleware, CORS, and configuration

Middleware wraps request handling. It can measure timing or add response headers.

```python
import time
from fastapi import Request

@app.middleware("http")
async def measure_time(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Process-Time"] = str(time.perf_counter() - start)
    return response
```

If a browser frontend and backend have different origins, configure CORS:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)
```

In production, list only trusted frontend origins.

Keep secrets outside source code. A local `.env` file might contain:

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/tasks
SECRET_KEY=replace-with-a-long-random-secret
```

Add `.env` to `.gitignore`. Use a configuration library such as Pydantic Settings and a secure secret manager in production. Never commit real secrets.

## 14. Testing with pytest

Install tools:

```bash
python -m pip install pytest httpx
```

A basic test:

```python
def add(a: int, b: int) -> int:
    return a + b

def test_add():
    assert add(2, 3) == 5
```

Save as `test_math.py`, then run:

```bash
pytest
```

FastAPI's test client:

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_home():
    response = client.get("/")
    assert response.status_code == 200
```

Test valid requests, invalid fields, missing records, unauthorised requests, permission failures, and database errors. Use a separate test database and never run destructive tests against production data.

## 15. Documentation and API versioning

FastAPI generates OpenAPI documentation from routes and type annotations. Add useful descriptions:

```python
@app.get(
    "/health",
    summary="Check API health",
    description="Returns a basic health status."
)
def health():
    return {"status": "healthy"}
```

Group routes with router tags. For larger APIs, version routes:

```python
from fastapi import APIRouter

v1 = APIRouter(prefix="/api/v1")

@v1.get("/status")
def status_check():
    return {"version": 1}

app.include_router(v1)
```

Versioning lets you introduce breaking changes without unexpectedly breaking existing clients. Document supported versions and deprecation plans.

## 16. Production security checklist

Before deployment:
- Validate every external input.
- Hash passwords using a suitable password-hashing library.
- Keep secrets out of Git.
- Use HTTPS.
- Enforce authentication and authorization.
- Restrict CORS to trusted origins.
- Consider request-size and rate limits.
- Avoid exposing stack traces to clients.
- Keep dependencies updated.
- Use database migrations.
- Configure logs and monitoring.
- Back up important data and test restoration.
- Use least-privilege database credentials.
- Never log passwords, tokens, or sensitive personal data.

## 17. Deployment overview

A typical deployment:
1. Push code to Git.
2. Install dependencies from a controlled dependency file.
3. Configure environment variables on the hosting platform.
4. Provision a production database.
5. Run migrations.
6. Start the application using a production ASGI server.
7. Configure HTTPS, logs, health checks, and monitoring.

Example Uvicorn command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The exact command depends on the hosting platform and process manager. A development server command is not automatically a complete production deployment. Learn Docker once you understand the application lifecycle.

## 18. Professional practices and common mistakes

| Common mistake | Better approach |
|---|---|
| Keeping all code in one file | Split routes, schemas, services, and database code |
| Using a list as permanent storage | Use a database |
| Exposing internal fields | Define explicit response schemas |
| Committing secrets | Use environment variables or secret management |
| Assuming `async` makes everything faster | Understand blocking and non-blocking I/O |
| Treating a demo token check as secure auth | Implement and test a complete authentication flow |
| Skipping tests | Test success, validation, and failure cases |
| Using `create_all()` for schema evolution | Use Alembic migrations |

Additional professional habits:
- Use type hints consistently.
- Keep route handlers small.
- Put business rules in services.
- Add pagination to large collections.
- Document errors and authentication requirements.
- Use structured logging instead of scattered `print()` calls.
- Review dependencies and security advisories.

## 19. Exercises

### Beginner
1. Create a `/hello` route that accepts a name as a query parameter.
2. Create `/square/{number}`.
3. Define a product schema with name, price, and stock.
4. Reject a negative price.
5. Return 404 for an unknown product.

### Intermediate
1. Build CRUD endpoints for books.
2. Add category filtering.
3. Add pagination with `skip` and `limit`.
4. Store records in SQLite using SQLAlchemy.
5. Write tests for CRUD operations.
6. Split code into routers, schemas, and services.

### Advanced
1. Add registration and secure login.
2. Restrict each user to their own tasks.
3. Add role-based permissions.
4. Use PostgreSQL and Alembic.
5. Add structured logging and error handling.
6. Add Docker and a CI test workflow.
7. Deploy and monitor the API.

## 20. Capstone: Task Manager API

Build an API with:
- User registration and login
- Secure password hashing and token authentication
- User-specific tasks
- Create, read, update, and delete operations
- Priority, due dates, and task status
- Search, filtering, sorting, and pagination
- PostgreSQL, SQLAlchemy, and Alembic
- Separate Pydantic input/output schemas
- Pytest suite
- Environment-based configuration
- API documentation and deployment instructions

A professional project should be understandable, tested, secure, documented, and maintainable—not merely runnable.

## Quick reference

| Tool or concept | Purpose |
|---|---|
| `FastAPI()` | Creates the application |
| `@app.get()` | Registers a GET endpoint |
| `APIRouter` | Groups related routes |
| Pydantic `BaseModel` | Defines and validates schemas |
| `Field()` | Adds validation constraints |
| `HTTPException` | Returns an HTTP error |
| `Depends()` | Injects dependencies |
| SQLAlchemy | Works with relational databases |
| Alembic | Manages schema migrations |
| `TestClient` | Sends test requests |
| Middleware | Processes requests/responses |
| `BackgroundTasks` | Runs small post-response tasks |

## Recommended learning order

1. HTTP, JSON, and basic routes
2. Path and query parameters
3. Pydantic validation and response models
4. Routers and project structure
5. Dependency injection
6. SQLAlchemy and SQLite
7. CRUD with a database
8. Authentication and authorization
9. Pytest and database testing
10. PostgreSQL and Alembic
11. Deployment, monitoring, and security

## Official resources

- FastAPI: https://fastapi.tiangolo.com/
- FastAPI tutorial: https://fastapi.tiangolo.com/tutorial/
- Pydantic: https://docs.pydantic.dev/
- SQLAlchemy: https://docs.sqlalchemy.org/
- Alembic: https://alembic.sqlalchemy.org/
- Pytest: https://docs.pytest.org/
- Python: https://docs.python.org/3/

---

## Final advice

Do not memorise every feature. Build a small API, inspect requests and responses, read errors carefully, and improve the same project in stages. Start with in-memory CRUD, then add a database, tests, authentication, and deployment. That progression builds real backend skill.
