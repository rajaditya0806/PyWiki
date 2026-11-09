# Django: From Absolute Beginner to Professional

A practical, step-by-step guide to building complete web applications with Python and Django. It starts with your first page and progresses to database-backed applications, authentication, REST APIs, testing, and deployment.

## What you will learn

- How Django handles web requests
- Projects, apps, URLs, views, and templates
- Models, ORM queries, and migrations
- Admin, forms, CRUD, and authentication
- Relationships, static files, and file uploads
- Django REST Framework
- Testing, security, and deployment

## 1. What is Django?

Django is a high-level Python web framework. It helps you build complete web applications, including websites with pages, forms, user accounts, and databases.

Imagine a college portal:
1. A student opens a page in a browser.
2. The browser sends an HTTP request.
3. Django routes it to the correct view.
4. The view may retrieve information from a database.
5. Django returns HTML or another response.
6. The browser displays the result.

Django includes URL routing, an ORM, authentication, forms, templates, an admin interface, security protections, and testing utilities. This is why it is often described as a batteries-included framework.

### Django's MVT architecture

| Part | Responsibility |
|---|---|
| Model | Defines data and database structure |
| View | Handles a request and decides what response to return |
| Template | Defines how information is presented, usually HTML |

For example, a `Student` model describes student records, a view retrieves students, and a template displays them.

## 2. Prerequisites and setup

You should know Python variables, functions, loops, conditionals, lists, dictionaries, classes, imports, and basic HTML. Basic SQL is useful but not required.

Check Python:

```bash
python --version
```

Create a project folder and virtual environment:

```bash
mkdir django-learning
cd django-learning
python -m venv .venv
```

Activate:

```bash
# Windows Command Prompt
.venv\\Scripts\\activate

# Windows PowerShell
.venv\\Scripts\\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Install Django:

```bash
python -m pip install Django
python -m django --version
python -m pip freeze > requirements.txt
```

Use a Django release compatible with your installed Python version.

## 3. Create your first project

Run:

```bash
django-admin startproject config .
```

The dot creates the project in the current directory.

```text
django-learning/
├── .venv/
├── config/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── requirements.txt
```

Start the development server:

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/`.

Important files:
- `settings.py`: project configuration
- `urls.py`: top-level URL routing
- `asgi.py`: ASGI application entry point
- `wsgi.py`: WSGI application entry point
- `manage.py`: command-line utility

Stop the server with `Ctrl + C`.

## 4. Projects and apps

A **project** is the overall website or system. An **app** is a module that handles a particular feature.

A college portal might have `students`, `courses`, `attendance`, and `accounts` apps.

Create an app:

```bash
python manage.py startapp students
```

Register it in `config/settings.py`:

```python
INSTALLED_APPS = [
    # Django's built-in apps...
    "students",
]
```

An app contains files such as `models.py`, `views.py`, `admin.py`, `tests.py`, and a `migrations/` directory.

## 5. URLs, views, and HTTP responses

In `students/views.py`:

```python
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Student Portal!")
```

Create `students/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
]
```

Connect the app in `config/urls.py`:

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("students.urls")),
]
```

Visit the root URL. Django matches the URL and calls the view.

The `request` argument is an `HttpRequest` object containing information about the incoming request. A view returns an HTTP response.

### JSON response

```python
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "healthy"})
```

`JsonResponse` is useful for simple JSON endpoints. For a larger REST API, Django REST Framework is often a better choice.

## 6. Templates and HTML

Templates generate HTML using values supplied by a view.

Create:

```text
students/
└── templates/
    └── students/
        └── home.html
```

`home.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Student Portal</title>
</head>
<body>
    <h1>Welcome, {{ name }}!</h1>
</body>
</html>
```

Update the view:

```python
from django.shortcuts import render

def home(request):
    return render(request, "students/home.html", {"name": "Asha"})
