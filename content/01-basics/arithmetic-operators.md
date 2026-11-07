# Arithmetic Operators

Operators that do maths on numbers.

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `7 + 3` | `10` |
| `-` | Subtraction | `7 - 3` | `4` |
| `*` | Multiplication | `7 * 3` | `21` |
| `/` | Division (always a float) | `7 / 2` | `3.5` |
| `//` | Floor division | `7 // 2` | `3` |
| `%` | Modulo (remainder) | `7 % 2` | `1` |
| `**` | Power | `2 ** 3` | `8` |

## Floor division rounds down

```python
print(7 // 2)     # 3
print(-7 // 2)    # -4  (rounds toward negative infinity, not toward zero)
```

## Modulo is more useful than it looks

```python
print(10 % 3)           # 1
print(8 % 2 == 0)       # True: a quick even-number check
```

## Order of operations

Python follows the usual maths order: `**` first, then `*  /  //  %`, then `+  -`. Use brackets when in doubt.

```python
print(2 + 3 * 4)      # 14
print((2 + 3) * 4)    # 20
```

## Shortcut assignment

```python
x = 10
x += 5     # same as x = x + 5   -> 15
x *= 2     # same as x = x * 2   -> 30
```

## Operators on other types

`+` and `*` also work on strings and lists:

```python
print("ab" * 3)        # ababab
print([1, 2] + [3])    # [1, 2, 3]
```
