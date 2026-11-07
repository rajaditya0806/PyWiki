# Phase 4: The Professional Developer's Toolkit
### Writing Clean, Maintainable and Professional Python Code

Welcome to Phase 4 of Python Programming!

In the previous phases, we learned Python fundamentals, functions, file handling, Object-Oriented Programming (OOP), generators, iterators and decorators.

By now, you should be comfortable writing Python programs and understanding how different concepts work together.

But there is an important difference between writing code that works and writing code that is professionally organized.

Imagine working on a project with thousands of lines of code, multiple developers and several external libraries.

Some questions immediately arise:

- How do we manage all the libraries required by our project?
- How do we prevent different projects from interfering with each other?
- How do we organize our code properly?
- How do we test our programs before releasing them?
- How do we make our code readable for other developers?

This phase focuses on answering these questions.

We will cover:

1. Package Management using pip.
2. Virtual Environments using venv.
3. Important Python Standard Library Modules.
4. Unit Testing using unittest and pytest.
5. Writing clean code using PEP 8.

Let's get started!

---

# 1. Package Management in Python

## 1.1 What is a Package?

A package is a collection of Python modules organized together to provide specific functionality.

For example, Python developers frequently use external packages for:

- Data Analysis
- Machine Learning
- Web Development
- API Development
- Automation
- Data Visualization

Some popular Python packages include:

| Package | Purpose |
|---|---|
| NumPy | Numerical computing |
| Pandas | Data analysis and manipulation |
| Matplotlib | Data visualization |
| Requests | Making HTTP requests |
| Flask | Web development |
| Django | Web development |
| FastAPI | Building APIs |
| Scikit-learn | Machine Learning |

Python does not include every possible functionality by default.

Instead, developers can install additional packages whenever required.

This is where `pip` comes in.

## 1.2 What is pip?

PIP is Python's standard package installer.

It allows us to install, update, uninstall and manage external Python packages.

Think of pip as an app store for Python libraries.

Instead of manually downloading and configuring every library, you can install them directly using terminal commands.

### Checking pip Installation

Open your terminal and execute:

**Windows:**

```bash
py -m pip --version
```

**macOS / Linux:**

```bash
python3 -m pip --version
```

If pip is installed, you will see its version and installation location.

## 1.3 Installing a Package

Let's install a popular Python library called NumPy.

**Windows:**

```bash
py -m pip install numpy
```

**macOS / Linux:**

```bash
python3 -m pip install numpy
```

After installation, you can use NumPy in your Python program.

Example:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])