```

`render()` combines a template with a context dictionary and returns an HTTP response.

Template syntax:
- `{{ variable }}` displays a value.
- `{% if condition %}` begins a conditional.
- `{% for item in items %}` begins a loop.
- `{% empty %}` handles an empty loop.
- `{% url 'route_name' %}` builds a URL from a named route.
- `{% extends 'base.html' %}` uses template inheritance.

Example loop:

```html
<ul>
    {% for student in students %}
        <li>{{ student.name }}</li>
    {% empty %}
        <li>No students found.</li>
    {% endfor %}
</ul>
```

Django templates automatically escape many variable values. Do not disable escaping or mark untrusted content as safe without a clear reason.

### Template inheritance

Create a shared `base.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Student Portal{% endblock %}</title>
</head>
<body>
    <nav><a href="/">Home</a></nav>
    <main>{% block content %}{% endblock %}</main>
</body>
</html>
```

A page can extend it:

```html
{% extends "base.html" %}

{% block title %}Home | Student Portal{% endblock %}

{% block content %}
    <h1>Welcome to the portal</h1>
{% endblock %}
```

This avoids repeating the same layout on every page.

## 7. Models and the Django ORM

A model defines data stored in a database.

In `students/models.py`:

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

Common model fields:

| Field | Purpose |
|---|---|
| `CharField` | Short text |
| `TextField` | Longer text |
| `EmailField` | Email-shaped text with validation |
| `IntegerField` | Integer |
| `PositiveIntegerField` | Non-negative integer |
| `BooleanField` | True or false |
| `DateField` | Date |
| `DateTimeField` | Date and time |
| `DecimalField` | Fixed-precision decimal |
| `ForeignKey` | Many-to-one relationship |
| `ManyToManyField` | Many-to-many relationship |
| `OneToOneField` | One-to-one relationship |

### Use the ORM

Open the Django shell:

```bash
python manage.py shell
```

Then:

```python
from students.models import Student

student = Student.objects.create(
    name="Asha",
    email="asha@example.com",
    age=19
)

all_students = Student.objects.all()
one_student = Student.objects.get(id=1)
```

Useful queries:

```python
Student.objects.filter(age__gte=18)
Student.objects.filter(name__icontains="ash")
Student.objects.exclude(age=20)
Student.objects.order_by("name")
Student.objects.count()
```

`filter()` returns a QuerySet, which represents a collection of database results. QuerySets are generally lazy: the database query is not necessarily executed until results are needed.

## 8. Migrations

A migration records a database schema change.

After creating or changing a model:

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```

- `makemigrations` creates migration instructions.
- `migrate` applies those instructions to the database.

Django's starter project uses SQLite, which is convenient for learning. For team and production projects, consider PostgreSQL.

Professional migration habits:
- Commit migration files to Git.
- Review migrations before applying them.
- Back up important data.
- Do not casually delete migrations that have been shared or applied.

## 9. Django admin

Django includes an admin site for trusted staff to manage application data.

Create an administrator:

```bash
python manage.py createsuperuser
```

Register your model in `students/admin.py`:

```python
from django.contrib import admin
from .models import Student

admin.site.register(Student)
```

Visit `http://127.0.0.1:8000/admin/` and log in.

Customise the list:

```python
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "age", "joined_at")
    search_fields = ("name", "email")
    list_filter = ("age",)
```

The admin is useful for internal management. It is not automatically a replacement for a carefully designed public-facing interface.

## 10. Forms and validation

Forms collect and validate user input. A `ModelForm` can be generated from a model.

Create `students/forms.py`:

```python
from django import forms
from .models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ["name", "email", "age"]
```

Use it in a view:

```python
from django.shortcuts import redirect, render
from .forms import StudentForm

def create_student(request):
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("student_list")
    else:
        form = StudentForm()

    return render(request, "students/student_form.html", {"form": form})
```

Template:

```html
<h1>Add a student</h1>
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Save</button>
</form>
```

`form.is_valid()` runs validation. `form.save()` creates the model record.

The CSRF token helps protect against cross-site request forgery. Include it in internal POST forms; do not disable CSRF protection as a quick fix.

