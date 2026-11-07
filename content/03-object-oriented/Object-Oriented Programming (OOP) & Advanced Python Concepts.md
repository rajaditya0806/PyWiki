# Phase 3: Object-Oriented Programming (OOP) & Advanced Python Concepts
### Learning How to Build Structured, Reusable and Scalable Python Programs

Welcome to Phase 3 of Python Programming!

In the previous phases, we learned Python basics, functions, functional programming, list comprehensions, exception handling and file handling.

Until now, most of our programs have been written using functions and simple statements.

But imagine building a large application such as:

- A Banking Management System
- A Student Management System
- An E-commerce Website
- A Library Management System
- A College Management Portal

Writing such applications using only individual functions can become difficult to manage.

This is where **Object-Oriented Programming (OOP)** comes in.

OOP helps us organize code into reusable structures, making applications easier to understand, maintain and extend.

In this phase, we will cover:

1. Classes, Objects, Attributes and Methods.
2. The Four Pillars of OOP.
3. Dunder (Magic) Methods.
4. Generators and the `yield` keyword.
5. Custom Iterators.
6. Decorators.

Let's get started!

---

# 1. Introduction to Object-Oriented Programming (OOP)

## 1.1 What is OOP?

Object-Oriented Programming is a programming approach in which we organize our code around objects rather than just individual functions.

An object represents something that has:

- **Attributes:** Properties or characteristics of that object.
- **Methods:** Actions or behaviours that the object can perform.

Let's understand this with a real-world example.

Consider a car.

A car has certain properties:

- Brand
- Colour
- Model
- Speed

It can also perform certain actions:

- Accelerate
- Brake
- Turn
- Start

In OOP, we can represent a car as an object containing both its properties and behaviours.

## 1.2 What is a Class?

A class is a blueprint or template used to create objects.

Think of a class as an architectural plan of a house.

The blueprint describes how the house should be constructed, but it is not itself a physical house.

Similarly, a class defines the structure and behaviour of objects, while objects are actual instances created from that class.

### Example

```python
class Car:
    brand = "Toyota"
    color = "Black"

    def start(self):
        print("The car has started!")


# Creating an object
car1 = Car()

print(car1.brand)
print(car1.color)

car1.start()
```

**Output:**

```text
Toyota
Black
The car has started!
```

Let's understand this code:

1. `class Car:` creates a class named Car.
2. `brand` and `color` are attributes.
3. `start()` is a method.
4. `car1 = Car()` creates an object of the Car class.
5. `car1.start()` calls the method using the object.

## 1.3 What is an Object?

An object is an instance of a class.

A single class can be used to create multiple objects.

For example:

```python
class Student:
    name = "Rahul"
    age = 20


student1 = Student()
student2 = Student()

print(student1.name)
print(student2.name)
```

Both objects are created using the same class.

However, we generally want different objects to have different information.

For that, we use constructors.

## 1.4 Understanding Constructors: __init__()

A constructor is a special method that is automatically called when an object is created.

In Python, `__init__()` is commonly called the constructor, although technically it is the initializer method.

It is used to initialize the attributes of an object.

### Example

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age


student1 = Student("Rahul", 20)
student2 = Student("Aman", 21)

print(student1.name)
print(student1.age)

print(student2.name)
print(student2.age)
```

**Output:**

```text
Rahul
20
Aman
21
```

Let's understand this step by step.

**Step 1:** We create a class called `Student`.

**Step 2:** We define `__init__()` with three parameters:

- `self`
- `name`
- `age`

**Step 3:** We assign the values to object attributes.

```python
self.name = name
self.age = age
```

**Step 4:** When we create an object, Python automatically calls `__init__()`.

For example:

```python
student1 = Student("Rahul", 20)
```

This initializes:

```python
student1.name = "Rahul"
student1.age = 20
```

## 1.5 What is self?

This is one of the most important concepts in Python OOP.

`self` refers to the current object of the class.

It allows us to access the attributes and methods belonging to that particular object.

Consider:

```python
class Student:

    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Hello, I am", self.name)


student1 = Student("Rahul")
student2 = Student("Aman")