print(numbers)
print(numbers.mean())
```

**Output:**

```text
[10 20 30 40]
25.0
```

Here:

- `import numpy` imports the library.
- `as np` gives it a shorter name.
- `np.array()` creates a NumPy array.
- `mean()` calculates the average.

## 1.4 Important pip Commands

Here are some useful commands you should know.

| Command | Purpose |
|---|---|
| `python -m pip install numpy` | Install a package |
| `python -m pip uninstall numpy` | Uninstall a package |
| `python -m pip list` | Display installed packages |
| `python -m pip show numpy` | Display package information |
| `python -m pip install --upgrade numpy` | Update a package |
| `python -m pip freeze` | Display installed packages and versions |
| `python -m pip check` | Check installed package dependencies |

On Windows, you can use `py` instead of `python` if that is how Python is configured. On macOS/Linux, you may need `python3`.

## 1.5 Understanding requirements.txt

Imagine that you have developed a Python project that uses:

- NumPy
- Pandas
- Requests

Now suppose another developer wants to run your project on their computer.

They also need to install these packages.

But how will they know which packages your project requires?

This is where `requirements.txt` comes in.

A `requirements.txt` file contains the external dependencies required by your project.

### Step 1: Generate requirements.txt

Run:

```bash
python -m pip freeze > requirements.txt
```

This creates a file named `requirements.txt`.

Its contents might look something like this:

```text
numpy==2.2.0
pandas==2.2.3
requests==2.32.3
```

The version numbers above are examples.

### Step 2: Install Dependencies from requirements.txt

Suppose someone downloads your project and wants to install all its dependencies.

They can simply run:

```bash
python -m pip install -r requirements.txt
```

Python's package installer will install the listed packages.

**Why is this useful?**

- Makes projects easier to share.
- Helps maintain consistent package versions.
- Simplifies project setup.
- Makes collaboration easier.

**Important:** `pip freeze` records packages installed in the current Python environment. This is why using a virtual environment before generating `requirements.txt` is recommended.

---

# 2. Virtual Environments Using venv

## 2.1 What is a Virtual Environment?

A virtual environment is an isolated Python environment created for a particular project.

It allows you to install packages separately for different projects without affecting one another.

Let's understand this with an example.

Imagine you are working on two projects:

**Project A:**

- Uses NumPy version 1.x.
- Uses Pandas version 2.x.

**Project B:**

- Requires a newer NumPy version.
- Uses a different set of libraries.

If both projects use the same Python environment, package requirements might conflict.

A virtual environment solves this problem by keeping their dependencies separate.

Think of virtual environments as separate workspaces for different Python projects.

## 2.2 Creating a Virtual Environment

Python provides a built-in module called `venv` for creating virtual environments.

Let's create one.

### Step 1: Create a Project Folder

Create a folder named:

```text
MyPythonProject
```

Open this folder in VS Code.

### Step 2: Open the Terminal

Open the integrated terminal in VS Code.

Make sure the terminal is currently inside your project folder.

### Step 3: Create the Virtual Environment

Run the following command.

**Windows:**

```bash
py -m venv .venv
```

**macOS / Linux:**

```bash
python3 -m venv .venv
```

This creates a folder named `.venv` inside your project.

Your project structure will look something like this:

```text
MyPythonProject/
│
├── .venv/
│
└── main.py
```

The `.venv` folder contains the isolated Python environment.

## 2.3 Activating the Virtual Environment

Creating a virtual environment is not enough. We also need to activate it.

**Windows (Command Prompt):**

```bash
.venv\Scripts\activate.bat
```

**Windows (PowerShell):**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source .venv/bin/activate
```

Once activated, you should see something similar to:

```text
(.venv)
```

before your terminal prompt.

This indicates that the virtual environment is active.

**Note:** If PowerShell blocks the activation script because of its execution policy, you can use Command Prompt or configure the policy according to Microsoft's security guidance. Do not disable security protections globally just to activate an environment.

## 2.4 Installing Packages Inside a Virtual Environment

Now let's install NumPy.

```bash
python -m pip install numpy
```

Since the virtual environment is activated, NumPy will be installed inside that environment.

It will not be installed into your other project environments.

You can verify this using:

```bash
python -m pip list
```

## 2.5 Deactivating a Virtual Environment

Once you finish working, you can deactivate the environment.

```bash
deactivate
```

Your terminal will return to the normal Python environment.

You can activate it again whenever you want to continue working.

## 2.6 Selecting a Virtual Environment in VS Code

Sometimes VS Code may not automatically detect the virtual environment.

To select it:

1. Open VS Code.
2. Press `Ctrl + Shift + P` on Windows/Linux or `Cmd + Shift + P` on macOS.
3. Search for `Python: Select Interpreter`.
4. Select the Python interpreter located inside your `.venv` folder.

This ensures that VS Code uses the correct environment when executing your program.

## 2.7 What Should You Add to .gitignore?

When uploading Python projects to GitHub, you should generally avoid uploading the `.venv` folder.

It contains installed packages and environment-specific files that can be recreated by other developers.

Create a `.gitignore` file in your project folder:

```gitignore
# Virtual environment
.venv/
venv/

# Python cache files
__pycache__/
*.py[cod]

# Environment variables
.env

# Test and coverage files
.pytest_cache/
.coverage
htmlcov/
```

Now Git will ignore these files and folders.

Other developers can recreate your environment using your `requirements.txt` file.

### Quick Revision

| Command | Purpose |
|---|---|
| `python -m venv .venv` | Create a virtual environment |
| `.venv\Scripts\activate` | Activate on Windows (Command Prompt syntax differs) |
| `source .venv/bin/activate` | Activate on macOS/Linux |
| `deactivate` | Deactivate environment |
| `python -m pip install numpy` | Install a package |
| `python -m pip freeze > requirements.txt` | Generate dependency list |
| `python -m pip install -r requirements.txt` | Install project dependencies |

---

# 3. The Python Standard Library

## 3.1 What is the Standard Library?

The Python Standard Library is a collection of modules that come bundled with Python.

These modules provide useful functionality without requiring you to install additional third-party packages.