## 11. Build CRUD pages

CRUD means Create, Read, Update, and Delete.

### List records

```python
from django.shortcuts import render
from .models import Student

def student_list(request):
    students = Student.objects.all().order_by("name")
    return render(request, "students/student_list.html", {"students": students})
```

### Retrieve one record

```python
from django.shortcuts import get_object_or_404, render

def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    return render(request, "students/student_detail.html", {"student": student})
```

### Update a record

```python
from django.shortcuts import get_object_or_404, redirect, render
from .forms import StudentForm
from .models import Student

def update_student(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == "POST":
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return redirect("student_list")
    else:
        form = StudentForm(instance=student)

    return render(request, "students/student_form.html", {"form": form})
```

### Delete a record

```python
def delete_student(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == "POST":
        student.delete()
        return redirect("student_list")

    return render(
        request,
        "students/student_confirm_delete.html",
        {"student": student}
    )
```

Do not delete data through a GET request. GET should be safe and should not perform destructive actions. In a real application, also restrict create, update, and delete operations to authorised users.

Example URL patterns:

```python
urlpatterns = [
    path("students/", views.student_list, name="student_list"),
    path("students/<int:pk>/", views.student_detail, name="student_detail"),
    path("students/add/", views.create_student, name="student_create"),
    path("students/<int:pk>/edit/", views.update_student, name="student_update"),
    path("students/<int:pk>/delete/", views.delete_student, name="student_delete"),
]
```

## 12. Authentication and authorization

Django includes a built-in authentication system:
- User model
- Password hashing
- Login and logout utilities
- Password change and reset views
- Groups and permissions
- Session-based authentication

A simplified login example:

```python
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("home")

    return render(request, "accounts/login.html")
```

This is introductory, not a complete production login flow. A real form should display validation errors, use CSRF protection, handle redirects safely, and follow Django's authentication guidance. Django's built-in authentication views are often preferable.

Protect a view:

```python
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, "dashboard.html")
```

Require a permission:

```python
from django.contrib.auth.decorators import permission_required

@permission_required("students.change_student", raise_exception=True)
def edit_student(request, pk):
    ...
```

Authentication asks who the user is. Authorization decides what they may do. Always enforce permissions on the server; hiding a button in HTML is not security.

## 13. Static files and uploaded media

Static files are assets such as CSS, JavaScript, and logos included with your application.

Example:

```text
students/
└── static/
    └── students/
        └── style.css
```

Load a static file:

```html
{% load static %}
<link rel="stylesheet" href="{% static 'students/style.css' %}">
```

Media files are uploaded by users. Example model:

```python
class Profile(models.Model):
    photo = models.ImageField(upload_to="profile_photos/")
```

Install Pillow for `ImageField`:

```bash
python -m pip install Pillow
```

Configure `MEDIA_URL` and `MEDIA_ROOT` for development. Uploaded files are untrusted input: validate file type and size, control access, and use safe storage. A filename or browser-provided content type does not prove a file is safe.

Django's development server is not a production static/media file server. Use appropriate production storage or web-server configuration.

## 14. Relationships and advanced ORM

A course can have many assignments:

```python
class Course(models.Model):
    title = models.CharField(max_length=100)

class Assignment(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="assignments"
    )
    title = models.CharField(max_length=100)
```

`ForeignKey` is a many-to-one relationship. `on_delete` defines what happens to related records when the referenced object is deleted.

Many-to-many example:

```python
class Student(models.Model):
    name = models.CharField(max_length=100)
    courses = models.ManyToManyField(Course, related_name="students")
```

A student can enrol in multiple courses, and each course can have multiple students.

### Query optimisation

Related-object access can create many database queries. Learn:
- `select_related()` for foreign-key and one-to-one relationships
- `prefetch_related()` for many-to-many and reverse relationships

Example:

```python
assignments = Assignment.objects.select_related("course").all()
```

