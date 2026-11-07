# Intermediate Python & Code Organization
### Moving from Basic Python to Clean, Reusable and Organized Code

Welcome to the next phase of Python!

In the previous phase, we learned how to install Python, set up VS Code, and execute our first Python program.

Now, it's time to take things a step further.

Until now, you might have written Python programs that execute instructions one after another. But as your programs become bigger, writing everything in one place becomes difficult to manage.

This phase will teach you how to:

- Write reusable code using functions.
- Work with functional programming concepts.
- Generate lists, dictionaries and sets efficiently.
- Handle errors without crashing your program.
- Read and write files using Python.
- Organize your code in a cleaner and more professional way.

Let's get started!

---

# 1. Functions in Python

## 1.1 What is a Function?

A function is a reusable block of code that performs a particular task.

Imagine that you want to calculate the sum of two numbers multiple times.

Instead of writing the addition logic again and again, you can create a function and call it whenever required.

### Without a Function

```python
a = 10
b = 20
print(a + b)

x = 30
y = 40
print(x + y)
```

### With a Function

```python
def add(a, b):
    return a + b

print(add(10, 20))
print(add(30, 40))
```

**Output:**

```text
30
70
```

Much cleaner, right?

## 1.2 How to Define a Function

In Python, we use the `def` keyword to define a function.

### Syntax

```python
def function_name(parameters):
    # Code to execute
    return result
```

Let's understand each part:

- `def`: Keyword used to define a function.
- `function_name`: Name given to the function.
- `parameters`: Values that the function accepts.
- `return`: Sends a result back to the place where the function was called.

### Example

```python
def greet():
    print("Hello! Welcome to Python.")

greet()
```

**Output:**

```text
Hello! Welcome to Python.
```

Here, `greet()` is used to call the function.

**Remember:** Defining a function does not execute it. You must call it to execute its code.

## 1.3 Parameters and Arguments

These two terms are often confused by beginners.

- **Parameters:** Variables mentioned when defining a function.
- **Arguments:** Actual values passed when calling a function.

Example:

```python
def greet(name):  # name is a parameter
    print("Hello", name)

greet("Rahul")    # Rahul is an argument
```

**Output:**

```text
Hello Rahul
```

### Types of Arguments

**1. Positional Arguments**

Values are assigned according to their position.

```python
def student(name, age):
    print(name, age)

student("Rahul", 20)
```

**Output:**

```text
Rahul 20
```

**2. Keyword Arguments**

You explicitly specify the parameter name.

```python
def student(name, age):
    print(name, age)

student(age=20, name="Rahul")
```

**Output:**

```text
Rahul 20
```

Notice that the order does not matter when using keyword arguments.

**3. Default Arguments**

You can provide default values to parameters.

```python
def greet(name="Student"):
    print("Hello", name)

greet()
greet("Rahul")
```

**Output:**

```text
Hello Student
Hello Rahul
```

If no argument is provided, the default value is used.

## 1.4 Understanding *args and **kwargs

Sometimes, you might not know how many arguments a function will receive.

Python provides `*args` and `**kwargs` to handle such situations.

### A. *args

`*args` allows a function to accept any number of positional arguments.

Example:

```python
def add_numbers(*args):
    total = 0

    for num in args:
        total += num

    return total

print(add_numbers(10, 20))
print(add_numbers(10, 20, 30))
print(add_numbers(10, 20, 30, 40))
```

**Output:**

```text
30
60
100
```

Here, `args` collects all the positional arguments into a tuple.

You can use any variable name, but `args` is the commonly accepted convention.

### B. **kwargs

`**kwargs` allows a function to accept any number of keyword arguments.

Example:

```python
def student_details(**kwargs):
    for key, value in kwargs.items():
        print(key, ":", value)

student_details(name="Rahul", age=20, course="CSE")
```

**Output:**

```text
name : Rahul
age : 20
course : CSE
```

Here, `kwargs` collects the keyword arguments into a dictionary.

### Difference Between *args and **kwargs

| Feature | *args | **kwargs |
|---|---|---|
| Accepts | Positional arguments | Keyword arguments |
| Stores data as | Tuple | Dictionary |
| Example | `func(10, 20)` | `func(name="Rahul")` |

## 1.5 Docstrings

A docstring is a string used to describe what a function, class or module does.

It helps other developers understand your code.

Example:

```python
def square(num):
    """
    This function returns the square of a number.
    """
    return num * num

print(square(5))
```

**Output:**

```text
25
```