For example, Python already provides modules for:

- Mathematical calculations.
- Working with dates and time.
- Managing files and directories.
- Accessing system information.
- Working with collections.
- Handling file paths.

Let's explore some important modules.

## 3.2 The os Module

The `os` module allows Python programs to interact with the operating system.

It is useful for working with files, folders, environment variables and system-related operations.

### Example 1: Getting the Current Working Directory

```python
import os

print(os.getcwd())
```

**Output (example):**

```text
C:\Users\Rahul\PythonProject
```

`os.getcwd()` returns the current working directory.

### Example 2: Creating a Directory

```python
import os

os.mkdir("MyFolder")
```

This creates a directory named `MyFolder` in the current working directory.

### Example 3: Listing Files and Folders

```python
import os

files = os.listdir(".")

print(files)
```

The `.` represents the current directory.

The program displays the files and folders present there.

### Example 4: Checking Whether a File Exists

```python
import os

if os.path.exists("data.txt"):
    print("File exists!")

else:
    print("File does not exist!")
```

This is useful when working with external files.

## 3.3 The sys Module

The `sys` module provides access to information and functionality related to the Python interpreter.

It allows us to interact with the Python runtime.

### Example 1: Checking Python Version

```python
import sys

print(sys.version)
```

This displays the Python version currently being used.

### Example 2: Accessing Command-Line Arguments

You can pass information to a Python program through the terminal.

Create a file named `main.py`:

```python
import sys

print(sys.argv)
```

Run it using:

```bash
python main.py Rahul 20 CSE
```

**Output:**

```text
['main.py', 'Rahul', '20', 'CSE']
```

Here:

- `sys.argv` is a list of command-line arguments.
- The first element is the script name.
- The remaining elements are the arguments passed to the program.

### Example 3: Exiting a Program

```python
import sys

print("Program started")

sys.exit()

print("This line will not execute")
```

**Output:**

```text
Program started
```

`sys.exit()` terminates the program by raising the `SystemExit` exception.

## 3.4 The datetime Module

The `datetime` module is used to work with dates and times.

It is useful in applications involving:

- Attendance systems.
- Banking transactions.
- Event scheduling.
- Booking systems.
- Time tracking.

### Example 1: Getting the Current Date and Time

```python
from datetime import datetime

now = datetime.now()

print(now)
```

**Output (example):**

```text
2026-11-07 12:30:45.123456
```

The actual output depends on your system's date and time.

### Example 2: Getting Only the Current Date

```python
from datetime import date

today = date.today()

print(today)
```

**Output (example):**

```text
2026-11-07
```

### Example 3: Formatting Dates

Python allows us to format dates using `strftime()`.

```python
from datetime import datetime

now = datetime.now()

formatted = now.strftime("%d-%m-%Y")

print(formatted)
```

**Output (example):**

```text
07-11-2026
```

Some commonly used formatting codes:

| Code | Meaning |
|---|---|
| `%d` | Day |
| `%m` | Month |
| `%Y` | Four-digit year |
| `%y` | Two-digit year |
| `%H` | Hour (24-hour format) |
| `%M` | Minute |
| `%S` | Second |
| `%A` | Full weekday name |
| `%B` | Full month name |

### Example 4: Calculating the Difference Between Dates

```python
from datetime import date

date1 = date(2026, 1, 1)
date2 = date(2026, 1, 10)

difference = date2 - date1

print(difference.days)
```

**Output:**

```text
9
```

This is useful when calculating deadlines or the number of days between events.

## 3.5 The math Module

The `math` module provides mathematical functions and constants.

It is useful for calculations that go beyond basic arithmetic.

### Example 1: Square Root

```python
import math

print(math.sqrt(25))
```

**Output:**

```text
5.0
```

### Example 2: Factorial

```python
import math

print(math.factorial(5))
```

**Output:**

```text
120
```

### Example 3: Ceiling and Floor

```python
import math

print(math.ceil(4.2))
print(math.floor(4.8))
```

**Output:**

```text
5
4
```

- `ceil()` rounds a number upward to the nearest integer.
- `floor()` rounds a number downward to the nearest integer.

### Example 4: Mathematical Constants

```python
import math

print(math.pi)
print(math.e)
```

**Output:**

```text
3.141592653589793
2.718281828459045
```

Some commonly used functions:

| Function | Purpose |
|---|---|
| `math.sqrt(x)` | Square root |
| `math.factorial(x)` | Factorial |
| `math.ceil(x)` | Round upward |
| `math.floor(x)` | Round downward |
| `math.pow(x, y)` | Raise x to power y |
| `math.sin(x)` | Sine |
| `math.cos(x)` | Cosine |
| `math.log(x)` | Natural logarithm |

**Note:** Trigonometric functions such as `sin()` and `cos()` accept angles in radians, not degrees.

## 3.6 The collections Module

The `collections` module provides specialized container data types.

These are useful when normal Python lists, tuples and dictionaries are not sufficient for a particular task.

Let's explore some commonly used ones.

### A. Counter

`Counter` counts how many times each element appears in an iterable.

Example:

```python
from collections import Counter

numbers = [1, 2, 2, 3, 3, 3, 4]

result = Counter(numbers)

print(result)
```

**Output:**

```text
Counter({3: 3, 2: 2, 1: 1, 4: 1})
```

Here, Counter tells us how frequently each number occurs.

It is useful for:

- Counting words.
- Counting characters.
- Analysing datasets.
- Finding the frequency of elements.

### B. defaultdict

A `defaultdict` is a dictionary that automatically creates a default value when a missing key is accessed.

Example:

```python
from collections import defaultdict

marks = defaultdict(int)

marks["Rahul"] += 10
marks["Aman"] += 20

print(marks)
```

**Output:**

```text
defaultdict(<class 'int'>, {'Rahul': 10, 'Aman': 20})
```

Here, `int` provides a default value of `0`.

Therefore, we can increase the value of a key without manually checking whether it exists.

### C. deque

A deque (double-ended queue) allows us to efficiently add and remove elements from both ends.

Example:

```python
from collections import deque

numbers = deque([10, 20, 30])

numbers.append(40)
numbers.appendleft(5)

print(numbers)
```

**Output:**

```text
deque([5, 10, 20, 30, 40])
```

We can also remove elements:

```python
numbers.pop()
numbers.popleft()

print(numbers)
```

**Output:**

```text
deque([10, 20, 30])
```

Deque is particularly useful when implementing:

- Queues.
- Sliding window algorithms.
- Breadth-First Search (BFS).
- Task scheduling systems.

## 3.7 The pathlib Module

The `pathlib` module provides an object-oriented way to work with filesystem paths.

It is often more convenient and readable than manually constructing file paths using strings.

### Example 1: Creating a Path

```python
from pathlib import Path

path = Path("data.txt")

print(path)
```

### Example 2: Checking Whether a File Exists

```python
from pathlib import Path

path = Path("data.txt")

if path.exists():
    print("File exists!")

else:
    print("File does not exist!")
```

### Example 3: Getting File Information

```python
from pathlib import Path

path = Path("data.txt")

print(path.name)
print(path.suffix)
print(path.stem)
```

If the file is named `data.txt`, the output will be:

```text
data.txt
.txt
data
```

- `name`: Complete filename.
- `suffix`: File extension.
- `stem`: Filename without extension.

### Example 4: Reading and Writing Files

```python
from pathlib import Path

path = Path("data.txt")

path.write_text("Hello Python!")

content = path.read_text()

print(content)
```

**Output:**

```text
Hello Python!
```

For simple text-file operations, `pathlib` provides convenient methods.

### os vs pathlib

| os Module | pathlib Module |
|---|---|
| Provides operating-system functionality | Provides object-oriented path handling |
| Uses functions such as `os.listdir()` | Uses methods such as `Path.iterdir()` |
| Commonly uses path strings | Uses Path objects |
| Useful for broader OS interactions | Particularly useful for filesystem paths |

---

# 4. Testing in Python

## 4.1 What is Software Testing?

Imagine you have developed a calculator application.

You have implemented:

- Addition.
- Subtraction.
- Multiplication.
- Division.

You test addition manually, and it works.

But what about the other operations?

What if your division function accidentally returns an incorrect result?

What if a change in one function breaks another function?

Testing helps us identify these problems before our software is used by others.

In simple words:

**Software testing is the process of checking whether a program behaves as expected.**

## 4.2 What is Unit Testing?

Unit testing is a type of software testing in which individual parts of a program are tested independently.

For example, suppose you have a calculator.