Other useful ORM features:
- `Q` objects for complex conditions
- `F` expressions for database-side field operations
- `annotate()` for calculated values
- `aggregate()` for summary calculations
- `values()` and `values_list()` for selected fields
- `transaction.atomic()` for database transactions

Inspect queries and measure before optimising.

## 15. Django REST Framework

Django is excellent for server-rendered applications. If you need a REST API for a React, mobile, or other frontend, Django REST Framework (DRF) is a popular extension.

Install it:

```bash
python -m pip install djangorestframework
```

Add it to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    "rest_framework",
]
```

A serializer converts model instances into representations such as JSON and validates incoming data.

Create `students/serializers.py`:

```python
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "name", "email", "age", "joined_at"]
        read_only_fields = ["id", "joined_at"]
```

Create a generic API view:

```python
from rest_framework import generics
from .models import Student
from .serializers import StudentSerializer

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
```

Connect the route:

```python
from django.urls import path
from .views import StudentListCreateView

urlpatterns = [
    path("api/students/", StudentListCreateView.as_view(), name="api_students"),
]
```

This provides list and create operations.

DRF also provides:
- Serializers and ModelSerializers
- Generic views
- ViewSets and routers
- Authentication and permissions
- Pagination and filtering
- Browsable API

Learn DRF after understanding Django models, views, URLs, and requests. Django forms and DRF serializers solve related but different problems.

## 16. Testing

Django includes a test framework based on Python's `unittest` concepts.

In `students/tests.py`:

```python
from django.test import TestCase
from .models import Student

class StudentModelTests(TestCase):
    def test_student_string_representation(self):
        student = Student.objects.create(
            name="Asha",
            email="asha@example.com",
            age=19
        )
        self.assertEqual(str(student), "Asha")
```

Run:

```bash
python manage.py test
```

Test a page:

```python
from django.test import TestCase
from django.urls import reverse