You can access a function's docstring using:

```python
print(square.__doc__)
```

**Output:**

```text
    This function returns the square of a number.
```

Docstrings are particularly useful when working on large projects.

## 1.6 Variable Scope and the LEGB Rule

Variable scope determines where a variable can be accessed in a program.

Python follows something called the **LEGB rule** when searching for a variable.

LEGB stands for:

1. Local
2. Enclosing
3. Global
4. Built-in

Let's understand each one.

### A. Local Scope

A variable created inside a function is called a local variable.

```python
def greet():
    message = "Hello"
    print(message)

greet()
```

Here, `message` can only be accessed inside the function.

### B. Enclosing Scope

This applies when one function is defined inside another function.

```python
def outer():
    message = "Hello from outer function"

    def inner():
        print(message)

    inner()

outer()
```

**Output:**

```text
Hello from outer function
```

The inner function can access variables from its enclosing function.

### C. Global Scope

A variable declared outside all functions has global scope.

```python
name = "Rahul"

def greet():
    print("Hello", name)

greet()
```

**Output:**

```text
Hello Rahul
```

The function can access the global variable.

If you want to modify a global variable inside a function, you can use the `global` keyword.

```python
count = 0

def increase():
    global count
    count += 1

increase()

print(count)
```

**Output:**

```text
1
```

### D. Built-in Scope

Python has several predefined names that are available everywhere.

Examples:

- `print()`
- `len()`
- `sum()`
- `range()`
- `type()`

These belong to Python's built-in scope.

**Quick Revision:**

| Scope | Meaning |
|---|---|
| Local | Inside the current function |
| Enclosing | Inside the outer function |
| Global | Outside all functions |
| Built-in | Predefined Python names |

---

# 2. Functional Programming

Functional programming is a programming approach in which we use functions to process data and perform operations.

Python supports several functional programming concepts.

Let's explore some useful ones.

## 2.1 Lambda Functions

A lambda function is a small, anonymous function that can be written in a single expression.

Unlike normal functions, lambda functions do not require the `def` keyword.

### Syntax

```python
lambda arguments: expression
```

### Example 1: Normal Function

```python
def square(num):
    return num * num

print(square(5))
```

### Example 2: Lambda Function

```python
square = lambda num: num * num

print(square(5))
```

**Output:**

```text
25
```

Both programs perform the same operation.

### Example 3: Adding Two Numbers

```python
add = lambda a, b: a + b

print(add(10, 20))
```

**Output:**

```text
30
```

Lambda functions are useful for small operations, especially when used with functions like `map()` and `filter()`.

For larger operations, normal functions are usually easier to read.

## 2.2 map() Function

The `map()` function applies a given function to every element of an iterable, such as a list.

Think of it this way:

You have a list of numbers and want to calculate the square of every number.

Instead of using a loop, you can use `map()`.

### Example

```python
numbers = [1, 2, 3, 4, 5]

def square(num):
    return num * num

result = map(square, numbers)

print(list(result))
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

Let's break it down:

1. `numbers` contains five elements.
2. `map()` applies the `square()` function to every element.
3. It returns a map object (an iterator).
4. `list()` converts that result into a list.

### Using map() with Lambda

We can also write the same program using a lambda function.

```python
numbers = [1, 2, 3, 4, 5]

result = map(lambda x: x * x, numbers)

print(list(result))
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

## 2.3 filter() Function

The `filter()` function is used to select elements from an iterable based on a condition.

Let's say you have a list of numbers and want to extract only the even numbers.

### Example

```python
numbers = [1, 2, 3, 4, 5, 6]

def is_even(num):
    return num % 2 == 0

result = filter(is_even, numbers)

print(list(result))
```

**Output:**

```text
[2, 4, 6]
```

Let's understand what happened:

1. `filter()` checks every element in the list.
2. It passes each element to `is_even()`.
3. If the function returns `True`, the element is included.
4. If it returns `False`, the element is excluded.

### Using filter() with Lambda

```python
numbers = [1, 2, 3, 4, 5, 6]

result = filter(lambda x: x % 2 == 0, numbers)

print(list(result))
```

**Output:**

```text
[2, 4, 6]
```

## 2.4 zip() Function

The `zip()` function combines elements from two or more iterables based on their positions.

Imagine that you have two lists:

- One contains student names.
- Another contains their marks.

You want to combine them.

### Example

```python
names = ["Rahul", "Aman", "Riya"]
marks = [85, 90, 95]

result = zip(names, marks)

print(list(result))
```