You can test each function separately:

- Does addition return the correct sum?
- Does subtraction return the correct difference?
- Does multiplication work?
- Does division handle zero correctly?

Each individual test checks a small unit of your application.

## 4.3 Writing Your First Unit Test Using unittest

Python provides a built-in testing framework called `unittest`.

You do not need to install anything separately.

Let's create a simple calculator.

### Step 1: Create calculator.py

```python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):

    if b == 0:
        raise ValueError("Cannot divide by zero")

    return a / b
```

This file contains our calculator functions.

### Step 2: Create test_calculator.py

Now create another file named `test_calculator.py`.

```python
import unittest

from calculator import add, subtract, multiply, divide


class TestCalculator(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(10, 20), 30)

    def test_subtract(self):
        self.assertEqual(subtract(20, 10), 10)

    def test_multiply(self):
        self.assertEqual(multiply(5, 4), 20)

    def test_divide(self):
        self.assertEqual(divide(20, 5), 4)

    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)


if __name__ == "__main__":
    unittest.main()
```

### Step 3: Run the Tests

Open your terminal and execute:

```bash
python -m unittest -v
```

**Expected Output (simplified):**

```text
test_add ... ok
test_divide ... ok
test_divide_by_zero ... ok
test_multiply ... ok
test_subtract ... ok

Ran 5 tests

OK
```

If all tests pass, your functions are behaving as expected for the tested inputs.

## 4.4 Understanding Important unittest Methods

Python's unittest framework provides several assertion methods.

Assertions are statements used to check whether a condition is true.

Some commonly used assertions are:

| Method | Purpose |
|---|---|
| `assertEqual(a, b)` | Checks whether two values are equal |
| `assertNotEqual(a, b)` | Checks whether two values are different |
| `assertTrue(x)` | Checks whether a condition is True |
| `assertFalse(x)` | Checks whether a condition is False |
| `assertIsNone(x)` | Checks whether a value is None |
| `assertIn(a, b)` | Checks whether a value exists inside a collection |
| `assertRaises(Error)` | Checks whether a particular exception is raised |

Example:

```python
import unittest


class TestExamples(unittest.TestCase):

    def test_equal(self):
        self.assertEqual(10 + 20, 30)

    def test_true(self):
        self.assertTrue(10 > 5)

    def test_membership(self):
        self.assertIn(2, [1, 2, 3])


if __name__ == "__main__":
    unittest.main()
```

## 4.5 Introduction to pytest

Apart from unittest, Python developers commonly use another testing framework called `pytest`.

Unlike unittest, pytest allows us to write tests using simple functions without necessarily creating test classes.

It also provides powerful features for larger testing projects.

### Step 1: Install pytest

First, activate your virtual environment.

Then execute:

```bash
python -m pip install pytest
```

### Step 2: Create a Test File

Create a file named:

```text
test_calculator.py
```

Write the following code:

```python
from calculator import add, subtract, multiply, divide


def test_add():
    assert add(10, 20) == 30


def test_subtract():
    assert subtract(20, 10) == 10


def test_multiply():
    assert multiply(5, 4) == 20


def test_divide():
    assert divide(20, 5) == 4


def test_divide_by_zero():
    import pytest

    with pytest.raises(ValueError):
        divide(10, 0)
```

### Step 3: Run pytest

Execute:

```bash
python -m pytest
```

**Expected Output (simplified):**

```text
============================= test session starts =============================

collected 5 items

test_calculator.py .....                                      [100%]

============================== 5 passed ==============================
```

All five tests have passed!

### unittest vs pytest

| unittest | pytest |
|---|---|
| Built into Python | Requires installation |
| Uses test classes and methods | Supports simple test functions |
| Uses assertion methods such as `assertEqual()` | Uses normal Python `assert` statements |
| Provides a structured testing framework | Offers a flexible testing experience |
| Useful for standard library-based testing | Popular for modern Python testing projects |

**Beginner Recommendation:** Start with `unittest` to understand testing fundamentals. Then learn `pytest`, as it is widely used in modern Python development.

---

# 5. Writing Clean Code: PEP 8

## 5.1 What is PEP 8?

PEP stands for Python Enhancement Proposal.

PEP 8 is the official Python style guide that describes conventions for writing clean, readable and consistent Python code.

Think of it as a set of rules and recommendations that help developers maintain a common coding style.