student1.greet()
student2.greet()
```

**Output:**

```text
Hello, I am Rahul
Hello, I am Aman
```

Notice how `self.name` refers to different names depending on which object calls the method.

**Important:** `self` is not a Python keyword. It is a naming convention, but you should almost always use it when defining instance methods.

## 1.6 Attributes and Methods

Let's understand the two important components of a class.

### Attributes

Attributes represent the properties or data associated with an object.

Example:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Here, `name` and `age` are instance attributes.

### Methods

Methods are functions defined inside a class.

They describe what an object can do.

Example:

```python
class Calculator:

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b


calc = Calculator()

print(calc.add(10, 5))
print(calc.subtract(10, 5))
```

**Output:**

```text
15
5
```

## 1.7 Instance Attributes vs Class Attributes

Python provides two common ways to define attributes.

**1. Instance Attributes**

These belong to individual objects.

```python
class Student:

    def __init__(self, name):
        self.name = name


s1 = Student("Rahul")
s2 = Student("Aman")

print(s1.name)
print(s2.name)
```

Each object has its own name.

**2. Class Attributes**

These belong to the class itself and are shared by instances unless overridden.

```python
class Student:

    college = "ABC College"

    def __init__(self, name):
        self.name = name


s1 = Student("Rahul")
s2 = Student("Aman")

print(s1.college)
print(s2.college)
```

**Output:**

```text
ABC College
ABC College
```

### Difference

| Instance Attributes | Class Attributes |
|---|---|
| Belong to individual objects | Belong to the class |
| Usually defined using `self` | Defined directly inside the class |
| Can have different values for different objects | Shared by instances by default |

---

# 2. The Four Pillars of OOP

Object-Oriented Programming is based on four major principles:

1. Inheritance
2. Polymorphism
3. Encapsulation
4. Abstraction

These are commonly known as the Four Pillars of OOP.

Let's understand each one with real-world examples.

## 2.1 Inheritance

Inheritance allows one class to acquire the attributes and methods of another class.

In simple words, a child class can reuse the code of a parent class.

### Real-World Example

Consider an organization.

There are different types of employees:

- Manager
- Developer
- Designer

All employees might have common properties such as:

- Name
- Employee ID
- Department

Instead of defining these properties separately for every employee type, we can create a common Employee class.

Other classes can inherit from it.

### Example

```python
class Employee:

    def __init__(self, name, employee_id):
        self.name = name
        self.employee_id = employee_id

    def display_details(self):
        print("Name:", self.name)
        print("Employee ID:", self.employee_id)


class Developer(Employee):

    def write_code(self):
        print(self.name, "is writing code.")


class Manager(Employee):

    def conduct_meeting(self):
        print(self.name, "is conducting a meeting.")


dev = Developer("Rahul", 101)

dev.display_details()
dev.write_code()
```

**Output:**

```text
Name: Rahul
Employee ID: 101
Rahul is writing code.
```

Let's understand:

- `Employee` is the parent class.
- `Developer` is the child class.
- `Manager` is another child class.
- `Developer` inherits the attributes and methods of `Employee`.

Notice that we did not redefine `display_details()` inside Developer.

We simply inherited it!

### Types of Inheritance

Python supports several types of inheritance.

**1. Single Inheritance**

One child class inherits from one parent class.

```python
class Parent:
    def display(self):
        print("Parent class")


class Child(Parent):
    pass


obj = Child()
obj.display()
```

**2. Multiple Inheritance**

One child class inherits from multiple parent classes.

```python
class Father:
    def skills(self):
        print("Programming")


class Mother:
    def hobbies(self):
        print("Painting")


class Child(Father, Mother):
    pass


obj = Child()

obj.skills()
obj.hobbies()
```

**Output:**

```text
Programming
Painting
```

**3. Multilevel Inheritance**

A class inherits from another child class, creating multiple levels.

```python
class Grandparent:
    def house(self):
        print("Grandparent's house")


class Parent(Grandparent):
    def car(self):
        print("Parent's car")


class Child(Parent):
    def bike(self):
        print("Child's bike")


obj = Child()

obj.house()
obj.car()
obj.bike()
```

**4. Hierarchical Inheritance**

Multiple child classes inherit from the same parent class.

```python
class Animal:
    def eat(self):
        print("Animal is eating")


class Dog(Animal):
    pass