class StudentPageTests(TestCase):
    def test_home_page(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
```

Test models, forms, URLs, views, templates, authentication, permissions, API responses, and failure cases. Use the test database, not production data.

## 17. Security and production readiness

Django provides important protections, but developers must configure and use them correctly.

Before production:
- Set `DEBUG = False`.
- Set `ALLOWED_HOSTS` to the domains serving the app.
- Keep `SECRET_KEY` private and load it securely.
- Use HTTPS.
- Configure secure cookies and trusted origins.
- Keep CSRF protection enabled for session-authenticated forms.
- Enforce permissions on the server.
- Validate uploaded files.
- Keep Django and dependencies updated.
- Avoid exposing detailed exception pages.
- Back up data and test recovery.
- Protect admin accounts.
- Never log passwords, session identifiers, or secret tokens.

Run:

```bash
python manage.py check --deploy
```

Review the warnings. This is a useful check, not a guarantee that your application is secure.

## 18. Deployment overview

A typical deployment involves:
1. Choose a hosting platform.
2. Provision a production database.
3. Configure environment variables and secrets.
4. Set `DEBUG = False` and configure `ALLOWED_HOSTS`.
5. Install dependencies.
6. Run migrations.
7. Collect static files.
8. Start the application using a production WSGI or ASGI server.
9. Configure HTTPS, logs, monitoring, and backups.

Collect static files:

```bash
python manage.py collectstatic
```

Django supports WSGI and ASGI. Common server choices include Gunicorn for WSGI and Uvicorn or another ASGI server for ASGI applications. Choose based on your application and hosting setup.

Do not use `python manage.py runserver` as your production server.

## 19. Professional practices and common mistakes

| Mistake | Better approach |
|---|---|
| Confusing a project with an app | Project is the whole site; apps are feature modules |
| Forgetting to register an app | Add it to `INSTALLED_APPS` |
| Changing models but not migrating | Run `makemigrations` and `migrate` |
| Putting every feature in one app | Split features when boundaries become clear |
| Deleting data through GET | Use POST or another appropriate unsafe method |
| Omitting CSRF tokens | Include `{% csrf_token %}` in internal POST forms |
| Hiding buttons instead of enforcing permissions | Check permissions on the server |
| Using `runserver` in production | Use a production server |
| Exposing every model field | Expose only intended fields |
| Ignoring slow ORM queries | Inspect queries and optimise measured bottlenecks |

Professional habits:
- Keep apps focused on clear responsibilities.
- Use named URL patterns and `reverse()` or `{% url %}`.
- Keep business logic organised and testable.
- Use forms or serializers for validation.
- Commit migrations to version control.
- Add pagination for large lists.
- Keep secrets outside source control.
- Write tests for important behaviour.
- Follow Django's deployment checklist.

## 20. Exercises

### Beginner
1. Create a `/hello/` page.
2. Pass a name from a view to a template.
3. Create a `Book` model.
4. Add books through the admin panel.
5. Display all books on a page.
6. Add a form to create a book.

### Intermediate
1. Build CRUD pages for students.
2. Add search by student name.
3. Add pagination.
4. Connect students and courses.
5. Protect a dashboard with login.
6. Test models, forms, and views.
7. Add CSS using static files.

### Advanced
1. Add groups and role-based permissions.
2. Build a REST API using DRF.
3. Add API filtering, ordering, and pagination.
4. Use PostgreSQL.
5. Optimise ORM queries.
6. Add secure file uploads.
7. Add Docker and automated tests in CI.
8. Deploy with HTTPS and monitoring.

## 21. Capstone: Student Portal

Build a portal with:
- Student registration and login
- Student profiles
- Course catalogue and enrolment
- Attendance records
- Assignment submissions
- Staff/admin management
- Search and pagination
- Role-based permissions
- Django ORM and PostgreSQL
- Validated forms
- REST API using Django REST Framework
- Automated tests
- Secure deployment instructions

Suggested structure:

```text
student_portal/
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── accounts/
├── students/
├── courses/
├── attendance/
├── assignments/
├── templates/
├── static/
├── manage.py
└── requirements.txt
```

Start with students and courses. Add one feature at a time and test it before moving on.

## Quick reference

| Command or concept | Purpose |
|---|---|
| `django-admin startproject` | Creates a project |
| `python manage.py startapp` | Creates an app |
| `python manage.py runserver` | Starts development server |
| `python manage.py makemigrations` | Creates migration files |
| `python manage.py migrate` | Applies migrations |
| `python manage.py createsuperuser` | Creates an admin account |
| `python manage.py shell` | Opens Django shell |
| `python manage.py test` | Runs tests |
| `python manage.py collectstatic` | Collects static assets |
| `models.Model` | Base class for database models |
| `render()` | Renders a template |
| `redirect()` | Redirects to a URL |
| `get_object_or_404()` | Gets an object or returns 404 |
| `ModelForm` | Builds a form from a model |
| Django ORM | Queries and updates database records |
| Django REST Framework | Adds tools for REST APIs |

## Recommended learning order

1. Project and app distinction
2. URLs, views, and HTTP responses
3. Templates and template inheritance
4. Models, ORM, and migrations
5. Admin panel
6. Forms and CRUD pages
7. Authentication, sessions, and permissions
8. Static files and uploads
9. Relationships and query optimisation
10. Django REST Framework
11. Testing
12. Production configuration and deployment

## Official resources

- Django documentation: https://docs.djangoproject.com/
- Getting started: https://docs.djangoproject.com/en/stable/intro/
- Official tutorial: https://docs.djangoproject.com/en/stable/intro/tutorial01/
- Django topics: https://docs.djangoproject.com/en/stable/topics/
- Django REST Framework: https://www.django-rest-framework.org/
- Python documentation: https://docs.python.org/3/
- PostgreSQL documentation: https://www.postgresql.org/docs/

---

## Final advice

Learn Django by building one feature at a time. First make a page work, then connect a model, add a form, and introduce login and permissions. Once you understand the request-to-database-to-response flow, learn Django REST Framework if your projects need a separate frontend or mobile app.

Professional ability comes from building, testing, debugging, deploying, and maintaining applications—not simply memorising framework features.