Imagine working on a project with five developers.

If everyone follows a different naming convention, indentation style and formatting pattern, the code becomes difficult to read.

PEP 8 helps solve this problem.

Official documentation:

https://peps.python.org/pep-0008/

## 5.2 Indentation

Python uses indentation to define code blocks.

PEP 8 recommends using **4 spaces per indentation level**.

### Incorrect Style

```python
def greet():
  print("Hello")
```

### Recommended Style

```python
def greet():
    print("Hello")
```

Use four spaces consistently.

Avoid mixing tabs and spaces.

## 5.3 Variable Naming Conventions

Python recommends using `snake_case` for variables and functions.

### Incorrect Style

```python
studentName = "Rahul"
studentAge = 20
```

### Recommended Style

```python
student_name = "Rahul"
student_age = 20
```

Here, words are separated using underscores.

## 5.4 Function Naming

Function names should also use `snake_case`.

### Incorrect Style

```python
def CalculateTotal():
    pass
```

### Recommended Style

```python
def calculate_total():
    pass
```

## 5.5 Class Naming

For class names, PEP 8 recommends `PascalCase`.

Example:

```python
class StudentDetails:
    pass


class BankAccount:
    pass
```

Notice that each word starts with a capital letter.

## 5.6 Constant Naming

Constants are generally written using uppercase letters with underscores.

Example:

```python
PI = 3.14159

MAX_ATTEMPTS = 5

DATABASE_NAME = "students"
```

Python does not strictly enforce constants, but this naming convention communicates that these values should not normally be changed.

## 5.7 Blank Lines

Blank lines help separate different sections of code.

PEP 8 recommends:

- Two blank lines between top-level function and class definitions.
- One blank line between methods inside a class.

Example:

```python
def greet():
    print("Hello")


def welcome():
    print("Welcome")


class Student:

    def display(self):
        print("Student details")
```

## 5.8 Line Length

PEP 8 recommends limiting most lines to 79 characters.

For comments and docstrings, the recommended limit is generally 72 characters.

If a line becomes too long, you can split it into multiple lines.

### Example

```python
# Long line
result = calculate_total(price, tax, discount, delivery_charge, extra_fee)
```

A cleaner approach:

```python
result = calculate_total(
    price,
    tax,
    discount,
    delivery_charge,
    extra_fee
)
```

## 5.9 Comments and Docstrings

Comments help explain why certain code exists or why a particular decision was made.

Example:

```python
# Calculate the final price after applying a discount
final_price = price - discount
```

For functions, use docstrings to explain their purpose.

```python
def calculate_square(num):
    """
    Calculate and return the square of a number.
    """
    return num * num
```

Avoid writing unnecessary comments that simply repeat what the code already makes obvious.

## 5.10 Import Statements

Imports should generally be placed at the beginning of the file.

Example:

```python
import os
import sys

from datetime import datetime
from pathlib import Path
```

PEP 8 recommends grouping imports in this order:

1. Standard library imports.
2. Related third-party imports.
3. Local application imports.

Separate these groups with blank lines.

## 5.11 Using Meaningful Variable Names

Always use names that clearly describe what a variable represents.

### Bad Example

```python
x = 500
y = 20

z = x - y
```

### Better Example

```python
total_price = 500
discount = 20

final_price = total_price - discount
```

Meaningful names make your code easier to understand, especially when working in teams.

## 5.12 Using a Python Linter and Formatter

Apart from following PEP 8 manually, developers use tools to identify style problems and automatically format code.

Two popular tools are:

**1. Ruff**

Ruff is a fast Python linter and formatter.

Install it using:

```bash
python -m pip install ruff
```

Check your code:

```bash
ruff check .
```

Automatically fix supported issues:

```bash
ruff check --fix .
```

Format your code:

```bash
ruff format .
```

**2. Black**

Black is an opinionated Python code formatter.

Install it using:

```bash
python -m pip install black
```

Format your project:

```bash
python -m black .
```

These tools help maintain consistent code formatting across projects.

---

# 6. Mini Project: Organizing a Professional Python Project

Now let's combine the concepts we have learned.

We will create a simple Student Management System with a proper project structure.

### Step 1: Create the Project Folder

Create a folder named:

```text
StudentManagementSystem
```

Inside it, create the following structure:

