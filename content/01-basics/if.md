# if

The `if` keyword runs code only when a condition is `True`. Use `elif` (else if) for extra conditions and `else` for everything left over.

```python
score = 72

if score >= 90:
    print("Grade A")
elif score >= 60:
    print("Grade B")
else:
    print("Needs work")
```

Python checks the conditions from top to bottom and runs **only the first block** that matches. Output here: `Grade B`.

## Indentation is the syntax

Python uses indentation, not curly braces, to mark which lines belong to the `if`. The standard is 4 spaces.

## Truthiness

A condition doesn't have to be a comparison. These values count as `False`:

`0`, `0.0`, `""` (empty string), `[]`, `{}`, `set()`, `None`, and `False`

Everything else counts as `True`:

```python
items = []

if items:
    print("Has items")
else:
    print("Empty")      # this runs
```

## One-line version (conditional expression)

```python
age = 20
status = "adult" if age >= 18 else "minor"
```
