# Dictionaries

A **dictionary** (`dict`) stores data as **key: value** pairs. You look things up by key instead of by position, like finding a word in a real dictionary.

## Creating and reading

```python
person = {"name": "Ada", "language": "Python"}

print(person["name"])             # Ada
print(person.get("email"))        # None  (no error if the key is missing)
print(person.get("email", "n/a")) # n/a   (custom default)
```

Using `person["email"]` on a missing key raises a `KeyError`, while `.get()` stays safe.

## Changing a dictionary

```python
person["age"] = 36           # add a new key
person["language"] = "Py"    # update an existing key
del person["age"]            # remove a key
```

## Looping

```python
for key, value in person.items():
    print(key, "->", value)
```

## Common methods

| Method | What it does |
|---|---|
| `keys()` | All the keys |
| `values()` | All the values |
| `items()` | All `(key, value)` pairs |
| `get(k, default)` | Safe lookup |
| `pop(k)` | Removes a key and returns its value |
| `update(other)` | Merges another dictionary in |

## Dictionary comprehension

```python
squares = {n: n ** 2 for n in range(4)}
print(squares)   # {0: 0, 1: 1, 2: 4, 3: 9}
```

## Good to know

- Keys must be **immutable** (strings, numbers, tuples). A list can't be a key.
- Since Python 3.7, dictionaries remember the order items were inserted.