```text
StudentManagementSystem/
│
├── .venv/
│
├── students/
│   ├── __init__.py
│   └── manager.py
│
├── tests/
│   └── test_manager.py
│
├── main.py
│
├── requirements.txt
│
└── .gitignore
```

Let's understand the purpose of each file.

| File / Folder | Purpose |
|---|---|
| `.venv/` | Stores the virtual environment |
| `students/` | Contains student-related code |
| `__init__.py` | Marks the directory as a regular Python package |
| `manager.py` | Contains student management logic |
| `tests/` | Contains automated tests |
| `test_manager.py` | Tests student management functions |
| `main.py` | Entry point of the application |
| `requirements.txt` | Stores project dependencies |
| `.gitignore` | Specifies files Git should ignore |

For this particular project, we will use only Python's standard library, so no external dependencies are required.

### Step 2: Write manager.py

Inside the `students` folder, create `manager.py`.

```python
class StudentManager:

    def __init__(self):
        self.students = []

    def add_student(self, name, age):

        if not name.strip():
            raise ValueError("Name cannot be empty!")

        if age <= 0:
            raise ValueError("Age must be positive!")

        student = {
            "name": name,
            "age": age
        }

        self.students.append(student)

        return student

    def get_students(self):
        return self.students

    def remove_student(self, name):

        for student in self.students:

            if student["name"] == name:
                self.students.remove(student)
                return True

        return False
```

This file contains the main logic of our application.

### Step 3: Write main.py

```python
from students.manager import StudentManager


def main():

    manager = StudentManager()

    while True:

        print("\n--- Student Management System ---")
        print("1. Add Student")
        print("2. View Students")
        print("3. Remove Student")
        print("4. Exit")

        choice = input("Enter your choice: ")

        try:

            if choice == "1":

                name = input("Enter name: ")
                age = int(input("Enter age: "))

                manager.add_student(name, age)

                print("Student added successfully!")

            elif choice == "2":

                students = manager.get_students()

                if not students:
                    print("No students found.")

                for student in students:
                    print(student)

            elif choice == "3":

                name = input("Enter student name: ")

                if manager.remove_student(name):
                    print("Student removed successfully!")

                else:
                    print("Student not found!")

            elif choice == "4":

                print("Exiting...")
                break

            else:
                print("Invalid choice!")

        except ValueError as error:
            print("Error:", error)


if __name__ == "__main__":
    main()
```

### Step 4: Write test_manager.py

Inside the `tests` folder, create `test_manager.py`.

```python
import unittest

from students.manager import StudentManager


class TestStudentManager(unittest.TestCase):

    def setUp(self):
        self.manager = StudentManager()

    def test_add_student(self):

        self.manager.add_student("Rahul", 20)

        self.assertEqual(len(self.manager.get_students()), 1)

    def test_invalid_age(self):

        with self.assertRaises(ValueError):
            self.manager.add_student("Rahul", -5)

    def test_remove_student(self):

        self.manager.add_student("Aman", 21)

        result = self.manager.remove_student("Aman")

        self.assertTrue(result)
        self.assertEqual(len(self.manager.get_students()), 0)


if __name__ == "__main__":
    unittest.main()
```

Here, `setUp()` is a special unittest method that runs before each test method.

It creates a fresh StudentManager object for every test.

### Step 5: Create requirements.txt

Since we are using only Python's built-in modules, this project does not require any third-party dependencies.

You can leave `requirements.txt` empty for now.

### Step 6: Create .gitignore

```gitignore
.venv/
__pycache__/
*.py[cod]
.pytest_cache/
.coverage
.env
```

This prevents unnecessary files from being tracked by Git.

### Step 7: Run the Project

Activate your virtual environment first.

Then execute:

```bash
python main.py
```

### Step 8: Run the Tests

From the main project directory, execute:

```bash
python -m unittest discover -s tests -v
```

If everything works correctly, your tests should pass.

**What Did We Learn?**

- Package Management: Understanding pip.
- Virtual Environments: Isolating project dependencies.
- Standard Library: Using built-in Python modules.
- Testing: Writing automated tests using unittest.
- PEP 8: Following clean coding conventions.
- Project Structure: Separating application logic from tests and entry-point code.

This is a small example of how professional Python projects can be organized.

---

# 7. Practice Questions

Try solving these questions yourself before moving to the next phase.

