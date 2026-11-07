# Sets

A **set** is an unordered collection of **unique** items. Duplicates are removed automatically.

## Creating sets

```python
nums = {1, 2, 2, 3, 3, 3}
print(nums)          # {1, 2, 3}

empty = set()        # {} would create an empty dict, not a set!
```

## Set operations

Sets support the same operations you learned in maths:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)   # {1, 2, 3, 4, 5}  union: everything
print(a & b)   # {3}              intersection: in both
print(a - b)   # {1, 2}           difference: in a but not b
print(a ^ b)   # {1, 2, 4, 5}     symmetric difference: in one but not both
```

## Adding and removing

```python
a.add(10)
a.discard(1)     # no error if 1 isn't there
a.remove(2)      # KeyError if 2 isn't there
```

## Why use a set?

- **Removing duplicates**: `list(set([1, 1, 2]))` gives the unique values (order isn't guaranteed).
- **Fast membership tests**: `x in my_set` is much faster than `x in my_list` for large collections.
- **Comparing groups**: finding what two collections have in common.

Items in a set must be immutable, so a list can't go inside a set.
