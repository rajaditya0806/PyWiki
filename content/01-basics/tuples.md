# Tuples

A **tuple** is an ordered collection like a list, but it **can't be changed** after creation (it is *immutable*).

## Creating tuples

```python
point = (3, 4)
single = (5,)        # the comma makes it a tuple; (5) is just the number 5
empty = ()

print(point[0])      # 3
```

## Immutability

```python
point[0] = 10
# TypeError: 'tuple' object does not support item assignment
```

## Unpacking

You can pull a tuple apart into separate variables:

```python
x, y = point
print(x, y)          # 3 4

a, b = 1, 2          # the right side is a tuple too
a, b = b, a          # swap two variables in one line
```

## Where tuples are used

- **Returning several values** from a function: `return min_value, max_value`
- **Dictionary keys**, since they're immutable: `{(0, 0): "origin"}`
- **Data that shouldn't change**, like coordinates or RGB colours

## Tuple vs list

| | List | Tuple |
|---|---|---|
| Syntax | `[1, 2]` | `(1, 2)` |
| Changeable | Yes | No |
| Typical use | Collections that grow or change | Fixed groups of related values |

A tuple holding a list is only *shallowly* immutable: you can't swap the list for another one, but you can still change what's inside the list.