**Output:**

```text
[('Rahul', 85), ('Aman', 90), ('Riya', 95)]
```

Notice that the first element of each list is combined, then the second, and so on.

### Using zip() in a Loop

```python
names = ["Rahul", "Aman", "Riya"]
marks = [85, 90, 95]

for name, mark in zip(names, marks):
    print(name, "scored", mark)
```

**Output:**

```text
Rahul scored 85
Aman scored 90
Riya scored 95
```

**Important:** By default, `zip()` stops when the shortest iterable runs out of elements.

---

# 3. List Comprehensions

List comprehension is a shorter and cleaner way of creating lists in Python.

Instead of writing multiple lines using loops, we can generate a list in a single line.

## 3.1 Creating a List Using a Loop

Suppose you want to create a list containing squares of numbers from 1 to 5.

You can do this:

```python
squares = []

for num in range(1, 6):
    squares.append(num * num)

print(squares)
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

Now let's write the same program using list comprehension.

## 3.2 Creating a List Using List Comprehension

```python
squares = [num * num for num in range(1, 6)]

print(squares)
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

Much shorter!

### Syntax

```python
new_list = [expression for item in iterable]
```

Let's understand:

- `expression`: What you want to do with each element.
- `item`: The current element.
- `iterable`: The collection you are iterating over.

## 3.3 List Comprehension with Conditions

You can also add conditions to list comprehensions.

Example: Extract only even numbers from a list.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]

even_numbers = [num for num in numbers if num % 2 == 0]

print(even_numbers)
```

**Output:**

```text
[2, 4, 6, 8]
```

### Syntax

```python
new_list = [expression for item in iterable if condition]
```

Only elements satisfying the condition are included.

## 3.4 Dictionary Comprehension

Just like lists, we can create dictionaries using comprehensions.

Example:

```python
numbers = [1, 2, 3, 4, 5]

squares = {num: num * num for num in numbers}