class Cat(Animal):
    pass


dog = Dog()
cat = Cat()

dog.eat()
cat.eat()
```

**5. Hybrid Inheritance**

A combination of two or more inheritance types.

It can involve multiple inheritance patterns in a single class hierarchy.

## 2.2 Polymorphism

The word polymorphism means "many forms".

In OOP, polymorphism allows the same method or operation to behave differently depending on the object using it.

### Real-World Example

Consider the action of making a sound.

- A dog barks.
- A cat meows.
- A cow moos.

The action is the same: making a sound.

But the behaviour differs depending on the animal.

### Example

```python
class Dog:

    def sound(self):
        print("Dog barks")


class Cat:

    def sound(self):
        print("Cat meows")


class Cow:

    def sound(self):
        print("Cow moos")


animals = [Dog(), Cat(), Cow()]

for animal in animals:
    animal.sound()
```

**Output:**

```text
Dog barks
Cat meows
Cow moos
```

Notice that we called the same method:

```python
animal.sound()
```

But the output changes depending on the object.

This is polymorphism.

### Method Overriding

Method overriding occurs when a child class provides its own implementation of a method already defined in its parent class.

Example:

```python
class Animal:

    def sound(self):
        print("Animals make sounds")


class Dog(Animal):

    def sound(self):
        print("Dog barks")


dog = Dog()
dog.sound()
```

**Output:**

```text
Dog barks
```

The child class overrides the parent's `sound()` method.

### Method Overloading in Python

In languages such as C++, method overloading allows multiple functions to have the same name with different parameter lists.

Python does not support traditional method overloading in the same way.

However, we can achieve similar behaviour using default arguments or variable-length arguments.

Example:

```python
class Calculator:

    def add(self, a, b=0, c=0):
        return a + b + c


calc = Calculator()

print(calc.add(10, 20))
print(calc.add(10, 20, 30))
```

**Output:**

```text
30
60
```

### Duck Typing

Python also supports a concept called Duck Typing.

It means that Python focuses on what an object can do rather than strictly checking its class.

For example:

```python
class Dog:

    def sound(self):
        print("Bark")


class Robot:

    def sound(self):
        print("Beep")


def make_sound(obj):
    obj.sound()


make_sound(Dog())
make_sound(Robot())
```

**Output:**

```text
Bark
Beep
```

Both objects work with the same function because both provide a `sound()` method.

## 2.3 Encapsulation

Encapsulation means combining data and the methods that operate on that data inside a single unit, such as a class.

It also involves controlling how internal data is accessed or modified.

### Real-World Example

Consider an ATM.

You can:

- Check your balance.
- Withdraw money.
- Deposit money.

But you cannot directly modify the internal balance stored by the bank.

Instead, you interact with the system through controlled operations.

We can implement a similar idea using Python classes.

### Example

```python
class BankAccount:

    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance


account = BankAccount(1000)

account.deposit(500)

print(account.get_balance())
```

**Output:**

```text
1500
```

Let's understand:

- `__balance` is an attribute with a double underscore.
- `deposit()` allows us to increase the balance.
- `get_balance()` allows us to access the balance.

Python uses name mangling for double-underscore attributes. This makes direct access more difficult, but it is not absolute security or true private access.

### Public, Protected and Private Attributes

Python uses naming conventions to indicate different levels of access.

**1. Public Attributes**

These can be accessed from anywhere.

```python
class Student:

    def __init__(self):
        self.name = "Rahul"


s = Student()

print(s.name)
```

**2. Protected Attributes**

A single underscore indicates that an attribute is intended for internal use or use by subclasses.

```python
class Student:

    def __init__(self):
        self._marks = 90


s = Student()

print(s._marks)
```

It is still accessible, but the underscore communicates that it should generally be treated as an internal attribute.

**3. Private Attributes**

A double underscore triggers name mangling.

```python
class Student:

    def __init__(self):
        self.__marks = 90


s = Student()

print(s.__marks)
```

This normally raises an `AttributeError`.

Python does not enforce strict private access, but name mangling helps prevent accidental access and naming conflicts.

### Using Getters and Setters

Getters and setters are methods used to retrieve and modify attribute values in a controlled way.

Python also provides the `@property` decorator for a cleaner approach.

Example:

```python
class Student:

    def __init__(self, marks):
        self._marks = marks

    @property
    def marks(self):
        return self._marks

    @marks.setter
    def marks(self, value):
        if 0 <= value <= 100:
            self._marks = value
        else:
            print("Invalid marks!")