### Beginner Level

1. What is pip, and why do we use it?
2. Install NumPy using pip and write a program that creates a NumPy array.
3. What is a virtual environment?
4. Create and activate a virtual environment for a new Python project.
5. Generate a `requirements.txt` file.
6. Write a program that displays the current date and time using the datetime module.
7. Use the math module to calculate the factorial of a number.
8. Use Counter to find the frequency of elements in a list.

### Intermediate Level

9. Write a program that displays all files in a directory using the os module.
10. Use sys.argv to accept command-line arguments.
11. Create a program that calculates the number of days between two dates.
12. Use defaultdict to store the marks of multiple students.
13. Implement a queue using deque.
14. Use pathlib to create a folder and check whether it exists.
15. Write unit tests for a calculator application using unittest.
16. Write the same tests using pytest.
17. Identify and correct PEP 8 violations in a Python program.
18. Create a `.gitignore` file for a Python project.

### Challenge Project

**Build a Contact Management System.**

Your application should allow users to:

- Add contacts.
- View all contacts.
- Search for a contact.
- Update contact details.
- Delete contacts.
- Save contact information in a JSON file.

Additional requirements:

- Use functions and classes to organize your code.
- Create a virtual environment.
- Use pathlib for file handling.
- Use exception handling for invalid inputs.
- Write unit tests for the main operations.
- Follow PEP 8 conventions.
- Maintain a proper project structure.

---

# 8. Important Concepts to Remember

| Concept | Meaning |
|---|---|
| pip | Python package installer |
| Package | Collection of modules providing functionality |
| Dependency | External library or component required by a project |
| requirements.txt | File containing project dependencies |
| Virtual Environment | Isolated Python environment |
| venv | Built-in module for creating virtual environments |
| Standard Library | Modules included with Python |
| os | Operating-system interactions |
| sys | Python interpreter and system-related functionality |
| datetime | Date and time operations |
| math | Mathematical functions |
| collections | Specialized container data types |
| pathlib | Object-oriented filesystem paths |
| Unit Testing | Testing individual units of code |
| unittest | Built-in Python testing framework |
| pytest | Third-party Python testing framework |
| PEP 8 | Python coding style guide |
| Linter | Tool that checks code for potential issues and style violations |
| Formatter | Tool that automatically formats code |

---

# 9. Useful Documentation and Learning Resources

Always prefer official documentation when learning Python.

| Topic | Documentation |
|---|---|
| pip | https://pip.pypa.io/en/stable/ |
| Virtual Environments | https://docs.python.org/3/library/venv.html |
| Python Packaging | https://packaging.python.org/en/latest/ |
| Python Standard Library | https://docs.python.org/3/library/ |
| os Module | https://docs.python.org/3/library/os.html |
| sys Module | https://docs.python.org/3/library/sys.html |
| datetime Module | https://docs.python.org/3/library/datetime.html |
| math Module | https://docs.python.org/3/library/math.html |
| collections Module | https://docs.python.org/3/library/collections.html |
| pathlib Module | https://docs.python.org/3/library/pathlib.html |
| unittest | https://docs.python.org/3/library/unittest.html |
| pytest | https://docs.pytest.org/ |
| PEP 8 | https://peps.python.org/pep-0008/ |
| Ruff | https://docs.astral.sh/ruff/ |
| Black | https://black.readthedocs.io/ |

---

# 10. What's Next?

Congratulations on completing Phase 4!

You have now learned how to manage Python dependencies, create isolated development environments, use important built-in modules, test your programs and maintain clean coding practices.

These are essential skills when collaborating with other developers and working on real-world projects.

In the next phase, we will focus on using Python outside the basics and building practical applications.

Some topics worth exploring next are:

- Working with REST APIs.
- HTTP Requests and Responses.
- JSON Data and API Integration.
- Database Connectivity (SQLite, PostgreSQL and MongoDB).
- NumPy and Pandas.
- Data Visualization.
- Web Development using Flask, Django or FastAPI.
- Automation and Web Scraping.
- Git and GitHub.
- Building and Deploying Real-World Projects.

**Final Advice:** A professional developer is not someone who writes the most complicated code. A professional developer writes code that other people can understand, test, maintain and improve.

Focus on writing code that works, but also focus on writing code that is clean and organized.

Keep practising, keep building, and Happy Coding! 🐍