print(squares)
```

**Output:**

```text
{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```

Here:

- The number becomes the dictionary key.
- Its square becomes the dictionary value.

### Syntax

```python
new_dict = {key: value for item in iterable}
```

## 3.5 Set Comprehension

Set comprehension works similarly to list comprehension, but it creates a set.

A set automatically removes duplicate elements.

Example:

```python
numbers = [1, 2, 2, 3, 3, 4, 5]

unique_squares = {num * num for num in numbers}

print(unique_squares)
```

**Output:**

```text
{1, 4, 9, 16, 25}
```

Notice that duplicate values are automatically removed.

### Quick Comparison

| Comprehension | Syntax | Creates |
|---|---|---|
| List | `[x for x in items]` | List |
| Dictionary | `{x: x*x for x in items}` | Dictionary |
| Set | `{x*x for x in items}` | Set |

**Beginner Tip:** Comprehensions make code shorter, but don't force everything into one line. If a normal loop is easier to understand, use a normal loop.

---

# 4. Error and Exception Handling

Errors are a normal part of programming.

Even experienced developers make mistakes while writing code.

Python provides exception handling mechanisms that allow us to handle errors without unnecessarily terminating the entire program.

## 4.1 What is an Exception?

An exception is an error that occurs while a program is running.

Consider this example:

```python
a = 10
b = 0

print(a / b)
```

This program produces an error:

```text
ZeroDivisionError: division by zero
```

Python does not allow division by zero.

But instead of allowing the program to terminate unexpectedly, we can handle this exception.

## 4.2 The try and except Blocks

Python uses `try` and `except` blocks for exception handling.

### Syntax

```python
try:
    # Code that might produce an error

except:
    # Code that executes if an error occurs
```

### Example

```python
try:
    a = 10
    b = 0

    print(a / b)

except:
    print("Something went wrong!")
```

**Output:**

```text
Something went wrong!
```

The program does not crash because the exception is handled.

However, using a bare `except` is generally discouraged because it can hide unexpected errors.

It's better to catch specific exceptions.

### Better Approach

```python
try:
    a = 10
    b = 0

    print(a / b)

except ZeroDivisionError:
    print("You cannot divide by zero!")
```

**Output:**

```text
You cannot divide by zero!
```

## 4.3 Handling Multiple Exceptions

A program can produce different types of errors.

We can handle multiple exceptions using multiple `except` blocks.

Example:

```python
try:
    num = int(input("Enter a number: "))
    result = 100 / num

    print(result)

except ValueError:
    print("Please enter a valid integer!")

except ZeroDivisionError:
    print("You cannot divide by zero!")
```

Possible outputs:

If the user enters `0`:

```text
You cannot divide by zero!
```

If the user enters `hello`:

```text
Please enter a valid integer!
```

## 4.4 Understanding else and finally

Python provides two additional keywords used with exception handling:

- `else`
- `finally`

### A. else

The `else` block executes only when no exception occurs in the `try` block.

Example:

```python
try:
    num = int(input("Enter a number: "))
    result = 100 / num

except ValueError:
    print("Invalid input!")

except ZeroDivisionError:
    print("Cannot divide by zero!")

else:
    print("Result:", result)
```

If the input is valid and non-zero, the `else` block executes.

### B. finally

The `finally` block executes whether an exception occurs or not.

Example:

```python
try:
    num = int(input("Enter a number: "))
    print(100 / num)

except ZeroDivisionError:
    print("Cannot divide by zero!")

finally:
    print("Program execution completed.")
```

The message inside `finally` is printed regardless of whether division succeeds or fails.

### Complete Structure

```python
try:
    # Code that may produce an exception

except SomeError:
    # Handle the exception

else:
    # Execute if no exception occurs

finally:
    # Execute whether an exception occurs or not
```

## 4.5 Raising Exceptions

Sometimes, you want to generate an exception yourself when a particular condition is not satisfied.

Python provides the `raise` keyword for this.

Example:

```python
age = -5

if age < 0:
    raise ValueError("Age cannot be negative!")
```

**Output:**

```text
ValueError: Age cannot be negative!
```

This is useful when you want to prevent invalid data from entering your program.

## 4.6 Creating Custom Exceptions

You can even create your own exception classes.

This is useful when you want to handle errors specific to your application.

Example:

```python
class InvalidAgeError(Exception):
    pass


age = -5

if age < 0:
    raise InvalidAgeError("Age cannot be negative!")
```

**Output:**

```text
InvalidAgeError: Age cannot be negative!
```

Here:

1. We created a custom exception called `InvalidAgeError`.
2. It inherits from Python's built-in `Exception` class.
3. We raised it when the age was negative.

## 4.7 Debugging Code Safely

Debugging means finding and fixing errors in your program.

Here are some useful debugging techniques:

**1. Print Statements**

The simplest way to debug is by printing variable values.

```python
a = 10
b = 20

print("Value of a:", a)
print("Value of b:", b)

result = a + b

print("Result:", result)
```

**2. Read Error Messages**

Python usually provides useful information when something goes wrong.

Pay attention to:

- The type of error.
- The line number.
- The error description.

**3. Use the VS Code Debugger**

VS Code provides a built-in debugging feature.

You can:

- Set breakpoints.
- Execute code line by line.
- Inspect variable values.
- Understand how your program behaves.

To start debugging, click beside a line number to add a breakpoint and use the Run and Debug option.

---

# 5. File Input and Output (File I/O)

Until now, we have mostly worked with data stored in variables.

But what happens when you want to save information even after your program stops running?

For example:

- Saving student records.
- Storing usernames and passwords.
- Maintaining attendance records.
- Saving application settings.
- Reading information from external datasets.

This is where File I/O comes into the picture.

File I/O stands for File Input and Output.

Python allows us to read information from files and write information into files.

## 5.1 Opening a File

Python provides the built-in `open()` function.

### Syntax

```python
file = open("filename.txt", "mode")
```

Here:

- `filename.txt` is the name of the file.
- `mode` specifies what operation you want to perform.

### Common File Modes

| Mode | Meaning |
|---|---|
| `r` | Read a file |
| `w` | Write to a file (overwrites existing content) |
| `a` | Append content to a file |
| `x` | Create a new file; raises an error if it already exists |
| `b` | Binary mode |
| `t` | Text mode (default) |

## 5.2 Reading a Text File

Suppose you have a file named `sample.txt` containing:

```text
Hello World!
Welcome to Python.
```

You can read it using:

```python
file = open("sample.txt", "r")

content = file.read()

print(content)

file.close()
```

**Output:**

```text
Hello World!
Welcome to Python.
```

Here:

- `open()` opens the file.
- `read()` reads its content.
- `close()` closes the file.

Closing files is important because it releases system resources.

## 5.3 Writing to a Text File

You can create a new file or overwrite an existing file using write mode.

Example:

```python
file = open("sample.txt", "w")

file.write("Hello Python!")

file.close()
```

This writes the following content into `sample.txt`:

```text
Hello Python!
```

**Important:** Write mode (`w`) overwrites the existing contents of a file.

## 5.4 Appending to a File

Suppose you already have some content in a file and want to add more information without deleting the existing content.

Use append mode (`a`).

Example:

```python
file = open("sample.txt", "a")

file.write("\nWelcome to programming!")

file.close()
```

The file will now contain:

```text
Hello Python!
Welcome to programming!
```

## 5.5 Using the with Statement (Context Managers)

There is a better way to work with files.

Instead of manually opening and closing files, Python provides the `with` statement.

It automatically closes the file when the block finishes, even if an exception occurs.

Example:

```python
with open("sample.txt", "r") as file:
    content = file.read()
    print(content)
```

Notice that we don't need to call `file.close()`.

This is the recommended approach when working with files.

**Remember:** A context manager manages resources such as files and ensures they are cleaned up properly.

## 5.6 Reading a File Line by Line

Sometimes, files contain large amounts of information.

Instead of reading everything at once, you can process the file one line at a time.

Example:

```python
with open("sample.txt", "r") as file:

    for line in file:
        print(line.strip())
```

Here, `strip()` removes unnecessary whitespace, including the newline character at the end of each line.

## 5.7 Working with CSV Files

CSV stands for Comma-Separated Values.

It is a commonly used file format for storing tabular data.

For example, a CSV file named `students.csv` might contain:

```csv
Name,Age,Marks
Rahul,20,85
Aman,21,90
Riya,19,95
```

Python provides a built-in module called `csv` to work with CSV files.

### Reading a CSV File

```python
import csv

with open("students.csv", "r", newline="") as file:

    reader = csv.reader(file)

    for row in reader:
        print(row)
```

**Output:**

```text
['Name', 'Age', 'Marks']
['Rahul', '20', '85']
['Aman', '21', '90']
['Riya', '19', '95']
```

Each row is returned as a list.

### Writing to a CSV File

```python
import csv

data = [
    ["Name", "Age", "Marks"],
    ["Rahul", 20, 85],
    ["Aman", 21, 90],
    ["Riya", 19, 95]
]

with open("students.csv", "w", newline="") as file:

    writer = csv.writer(file)

    writer.writerows(data)
```

This creates a CSV file containing the given student records.

## 5.8 Working with JSON Files

JSON stands for JavaScript Object Notation.

It is a popular format used to store and exchange structured data.

JSON is commonly used in:

- Web APIs.
- Web applications.
- Configuration files.
- Data exchange between frontend and backend systems.

A JSON file might look like this:

```json
{
    "name": "Rahul",
    "age": 20,
    "course": "CSE"
}
```

Python provides a built-in module called `json` to work with JSON files.

### Writing Data into a JSON File

```python
import json

student = {
    "name": "Rahul",
    "age": 20,
    "course": "CSE"
}

with open("student.json", "w") as file:
    json.dump(student, file, indent=4)
```

This creates a file named `student.json`.

The `indent=4` argument makes the JSON data easier to read.

### Reading Data from a JSON File

```python
import json

with open("student.json", "r") as file:
    student = json.load(file)

print(student)
print(student["name"])
print(student["course"])
```

**Output:**

```text
{'name': 'Rahul', 'age': 20, 'course': 'CSE'}
Rahul
CSE
```

### Understanding dump() and load()

These two functions are important:

| Function | Purpose |
|---|---|
| `json.dump()` | Writes Python data into a JSON file |
| `json.load()` | Reads JSON data from a file |

There are also two related functions:

| Function | Purpose |
|---|---|
| `json.dumps()` | Converts Python data into a JSON string |
| `json.loads()` | Converts a JSON string into Python data |

---

# 6. Mini Project: Student Record Manager

Now that we have covered functions, dictionaries, exception handling and file I/O, let's combine them into a small project.

We will create a simple Student Record Manager.

The program will allow users to:

1. Add student records.
2. View saved student records.
3. Store records permanently in a JSON file.

### Code

```python
import json

FILE_NAME = "students.json"


def load_students():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)

    except FileNotFoundError:
        return []

    except json.JSONDecodeError:
        print("Warning: The JSON file is invalid.")
        return []