s = Student(90)

print(s.marks)

s.marks = 95
print(s.marks)

s.marks = 150
```

**Output:**

```text
90
95
Invalid marks!
```

Here, the setter prevents invalid marks from being assigned.

## 2.4 Abstraction

Abstraction means hiding unnecessary implementation details and exposing only the essential features.

In simple words, users should know what an object does without necessarily knowing how it does it internally.

### Real-World Example

Consider driving a car.

You know how to:

- Start the car.
- Accelerate.
- Apply brakes.
- Change gears.

You do not need to understand the complete internal working of the engine to drive it.

That is abstraction.

### Abstraction in Python

Python provides the `abc` module to implement abstraction using abstract classes and methods.

Let's understand with an example.

```python
from abc import ABC, abstractmethod


class Shape(ABC):

    @abstractmethod
    def area(self):
        pass


class Rectangle(Shape):

    def __init__(self, length, breadth):
        self.length = length
        self.breadth = breadth

    def area(self):
        return self.length * self.breadth


class Circle(Shape):

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius


rectangle = Rectangle(10, 5)
circle = Circle(7)

print(rectangle.area())
print(circle.area())
```

**Output:**

```text
50
153.86
```

Let's understand:

1. `ABC` represents the base class for abstract classes.
2. `@abstractmethod` marks a method as abstract.
3. The Shape class defines a common requirement: every concrete shape should implement `area()`.
4. Rectangle and Circle provide their own implementations.

You cannot directly create an object of Shape because it contains an abstract method that has not been implemented.

### Difference Between the Four Pillars

| Pillar | Meaning | Main Purpose |
|---|---|---|
| Inheritance | Acquiring properties from another class | Code reuse |
| Polymorphism | Same interface, different behaviours | Flexibility |
| Encapsulation | Bundling data and methods with controlled access | Data management |
| Abstraction | Hiding implementation details | Simplicity |

---

# 3. Dunder Methods (Magic Methods)

## 3.1 What are Dunder Methods?

Dunder stands for **Double Underscore**.

Dunder methods are special methods in Python that begin and end with double underscores.

For example:

```python
__init__()
__str__()
__repr__()
```

These methods allow us to customize how objects behave when we use built-in operations such as:

- Creating objects.
- Printing objects.
- Comparing objects.
- Adding objects together.
- Getting the length of objects.

Let's understand the most important ones.

## 3.2 __init__()

We have already encountered this method.

It initializes an object when it is created.

Example:

```python
class Student:

    def __init__(self, name):
        self.name = name


s = Student("Rahul")

print(s.name)
```

**Output:**

```text
Rahul
```

## 3.3 __str__()

The `__str__()` method defines the human-readable string representation of an object.

It is called when we use `print()` on an object or convert it using `str()`.

Example:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name} is {self.age} years old."


s = Student("Rahul", 20)

print(s)
```

**Output:**

```text
Rahul is 20 years old.
```

Without `__str__()`, printing the object would normally display a default representation containing its class name and memory address.

## 3.4 __repr__()

The `__repr__()` method defines the official or developer-oriented representation of an object.

It is generally designed to provide an unambiguous representation that helps developers understand or recreate the object.

Example:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Student('{self.name}', {self.age})"


s = Student("Rahul", 20)

print(repr(s))
```

**Output:**

```text
Student('Rahul', 20)
```

### Difference Between __str__() and __repr__()

| `__str__()` | `__repr__()` |
|---|---|
| Human-readable representation | Developer-oriented representation |
| Used by `str()` and `print()` | Used by `repr()` and often the interactive interpreter |
| Focuses on readability | Focuses on clarity and unambiguity |

**Tip:** If `__str__()` is not defined, Python can fall back to `__repr__()` when converting an object to a string.

## 3.5 __len__()

This method defines what happens when we call `len()` on an object.

Example:

```python
class Team:

    def __init__(self, members):
        self.members = members

    def __len__(self):
        return len(self.members)


