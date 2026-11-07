# NumPy

**NumPy** is the foundation of scientific computing in Python. It provides fast **arrays** and the maths functions to work on them. Many other libraries, including pandas, are built on top of it.

## Install and import

```bash
pip install numpy
```

```python
import numpy as np      # "np" is the universal nickname
```

## Arrays vs lists

```python
nums = [1, 2, 3, 4]
arr = np.array([1, 2, 3, 4])

print(nums * 2)    # [1, 2, 3, 4, 1, 2, 3, 4]  (list repeats)
print(arr * 2)     # [2 4 6 8]                 (array does maths on every item)
```

Applying an operation to a whole array at once is called **vectorization**. It's shorter than writing a loop, and much faster because NumPy runs optimised C code underneath.

## Basic statistics

```python
print(arr.sum())    # 10
print(arr.mean())   # 2.5
print(arr.max())    # 4
```

## 2D arrays

```python
matrix = np.array([[1, 2], [3, 4]])

print(matrix.shape)   # (2, 2)
print(matrix.T)       # transposed: rows and columns swapped
```

## Handy ways to create arrays

| Function | What it makes |
|---|---|
| `np.arange(5)` | `[0 1 2 3 4]` |
| `np.zeros(3)` | `[0. 0. 0.]` |
| `np.ones(3)` | `[1. 1. 1.]` |
| `np.linspace(0, 1, 5)` | 5 evenly spaced numbers from 0 to 1 |

## Where it's used

Data science, machine learning, image processing, simulations, and anywhere you need to crunch lots of numbers quickly.
