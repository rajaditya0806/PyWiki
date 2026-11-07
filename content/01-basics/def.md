# def

The `def` keyword defines a **function**: a named, reusable block of code.

```python
def greet(name):
    return f"Hello, {name}!"

message = greet("Ada")
print(message)       # Hello, Ada!
```

- `name` is a **parameter**, a placeholder for the value you pass in.
- `"Ada"` is the **argument**, the actual value passed when calling.
- `return` sends a value back to the caller. Without it, a function returns `None`.

## Default values

```python
def power(base, exponent=2):
    return base ** exponent

print(power(5))       # 25
print(power(2, 3))    # 8
```

## Returning several values

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([4, 9, 1])
print(low, high)      # 1 9
```

This works because the function really returns one tuple, which is then unpacked.

## Docstrings

A string on the first line of the function describes it, and tools like `help()` display it:

```python
def area(width, height):
    """Return the area of a rectangle."""
    return width * height
```

## A classic trap

Never use a mutable value (like a list) as a default argument:

```python
def add_item(item, items=[]):    # BAD: the same list is reused on every call
    items.append(item)
    return items
```

Use `items=None` and create the list inside the function instead.