team = Team(["Rahul", "Aman", "Riya"])

print(len(team))
```

**Output:**

```text
3
```

## 3.6 Operator Overloading

Operator overloading allows us to define how operators behave when used with objects of our own classes.

For example, we can customize the `+` operator using `__add__()`.

### Example

```python
class Point:

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(
            self.x + other.x,
            self.y + other.y
        )

    def __str__(self):
        return f"({self.x}, {self.y})"


p1 = Point(2, 3)
p2 = Point(4, 5)

p3 = p1 + p2

print(p3)
```

**Output:**

```text
(6, 8)
```

Let's understand:

1. We created two Point objects.
2. We used the `+` operator.
3. Python internally called `p1.__add__(p2)`.
4. The method added the coordinates and returned a new Point object.

### Some Common Dunder Methods

| Method | Purpose |
|---|---|
| `__init__()` | Initializes an object |
| `__str__()` | Human-readable string representation |
| `__repr__()` | Developer-oriented representation |
| `__len__()` | Defines behaviour of `len()` |
| `__add__()` | Defines behaviour of `+` |
| `__sub__()` | Defines behaviour of `-` |
| `__mul__()` | Defines behaviour of `*` |
| `__eq__()` | Defines behaviour of `==` |
| `__lt__()` | Defines behaviour of `<` |

---

# 4. Generators in Python

## 4.1 What is a Generator?

A generator is a special type of iterator that produces values one at a time instead of storing all values in memory at once.

Generators are particularly useful when working with large amounts of data.

Let's understand with an example.

Suppose you want to generate numbers from 1 to 1,000,000.

You could create a list:

```python
numbers = list(range(1, 1000001))
```

This stores all one million numbers in memory.

But what if you only need one number at a time?

A generator can help.

## 4.2 Understanding yield

Python provides the `yield` keyword to create generators.

Unlike `return`, which ends a function and sends back a value, `yield` pauses the function and remembers its state.

When the generator is requested to produce another value, execution continues from where it stopped.

### Example

```python
def count():

    yield 1
    yield 2
    yield 3


gen = count()

print(next(gen))
print(next(gen))
print(next(gen))
```

**Output:**

```text
1
2
3
```

Let's understand:

1. `count()` is a generator function because it contains `yield`.
2. Calling `count()` creates a generator object.
3. `next()` requests the next available value.
4. Each `yield` pauses the function.
5. When all values have been produced, the generator raises `StopIteration`.

## 4.3 Generator vs Normal Function

Consider these two functions.

**Normal Function:**

```python
def numbers():
    return [1, 2, 3, 4, 5]


result = numbers()

print(result)
```

**Generator Function:**

```python
def numbers():

    yield 1
    yield 2
    yield 3
    yield 4
    yield 5


result = numbers()

for num in result:
    print(num)
```

### Difference

| Normal Function | Generator Function |
|---|---|
| Uses `return` to return a result | Uses `yield` to produce values |
| May create and return an entire collection | Produces values one at a time |
| A returned list stores all its elements | A generator does not store all future values |
| Useful when the complete result is needed | Useful for lazy, sequential processing |

## 4.4 Generator Expressions

Just like list comprehensions, Python also supports generator expressions.

Example:

```python
numbers = (x * x for x in range(1, 6))

for num in numbers:
    print(num)
```

**Output:**

```text
1
4
9
16
25
```

Notice the difference:

```python
[x * x for x in range(1, 6)]
```

This creates a list.

Whereas:

```python
(x * x for x in range(1, 6))
```

This creates a generator expression.

Generator expressions are useful when you want to process data without creating an entire list in memory.

---

# 5. Custom Iterators

## 5.1 What is an Iterator?

An iterator is an object that allows us to access elements one at a time.

You have already used iterators in Python without realizing it.

For example:

```python
numbers = [10, 20, 30]

for num in numbers:
    print(num)
