# Floats

A **float** is a number with a decimal point, like `3.14` or `-0.5`.

## Creating floats

```python
price = 19.99
ratio = 1.5e3       # scientific notation: 1500.0

print(type(price))  # <class 'float'>
print(10 / 2)       # 5.0  (division always gives a float)
```

## The famous precision problem

Computers store floats in binary, and some decimals can't be stored exactly. This surprises every beginner:

```python
print(0.1 + 0.2)            # 0.30000000000000004
print(0.1 + 0.2 == 0.3)     # False
```

To compare floats safely, use `math.isclose`:

```python
import math

print(math.isclose(0.1 + 0.2, 0.3))   # True
```

For money, use the `decimal` module instead of floats, so rounding errors can't add up.

## Rounding and converting

```python
print(round(3.14159, 2))   # 3.14
print(float("3.5"))        # 3.5
print(float("inf"))        # inf  (infinity)
```

## Useful functions

| Function | What it does |
|---|---|
| `round(x, n)` | Rounds to `n` decimal places |
| `math.floor(x)` | Rounds down to the nearest integer |
| `math.ceil(x)` | Rounds up to the nearest integer |
| `math.sqrt(x)` | Square root |
