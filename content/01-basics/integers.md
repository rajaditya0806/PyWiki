# Integers

An **integer** (`int`) is a whole number: positive, negative, or zero. Python integers have no fixed size limit, so they can grow as large as your memory allows.

## Creating integers

```python
age = 25
debt = -300
big = 2 ** 100

print(big)          # 1267650600228229401496703205376
print(type(age))    # <class 'int'>
```

For readability you can use underscores in big numbers: `1_000_000` is the same as `1000000`.

## Converting to int

```python
print(int("42"))    # 42
print(int(3.9))     # 3  (cuts off the decimal, does NOT round)
```

`int("hello")` raises a `ValueError`, because the text isn't a number.

## Useful built-in functions

| Function | What it does | Example |
|---|---|---|
| `abs(x)` | Absolute value | `abs(-5)` gives `5` |
| `pow(x, y)` | `x` to the power `y` | `pow(2, 3)` gives `8` |
| `divmod(a, b)` | Quotient and remainder together | `divmod(7, 2)` gives `(3, 1)` |
| `bin(x)` | Binary form as a string | `bin(5)` gives `'0b101'` |
| `hex(x)` | Hexadecimal form as a string | `hex(255)` gives `'0xff'` |