def save_students(students):
    with open(FILE_NAME, "w") as file:
        json.dump(students, file, indent=4)


def add_student(students):
    name = input("Enter student name: ")

    try:
        age = int(input("Enter student age: "))
        marks = float(input("Enter student marks: "))

        if age < 0 or marks < 0 or marks > 100:
            raise ValueError("Please enter valid age and marks.")

        student = {
            "name": name,
            "age": age,
            "marks": marks
        }

        students.append(student)
        save_students(students)

        print("Student added successfully!")

    except ValueError as error:
        print("Error:", error)


def view_students(students):
    if not students:
        print("No student records found.")
        return

    for student in students:
        print(student)


def main():
    students = load_students()

    while True:
        print("\n--- Student Record Manager ---")
        print("1. Add Student")
        print("2. View Students")
        print("3. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            add_student(students)

        elif choice == "2":
            view_students(students)

        elif choice == "3":
            print("Exiting program...")
            break

        else:
            print("Invalid choice!")


main()
```

### What Did We Learn from This Project?

- Functions: We divided the program into smaller reusable blocks.
- Dictionaries: We stored individual student records.
- Lists: We stored multiple student records.
- Exception Handling: We handled missing or invalid files and incorrect inputs.
- JSON: We saved student information permanently.
- File I/O: We read and wrote information using the `with` statement.
- Loops and Conditions: We created an interactive menu.

This is a small example of how different Python concepts work together in a real application.

---

# 7. Practice Questions

Try solving these questions yourself before moving to the next phase.

### Beginner Level

1. Write a function that takes two numbers and returns their sum.
2. Write a function that checks whether a number is even or odd.
3. Create a function that accepts a name and prints a greeting.
4. Write a lambda function that calculates the cube of a number.
5. Use `map()` to double every number in a list.
6. Use `filter()` to extract all numbers greater than 10 from a list.

### Intermediate Level

7. Use `zip()` to combine two lists: one containing student names and another containing their marks.
8. Create a list of squares of all even numbers between 1 and 20 using list comprehension.
9. Create a dictionary containing numbers from 1 to 5 and their corresponding cubes.
10. Write a program that accepts two numbers and handles division by zero.
11. Create a custom exception called `NegativeNumberError`.
12. Write a program that reads a text file and counts the number of lines in it.
13. Create a CSV file containing five student records.
14. Write a program that stores user information in a JSON file and reads it back.

### Challenge Project

**Build a Simple To-Do List Application.**

Your application should allow users to:

- Add a task.
- View all tasks.
- Delete a task.
- Mark a task as completed.
- Save tasks in a JSON file so they remain available after restarting the program.

Try implementing it using functions, loops, conditions, exception handling and file I/O.

---

# 8. Important Concepts to Remember

| Concept | What It Does |
|---|---|
| Functions | Creates reusable blocks of code |
| `*args` | Accepts multiple positional arguments |
| `**kwargs` | Accepts multiple keyword arguments |
| Docstrings | Documents functions and other code |
| LEGB | Defines Python's variable lookup order |
| Lambda | Creates small anonymous functions |
| `map()` | Applies a function to every element |
| `filter()` | Selects elements based on a condition |
| `zip()` | Combines elements from multiple iterables |
| List Comprehension | Creates lists in a concise way |
| `try/except` | Handles exceptions |
| `raise` | Manually raises an exception |
| `with` | Manages resources safely |
| File I/O | Reads and writes files |
| CSV | Stores tabular data |
| JSON | Stores structured data |

---

# 9. Useful Documentation and Learning Resources

You can refer to these official resources to explore the concepts in greater detail.

| Topic | Documentation |
|---|---|
| Python Functions | https://docs.python.org/3/tutorial/controlflow.html#defining-functions |
| Lambda Functions | https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions |
| map(), filter() and zip() | https://docs.python.org/3/library/functions.html |
| List Comprehensions | https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions |
| Exceptions | https://docs.python.org/3/tutorial/errors.html |
| File Handling | https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files |
| CSV Module | https://docs.python.org/3/library/csv.html |
| JSON Module | https://docs.python.org/3/library/json.html |

---

# 10. What's Next?

Congratulations on completing the Intermediate Python and Code Organization phase!

You now know how to write reusable functions, process data efficiently, handle errors and work with external files.

You are gradually moving away from writing simple scripts and towards developing actual applications.

In the next phase, you can explore:

- Object-Oriented Programming (OOP).
- Classes and Objects.
- Constructors and Destructors.
- Inheritance and Polymorphism.
- Encapsulation and Abstraction.
- Modules and Packages.
- Python's Standard Library.
- Working with external libraries.

**Keep practising, experiment with the examples, and don't hesitate to break your code and fix it. That's how you learn programming!**

Happy Coding! 🐍