```

The `for` loop internally obtains an iterator and requests elements one by one.

Python provides two important methods for implementing the iterator protocol:

- `__iter__()`
- `__next__()`

## 5.2 Understanding __iter__()

The `__iter__()` method returns an iterator object.

It is called when we request an iterator using `iter()`.

Example:

```python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(iterator)
```

The result is an iterator object.

## 5.3 Understanding __next__()

The `__next__()` method returns the next element from an iterator.

Example:

```python
numbers = [10, 20, 30]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
```

**Output:**

```text
10
20
30
```

After all elements are consumed, calling `next()` again raises `StopIteration`.

## 5.4 Creating Our Own Custom Iterator

Now let's create an iterator ourselves.

We will create a class that generates numbers from 1 to 5.

### Example

```python
class MyNumbers:

    def __init__(self, limit):
        self.limit = limit
        self.current = 1

    def __iter__(self):
        return self

    def __next__(self):

        if self.current <= self.limit:
            value = self.current
            self.current += 1
            return value

        else:
            raise StopIteration


numbers = MyNumbers(5)

for num in numbers:
    print(num)
```

**Output:**

```text
1
2
3
4
5
```

Let's break this down:

**Step 1:** We create a class called `MyNumbers`.

**Step 2:** The constructor initializes:

- `limit`: The maximum number.
- `current`: The number currently being generated.

**Step 3:** `__iter__()` returns the iterator itself.

**Step 4:** `__next__()` checks whether the current number is within the limit.

**Step 5:** If the condition is satisfied, it returns the current number and increments it.

**Step 6:** Once the limit is reached, it raises `StopIteration`.

This is how Python knows that there are no more elements to process.

### Iterator vs Iterable vs Generator

These three terms are related but different.

| Term | Meaning | Example |
|---|---|---|
| Iterable | An object whose elements can be iterated over | List, tuple, string |
| Iterator | An object that produces elements one at a time | `iter([1, 2, 3])` |
| Generator | A convenient way of creating an iterator | A function using `yield` |

**Important:** Every generator is an iterator, but not every iterator is a generator.

---

# 6. Decorators in Python

## 6.1 What is a Decorator?

A decorator is a function that takes another function, adds or modifies its behaviour, and returns a function.

In simple words, decorators allow us to add functionality to existing functions without directly modifying their original code.

### Real-World Example

Imagine you have a function that performs a task.

Before executing that task, you want to:

- Display a welcome message.
- Record the execution time.
- Check whether the user is authorized.

Instead of adding these operations inside every function, you can use decorators.

## 6.2 Understanding Functions as Objects

Before learning decorators, we need to understand one important Python concept.

In Python, functions are treated as first-class objects.

This means you can:

- Store functions in variables.
- Pass functions as arguments.
- Return functions from other functions.

Example:

```python
def greet():
    print("Hello!")


message = greet

message()
```

**Output:**

```text
Hello!
```

Here, we assigned the function to another variable and called it using that variable.

Notice that we used `greet`, not `greet()`.

Without parentheses, we refer to the function itself rather than executing it.

## 6.3 Functions Inside Functions

Python allows us to define one function inside another.

Example:

```python
def outer():

    print("Outer function")

    def inner():
        print("Inner function")

    inner()


outer()
```

**Output:**

```text
Outer function
Inner function
```

This concept is useful when creating decorators.

## 6.4 Returning a Function

A function can also return another function.

Example:

```python
def outer():

    def inner():
        print("Hello from inner function!")

    return inner


result = outer()

result()
```

**Output:**

```text
Hello from inner function!
```

The outer function returns the inner function without executing it.

## 6.5 Creating Our First Decorator

Let's create a simple decorator that displays a message before and after executing a function.

### Example

```python
def my_decorator(func):

    def wrapper():

        print("Before function execution")

        func()

        print("After function execution")

    return wrapper


@my_decorator
def greet():
    print("Hello World!")


greet()
```

**Output:**

```text
Before function execution
Hello World!
After function execution
```

Let's understand this step by step.

**Step 1:** We define a decorator called `my_decorator`.

**Step 2:** It accepts another function as an argument.

```python
def my_decorator(func):
```

**Step 3:** We define an inner function called `wrapper()`.

**Step 4:** The wrapper prints a message, calls the original function and prints another message.

**Step 5:** The decorator returns the wrapper function.

**Step 6:** We use:

```python
@my_decorator
```

This applies the decorator to `greet()`.

The following:

```python
@my_decorator
def greet():
    print("Hello World!")
```

Is equivalent to:

```python
def greet():
    print("Hello World!")

