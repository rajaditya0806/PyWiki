# Comparison Operators

Comparison operators compare two values and give back `True` or `False`.

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `<` | Less than | `3 < 5` | `True` |
| `>` | Greater than | `3 > 5` | `False` |
| `<=` | Less than or equal | `5 <= 5` | `True` |
| `>=` | Greater than or equal | `4 >= 5` | `False` |

A single `=` **assigns** a value, while `==` **compares**. Mixing them up is a very common beginner mistake.

## Chaining

Python lets you chain comparisons like in maths:

```python
x = 7
print(1 < x < 10)    # True
```

## Logical operators

Combine conditions with `and`, `or`, and `not`:

```python
age = 20
has_id = True

print(age >= 18 and has_id)   # True
print(age < 13 or age > 65)   # False
print(not has_id)             # False
```

## == vs is

`==` asks "do these have the same **value**?" while `is` asks "are these the **same object** in memory?"

```python
a = [1, 2]
b = [1, 2]

print(a == b)    # True
print(a is b)    # False  (two separate lists)
```

Use `is` mainly for `None`: `if value is None:`.

## Membership

```python
print("a" in "banana")        # True
print(4 in [1, 2, 3])         # False
```