greet = my_decorator(greet)
```

This is the basic working principle of decorators.

## 6.6 Decorators with Arguments

What if the original function accepts arguments?

We can use `*args` and `**kwargs` inside the wrapper.

Example:

```python
def my_decorator(func):

    def wrapper(*args, **kwargs):

        print("Executing function...")

        result = func(*args, **kwargs)

        print("Execution completed!")

        return result

    return wrapper


@my_decorator
def add(a, b):
    return a + b


print(add(10, 20))
```

**Output:**

```text
Executing function...
Execution completed!
30
```

Here:

- `*args` accepts positional arguments.
- `**kwargs` accepts keyword arguments.
- `func(*args, **kwargs)` passes them to the original function.
- `return result` preserves the original function's return value.

## 6.7 Using functools.wraps

There is one more useful thing to know about decorators.

When we decorate a function, the wrapper can replace some of the original function's metadata, such as its name and docstring.

Python provides `functools.wraps` to preserve this information.

Example:

```python
from functools import wraps


def my_decorator(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Function is executing...")
        return func(*args, **kwargs)

    return wrapper


@my_decorator
def greet():
    """This function greets the user."""
    print("Hello!")


greet()

print(greet.__name__)
print(greet.__doc__)
```

**Output:**

```text
Function is executing...
Hello!
greet
This function greets the user.
```

`@wraps(func)` preserves the original function's metadata.

### Common Uses of Decorators

Decorators are commonly used for:

- Authentication and authorization.
- Logging.
- Measuring execution time.
- Caching results.
- Input validation.
- Web application routing.

You will encounter decorators frequently when working with frameworks such as Flask, Django and FastAPI.

---

# 7. Mini Project: Banking Management System Using OOP

Now let's combine what we have learned into a small project.

We will create a simple Banking Management System using classes and objects.

### Project Requirements

Our program should allow users to:

1. Create a bank account.
2. Deposit money.
3. Withdraw money.
4. Check account balance.
5. Display account information.

We will use:

- Classes and Objects.
- Constructors.
- Encapsulation.
- Methods.
- Conditional Statements.
- Exception Handling.
- Dunder Methods.

### Complete Code

```python
class BankAccount:

    def __init__(self, name, account_number, balance=0):

        self.name = name
        self.account_number = account_number
        self.__balance = balance

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError("Deposit amount must be positive!")

        self.__balance += amount

        print("Amount deposited successfully!")

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive!")

        if amount > self.__balance:
            print("Insufficient balance!")
            return

        self.__balance -= amount

        print("Amount withdrawn successfully!")

    def get_balance(self):
        return self.__balance

    def display_details(self):

        print("\n--- Account Details ---")
        print("Name:", self.name)
        print("Account Number:", self.account_number)
        print("Balance:", self.__balance)

    def __str__(self):
        return f"Account Holder: {self.name}"


def main():

    account = BankAccount("Rahul", 123456, 5000)

    while True:

        print("\n--- Banking System ---")
        print("1. Deposit")
        print("2. Withdraw")
        print("3. Check Balance")
        print("4. Account Details")
        print("5. Exit")

        choice = input("Enter your choice: ")

        try:

            if choice == "1":

                amount = float(input("Enter amount to deposit: "))
                account.deposit(amount)

            elif choice == "2":

                amount = float(input("Enter amount to withdraw: "))
                account.withdraw(amount)

            elif choice == "3":

                print("Current Balance:", account.get_balance())

            elif choice == "4":

                account.display_details()

            elif choice == "5":

                print("Thank you for using our banking system!")
                break

            else:

                print("Invalid choice!")

        except ValueError as error:

            print("Error:", error)


main()
```

### What Did We Learn?

| Concept | Where It Was Used |
|---|---|
| Class | `BankAccount` |
| Object | `account` |
| Constructor | `__init__()` |
| Attributes | `name`, `account_number`, `__balance` |
| Methods | `deposit()`, `withdraw()` |
| Encapsulation | `__balance` |
| Dunder Method | `__str__()` |
| Exception Handling | `try/except` |
| Functions | `main()` |

**Challenge:** Try modifying the project to support multiple bank accounts instead of just one.

You can also add an account transfer feature.

---

# 8. Practice Questions

Try solving these questions on your own before moving to the next phase.

## Beginner Level

1. Create a class called `Car` with attributes such as brand, model and colour.
2. Create two objects of the Car class with different values.
3. Create a class called `Student` that accepts a name, age and marks using a constructor.
4. Create a Calculator class with methods for addition, subtraction, multiplication and division.
5. Create a class called `Rectangle` that calculates its area and perimeter.

## Intermediate Level

6. Create a parent class called `Animal` and child classes called `Dog` and `Cat`.
7. Demonstrate multiple inheritance using three classes.
8. Create a program demonstrating method overriding.
9. Create a class called `BankAccount` and implement encapsulation.
10. Create an abstract class called `Vehicle` with an abstract method `start()`.
11. Implement `__str__()` and `__repr__()` in a Student class.
12. Overload the `+` operator for a class representing complex numbers.
13. Create a generator that produces all even numbers up to a given limit.
14. Create a custom iterator that generates the Fibonacci sequence.
15. Write a decorator that measures the execution time of a function.

## Challenge Projects

**1. Library Management System**

Build a system that allows users to:

- Add books.
- Remove books.
- Issue books.
- Return books.
- Display available books.

Use classes such as `Book`, `Library` and `Member`.

**2. Employee Management System**

Build a system that:

- Stores employee information.
- Calculates salaries.
- Separates employees into different categories.
- Uses inheritance to represent different employee roles.

**3. E-commerce Shopping Cart**

Build a basic shopping cart application that allows users to:

- Add products.
- Remove products.
- View cart items.
- Calculate the total price.
- Apply discounts.

Try implementing it using classes, objects, inheritance and encapsulation.

---

# 9. Important Concepts to Remember

| Concept | Meaning |
|---|---|
| Class | Blueprint for creating objects |
| Object | Instance of a class |
| Attribute | Data associated with an object or class |
| Method | Function defined inside a class |
| `self` | Reference to the current instance |
| `__init__()` | Initializes an object |
| Inheritance | Allows a class to reuse another class's functionality |
| Polymorphism | Allows different objects to provide different behaviours through a common interface |
| Encapsulation | Bundles data and methods and controls access to internal data |
| Abstraction | Hides implementation details |
| Dunder Methods | Special methods used to customize object behaviour |
| Generator | Produces values one at a time |
| `yield` | Pauses a generator and produces a value |
| Iterator | Object that produces elements one at a time |
| Decorator | Modifies or extends a function's behaviour |

---

# 10. Useful Documentation and Learning Resources

These official resources will help you understand the concepts in greater detail.

| Topic | Documentation |
|---|---|
| Classes and Objects | https://docs.python.org/3/tutorial/classes.html |
| Inheritance | https://docs.python.org/3/tutorial/classes.html#inheritance |
| Python Data Model | https://docs.python.org/3/reference/datamodel.html |
| Abstract Base Classes | https://docs.python.org/3/library/abc.html |
| Iterators | https://docs.python.org/3/tutorial/classes.html#iterators |
| Generators | https://docs.python.org/3/tutorial/classes.html#generators |
| Decorators | https://docs.python.org/3/glossary.html#term-decorator |
| functools Module | https://docs.python.org/3/library/functools.html |

---

# 11. What's Next?

Congratulations on completing Phase 3!

You have now learned how Python organizes larger programs using classes and objects. You have also explored advanced concepts such as generators, iterators and decorators.

These concepts are important when working with real-world Python applications and frameworks.

In the next phase, we will explore the practical Python ecosystem.

Some topics worth learning next are:

- Modules and Packages.
- Working with APIs.
- HTTP Requests using the `requests` library.
- Database Connectivity (SQLite and MongoDB).
- NumPy and Pandas.
- Data Visualization using Matplotlib.
- Unit Testing using `unittest` and `pytest`.
- Virtual Environments and Dependency Management.
- Project Structure and Code Organization.
- Git and GitHub for Python Projects.

**A final piece of advice:** Don't just memorize OOP definitions. Try implementing them in small projects. Understanding when and why to use inheritance, encapsulation and abstraction is much more valuable than simply knowing their definitions.

Keep practising, keep building, and Happy Coding! 🐍