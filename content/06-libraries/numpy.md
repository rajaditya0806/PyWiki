# The Complete NumPy Guide: From Absolute Beginner to Production

> A progressive, hands-on tutorial for numerical computing with Python. It begins with arrays and builds toward broadcasting, linear algebra, performance, memory layout, testing, and production workflows.

**Suggested filename:** `numpy-complete-guide.md`  
**Audience:** Complete beginners through scientific and data-computing practitioners  
**Tested style:** Modern NumPy 2.x conventions; most examples also work with recent NumPy 1.x releases.

---

## Table of contents

- [How to use this guide](#how-to-use-this-guide)
- [Level 0 – Prerequisites and setup](#level-0--prerequisites-and-setup)
- [Level 1 – Absolute basics](#level-1--absolute-basics)
- [Level 2 – Core concepts](#level-2--core-concepts)
- [Level 3 – Intermediate numerical computing](#level-3--intermediate-numerical-computing)
- [Level 4 – Advanced techniques](#level-4--advanced-techniques)
- [Level 5 – Professional and production practices](#level-5--professional-and-production-practices)
- [NumPy quick reference](#numpy-quick-reference)
- [Glossary](#glossary)

---

## How to use this guide

Run each example in a Python file or notebook. Outputs are shown for representative examples. Floating-point formatting can vary slightly by platform and NumPy version.

NumPy (Numerical Python) provides efficient multidimensional arrays and operations over them. It is a foundation for scientific computing, machine learning, signal processing, image processing, simulation, and much of the Python data ecosystem.

The central idea is to store numerical data in arrays and perform operations on entire arrays rather than writing Python loops for every element.

---

# Level 0 – Prerequisites and setup

## 0.1 Python knowledge

You should recognize variables, lists, tuples, loops, functions, and imports. NumPy will replace many manual loops, but Python remains the language used to organize the program.

```python
values = [2, 4, 6]
doubled = [value * 2 for value in values]
print(doubled)
```

Output:

```text
[4, 8, 12]
```

NumPy will let you express this kind of numerical transformation directly on an array.

## 0.2 Install NumPy

Create a virtual environment for your project.

**Windows (PowerShell):**

```powershell
mkdir numpy-learning
cd numpy-learning
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install numpy matplotlib
```

**macOS / Linux:**

```bash
mkdir numpy-learning
cd numpy-learning
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install numpy matplotlib
```

Verify:

```bash
python -c "import numpy as np; print(np.__version__)"
```

Example output:

```text
2.1.3
```

Your installed version may differ.

## 0.3 Import convention

```python
import numpy as np

print(np.array([1, 2, 3]))
```

Output:

```text
[1 2 3]
```

`np` is the standard alias used in documentation and most Python projects.

## 0.4 Lists versus arrays

A Python list can contain mixed object types. A NumPy array normally stores values in a regular, homogeneous dtype, which enables compact storage and efficient numerical operations.

```python
numbers = [1, 2, 3]
array = np.array([1, 2, 3])

print(type(numbers))
print(type(array))
print(array.dtype)
```

Output (dtype may be platform-dependent):

```text
<class 'list'>
<class 'numpy.ndarray'>
int64
```

### Level 0 – Try it yourself

1. Print the NumPy version.
2. Create an array from `[5, 10, 15]`.
3. Create a two-dimensional array from `[[1, 2], [3, 4]]`.
4. Print the type and dtype of each array.

<details>
<summary>Solutions</summary>

```python
import numpy as np

print(np.__version__)
a = np.array([5, 10, 15])
b = np.array([[1, 2], [3, 4]])
print(type(a), a.dtype)
print(type(b), b.dtype)
```
</details>

### Level 0 – Common mistakes and gotchas

- Installing NumPy into a different environment from the one running Python.
- Naming your file `numpy.py`, which can shadow the real package.
- Expecting a NumPy array to behave exactly like a Python list.
- Assuming every machine uses the same default integer width; inspect `dtype` when it matters.

---

# Level 1 – Absolute basics

## 1.1 Creating arrays

The main constructor is `np.array()`.

```python
a = np.array([10, 20, 30])
b = np.array([[1, 2, 3], [4, 5, 6]])

print(a)
print(b)
```

Output:

```text
[10 20 30]
[[1 2 3]
 [4 5 6]]
```

Arrays can have one, two, or many dimensions.

## 1.2 Useful array constructors

```python
print(np.zeros((2, 3)))
print(np.ones((2, 2)))
print(np.full((2, 3), 7))
print(np.eye(3))
```

Output:

```text
[[0. 0. 0.]
 [0. 0. 0.]]
[[1. 1.]
 [1. 1.]]
[[7 7 7]
 [7 7 7]]
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]
```

`np.empty(shape)` allocates an array without initializing its values. It can be fast, but its contents are arbitrary until you fill every element. Never assume it starts with zeros.

## 1.3 Ranges and evenly spaced values

```python
print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))
```

Output:

```text
[0 2 4 6 8]
[0.   0.25 0.5  0.75 1.  ]
```

- `arange(start, stop, step)` uses a step size and excludes `stop`.
- `linspace(start, stop, num)` creates a specified number of evenly spaced values and includes `stop` by default.

For floating-point sequences where the exact number of samples matters, prefer `linspace`.

## 1.4 Array attributes

```python
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(matrix.ndim)
print(matrix.shape)
print(matrix.size)
print(matrix.dtype)
print(matrix.itemsize)
```

Output on a typical 64-bit system:

```text
2
(2, 3)
6
int64
8
```

| Attribute | Meaning |
|---|---|
| `ndim` | Number of dimensions |
| `shape` | Length along each dimension |
| `size` | Total number of elements |
| `dtype` | Element data type |
| `itemsize` | Bytes per element |

## 1.5 Arithmetic on whole arrays

NumPy arithmetic is element-wise when the shapes are compatible.

```python
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b)
print(a * b)
print(a ** 2)
print(b / 10)
```

Output:

```text
[11 22 33]
[10 40 90]
[1 4 9]
[1. 2. 3.]
```

This is vectorized arithmetic: concise and typically much faster than a Python loop for large numerical arrays.

## 1.6 Aggregations

```python
data = np.array([[1, 2, 3], [4, 5, 6]])

print(data.sum())
print(data.mean())
print(data.min())
print(data.max())
```

Output:

```text
21
3.5
1
6
```

### Level 1 – Try it yourself

1. Create an array of integers from 0 to 9.
2. Create five equally spaced values from 10 to 20.
3. Create a 3×3 array of ones.
4. Multiply `[2, 4, 6]` by `[3, 5, 7]` element by element.
5. Find the mean of a 2×3 matrix.

<details>
<summary>Solutions</summary>

```python
a = np.arange(10)
b = np.linspace(10, 20, 5)
c = np.ones((3, 3))
d = np.array([2, 4, 6]) * np.array([3, 5, 7])
e = np.array([[1, 2, 3], [4, 5, 6]]).mean()

print(a)
print(b)
print(c)
print(d)
print(e)
```

Outputs include `[0 1 2 3 4 5 6 7 8 9]`, `[10.  12.5 15.  17.5 20.]`, `[ 6 20 42]`, and `3.5`.
</details>

### Level 1 – Common mistakes and gotchas

- `np.arange(0, 1, 0.1)` can show floating-point representation surprises. Use `linspace` for a fixed number of points.
- `*` is element-wise multiplication, not matrix multiplication.
- Integer division such as `a // b` is floor division; `/` produces floating-point results.
- `np.empty()` contains uninitialized data.

---

# Level 2 – Core concepts

## 2.1 Dimensions, shape, and axes

A one-dimensional array has one axis. A matrix has two axes. For a 2D array, axis 0 runs down rows and axis 1 runs across columns.

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

print(a.sum(axis=0))
print(a.sum(axis=1))
```

Output:

```text
[5 7 9]
[ 6 15]
```

Think of `axis=0` as collapsing rows to produce one result per column; `axis=1` collapses columns to produce one result per row.

## 2.2 Indexing and slicing

```python
a = np.array([10, 20, 30, 40, 50])
print(a[0])
print(a[-1])
print(a[1:4])
```

Output:

```text
10
50
[20 30 40]
```

For a matrix:

```python
m = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(m[1, 2])
print(m[:, 0])
print(m[0:2, 1:3])
```

Output:

```text
6
[1 4 7]
[[2 3]
 [5 6]]
```

A colon means “all values along this axis.”

## 2.3 Views versus copies

Basic slicing usually returns a **view**: a new array object that refers to the same underlying data. Editing the view can edit the original.

```python
a = np.array([1, 2, 3, 4])
view = a[1:3]
view[0] = 99
print(a)
```

Output:

```text
[ 1 99  3  4]
```

Use `.copy()` when independent storage is required:

```python
a = np.array([1, 2, 3, 4])
copy = a[1:3].copy()
copy[0] = 99
print(a)
```

Output:

```text
[1 2 3 4]
```

Advanced indexing generally creates a copy, while basic slicing generally creates a view. Check `np.shares_memory(x, y)` when storage sharing matters.

## 2.4 Boolean masks

A Boolean mask selects elements where its condition is true.

```python
a = np.array([3, 8, 1, 9, 5])
mask = a > 5
print(mask)
print(a[mask])
```

Output:

```text
[False  True False  True False]
[8 9]
```

Combine conditions with `&`, `|`, and `~`; put each comparison in parentheses.

```python
a[(a >= 3) & (a <= 8)]
```

Do not use Python `and` or `or` with NumPy arrays.

## 2.5 Fancy / integer-array indexing

```python
a = np.array([10, 20, 30, 40, 50])
indices = [0, 2, 4]
print(a[indices])
```

Output:

```text
[10 30 50]
```

For a matrix:

```python
m = np.arange(12).reshape(3, 4)
print(m[[0, 2], [1, 3]])
```

Output:

```text
[ 1 11]
```

This pairs the coordinates `(0, 1)` and `(2, 3)`. To select a cross-product of rows and columns, use `np.ix_()`:

```python
print(m[np.ix_([0, 2], [1, 3])])
```

Output:

```text
[[ 1  3]
 [ 9 11]]
```

## 2.6 Reshape, flatten, and transpose

```python
a = np.arange(12)
m = a.reshape(3, 4)

print(m)
print(m.T)
print(m.ravel())
print(m.flatten())
```

`reshape()` changes the shape without changing the element order. It returns a view when possible, otherwise a copy. `.T` transposes axes. `ravel()` returns a flattened view when possible; `flatten()` always returns a copy.

## 2.7 Data types and casting

NumPy arrays usually have one dtype. A dtype controls storage size and arithmetic behavior.

```python
a = np.array([1, 2, 3], dtype=np.int16)
b = a.astype(np.float64)
print(a.dtype, a.itemsize)
print(b.dtype, b)
```

Output:

```text
int16 2
float64 [1. 2. 3.]
```

Casting can lose information:

```python
values = np.array([1.9, 2.8])
print(values.astype(int))
```

Output:

```text
[1 2]
```

The fractional parts are discarded. Use an explicit rounding operation when rounding is intended.

## 2.8 Missing and non-finite values

Floating-point arrays commonly use `np.nan` for missing or invalid numeric values.

```python
a = np.array([1.0, np.nan, 3.0])
print(np.isnan(a))
print(np.nanmean(a))
```

Output:

```text
[False  True False]
2.0
```

`np.nanmean`, `np.nansum`, and related functions ignore NaNs in their calculation. `np.inf` and `-np.inf` represent positive and negative infinity; use `np.isfinite()` to identify finite values.

## 2.9 Random numbers with a Generator

Prefer the modern generator API instead of global random state.

```python
rng = np.random.default_rng(seed=42)
print(rng.integers(0, 10, size=5))
```

For a fixed seed, the same NumPy version and generator method produce reproducible results. Exact streams may differ across algorithms or versions, so record the seed and environment for scientific reproducibility.

### Level 2 – Try it yourself

1. Create a 4×3 array and calculate column sums and row means.
2. Select the last column of a matrix.
3. Select all values greater than 10.
4. Make a slice copy and show that changing it does not change the original.
5. Generate ten reproducible random integers between 1 and 100.

<details>
<summary>Solutions</summary>

```python
a = np.arange(12).reshape(4, 3)
print(a.sum(axis=0))
print(a.mean(axis=1))
print(a[:, -1])
print(a[a > 10])

original = np.array([1, 2, 3, 4])
independent = original[1:3].copy()
independent[0] = 99
print(original)

rng = np.random.default_rng(7)
print(rng.integers(1, 101, size=10))
```
</details>

### Level 2 – Common mistakes and gotchas

- Confusing axis 0 and axis 1. Write down the output shape to reason about which axis is removed.
- Assuming every slice is a copy. Basic slicing commonly shares memory.
- Assuming `reshape()` always allocates independent memory.
- Using `and`/`or` instead of `&`/`|` for array conditions.
- Forgetting that integer casting truncates rather than rounds.
- Treating `NaN == NaN` as true; use `np.isnan()`.

---

# Level 3 – Intermediate numerical computing

## 3.1 Broadcasting

Broadcasting allows NumPy to perform element-wise operations on arrays with compatible shapes without manually repeating data.

Compare shapes from the trailing dimensions. Dimensions are compatible when they are equal or one of them is 1; missing leading dimensions are treated as 1.

```python
matrix = np.array([[1, 2, 3], [4, 5, 6]])
offset = np.array([10, 20, 30])
print(matrix + offset)
```

Output:

```text
[[11 22 33]
 [14 25 36]]
```

The vector is applied to each row. No explicit copying of the vector is required.

A column vector can be created with `[:, None]`:

```python
row_values = np.array([1, 2, 3])
column_values = np.array([10, 20])[:, None]
print(column_values + row_values)
```

Output:

```text
[[11 12 13]
 [21 22 23]]
```

When broadcasting fails, inspect `.shape` on every operand. Reshape explicitly rather than guessing.

## 3.2 Vectorization and universal functions

A ufunc performs element-wise operations efficiently and supports broadcasting.

```python
x = np.array([0, np.pi / 2, np.pi])
print(np.sin(x))
print(np.sqrt(np.array([1, 4, 9])))
```

Output approximately:

```text
[0.000000e+00 1.000000e+00 1.224647e-16]
[1. 2. 3.]
```

The tiny nonzero result for `sin(pi)` is floating-point rounding, not a mathematical error.

Common ufuncs include `np.add`, `np.subtract`, `np.multiply`, `np.divide`, `np.sqrt`, `np.exp`, `np.log`, `np.sin`, and `np.maximum`.

## 3.3 Conditional selection

```python
scores = np.array([45, 72, 88, 33])
labels = np.where(scores >= 50, "pass", "fail")
print(labels)
```

Output:

```text
['fail' 'pass' 'pass' 'fail']
```

For multiple conditions, `np.select()` can be clearer:

```python
conditions = [scores >= 80, scores >= 50]
choices = ["excellent", "pass"]
print(np.select(conditions, choices, default="fail"))
```

Output:

```text
['fail' 'pass' 'excellent' 'fail']
```

## 3.4 Aggregations and reductions

```python
a = np.array([[1, 2, 3], [4, 5, 6]])
print(np.mean(a, axis=0))
print(np.std(a, axis=1))
print(np.argmax(a))
print(np.argmin(a, axis=0))
```

`argmax` returns the index of the maximum in the flattened array unless an axis is specified. For a sample standard deviation, use `ddof=1`; the default `ddof=0` is population standard deviation.

## 3.5 Sorting and searching

```python
a = np.array([7, 2, 9, 1])
print(np.sort(a))
print(np.argsort(a))
```

Output:

```text
[1 2 7 9]
[3 1 0 2]
```

`argsort()` returns the positions that would sort the array. Use `searchsorted()` on sorted data to find insertion positions.

## 3.6 Set-like operations

```python
a = np.array([1, 2, 2, 3])
b = np.array([2, 3, 4])
print(np.unique(a))
print(np.intersect1d(a, b))
print(np.union1d(a, b))
```

Output:

```text
[1 2 3]
[2 3]
[1 2 3 4]
```

These functions are useful for unique values and membership-like tasks. For large repeated membership tests, inspect `np.isin()` and the shape of the arrays.

## 3.7 Combining and splitting arrays

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print(np.concatenate([a, b], axis=0))
print(np.concatenate([a, b], axis=1))
```

Output:

```text
[[1 2]
 [3 4]
 [5 6]
 [7 8]]
[[1 2 5 6]
 [3 4 7 8]]
```

`vstack`, `hstack`, and `stack` have related but distinct semantics. `stack` adds a new axis; `concatenate` joins along an existing axis.

## 3.8 Matrix multiplication and linear algebra

Element-wise multiplication (`*`) differs from matrix multiplication (`@`).

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A * B)
print(A @ B)
```

Output:

```text
[[ 5 12]
 [21 32]]
[[19 22]
 [43 50]]
```

Useful linear algebra functions:

```python
A = np.array([[3.0, 1.0], [1.0, 2.0]])
b = np.array([9.0, 8.0])

solution = np.linalg.solve(A, b)
print(solution)
print(A @ solution)
```

Output:

```text
[2. 3.]
[9. 8.]
```

Prefer `solve(A, b)` to computing `inv(A) @ b`. A direct solve is typically more efficient and numerically preferable. Use `lstsq()` for overdetermined or underdetermined least-squares problems.

## 3.9 Basic statistics

```python
measurements = np.array([10.2, 10.4, 9.9, 10.1, 10.3])
print(np.mean(measurements))
print(np.median(measurements))
print(np.percentile(measurements, [25, 50, 75]))
print(np.var(measurements))
```

Choose statistics based on the data distribution. Mean and standard deviation are sensitive to outliers; median and quantiles are more robust.

### Level 3 – Try it yourself

1. Add a three-element calibration offset to every row of a 4×3 matrix.
2. Convert temperatures in Celsius to Fahrenheit using `F = C * 9/5 + 32`.
3. Use `np.where` to flag values below a threshold.
4. Sort an array and retrieve the original indices in sorted order.
5. Solve a 2×2 linear system.

<details>
<summary>Solutions</summary>

```python
m = np.arange(12).reshape(4, 3)
offset = np.array([0.1, 0.2, 0.3])
calibrated = m + offset

celsius = np.array([0, 20, 100])
fahrenheit = celsius * 9 / 5 + 32

values = np.array([4, 12, 7, 2])
flags = np.where(values < 5, "low", "ok")

order = np.argsort(values)
sorted_values = values[order]

A = np.array([[2.0, 1.0], [1.0, 3.0]])
b = np.array([5.0, 6.0])
x = np.linalg.solve(A, b)
```

For the system, the solution is approximately `[1.8, 1.4]`.
</details>

### Level 3 – Common mistakes and gotchas

- Broadcasting is shape-based, not intent-based. Two arrays can be compatible but aligned in an unintended direction.
- `*` does not mean matrix multiplication; use `@` or `np.matmul`.
- Floating-point calculations are approximate. Use `np.isclose()` or `np.allclose()` for comparisons.
- `np.argmax()` returns a position, not the maximum value.
- A matrix inverse is usually not the best way to solve a linear system.
- Standard deviation defaults to population form (`ddof=0`).

---

# Level 4 – Advanced techniques

## 4.1 Memory layout: C order and Fortran order

A multidimensional array is stored in a one-dimensional memory buffer. C order (row-major) stores rows contiguously; Fortran order (column-major) stores columns contiguously.

```python
a = np.arange(12).reshape(3, 4)
print(a.flags["C_CONTIGUOUS"])
print(a.flags["F_CONTIGUOUS"])
print(a.strides)
```

`strides` describes the number of bytes to move along each axis. Layout matters when passing arrays to compiled libraries or processing them repeatedly along a particular axis. Do not change layout without measuring the actual workload.

## 4.2 Strides, views, and memory sharing

Transposes and slices often create views with different strides.

```python
a = np.arange(12).reshape(3, 4)
t = a.T

print(t.shape)
print(t.strides)
print(np.shares_memory(a, t))
```

The transpose usually shares memory with the original. Some downstream operations may copy a non-contiguous array automatically. Use `np.ascontiguousarray()` when an API specifically requires C-contiguous memory.

## 4.3 Advanced indexing and `np.ix_`

Integer-array indexing can select arbitrary positions and usually returns a copy.

```python
a = np.arange(20).reshape(4, 5)
rows = np.array([0, 2])
cols = np.array([1, 3])

print(a[np.ix_(rows, cols)])
```

Output:

```text
[[ 1  3]
 [11 13]]
```

`np.ix_()` constructs an open mesh of index arrays. It is a clear way to select the Cartesian product of chosen rows and columns.

## 4.4 `where`, `clip`, and masked calculations

```python
readings = np.array([2.0, -1.0, 5.0, 12.0])
bounded = np.clip(readings, 0, 10)
print(bounded)
```

Output:

```text
[ 2.  0.  5. 10.]
```

For divisions where zero denominators are possible, define the intended behavior explicitly:

```python
numerator = np.array([10.0, 20.0, 30.0])
denominator = np.array([2.0, 0.0, 5.0])

ratio = np.divide(
    numerator,
    denominator,
    out=np.full_like(numerator, np.nan),
    where=denominator != 0
)
print(ratio)
```

Output:

```text
[ 5. nan  6.]
```

This avoids relying on warnings or accidental infinities.

## 4.5 `einsum` for generalized sums

`np.einsum()` expresses sums over repeated indices. It can be concise for dot products, traces, and tensor contractions.

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.einsum("i,i->", a, b))
```

Output:

```text
32
```

This is the dot product. For ordinary matrix multiplication, `@` is usually clearer. Use `einsum` when the index notation makes a multi-axis operation easier to understand, and benchmark if performance is important.

## 4.6 Random simulation and reproducibility

```python
rng = np.random.default_rng(123)
samples = rng.normal(loc=10, scale=2, size=100_000)

print(round(float(samples.mean()), 2))
print(round(float(samples.std()), 2))
```

The values should be near 10 and 2, but exact rounded values depend on the generated sample. Fixing a seed makes the experiment repeatable within a compatible environment.

Use independent generators for separate components of a simulation rather than resetting global random state.

## 4.7 Structured arrays and record-like data

Structured arrays store named fields with potentially different dtypes.

```python
records = np.array(
    [(1, 25.5), (2, 31.0)],
    dtype=[("sensor_id", "i4"), ("temperature", "f8")]
)
print(records["temperature"])
```

Output:

```text
[25.5 31. ]
```

They can be useful for low-level interoperability or compact records, but Pandas or ordinary Python objects are often easier for heterogeneous business data.

## 4.8 Save and load arrays

```python
a = np.arange(6).reshape(2, 3)
np.save("measurements.npy", a)
loaded = np.load("measurements.npy")
print(loaded)
```

Output:

```text
[[0 1 2]
 [3 4 5]]
```

For multiple arrays, use `.npz`:

```python
np.savez_compressed("dataset.npz", readings=a, ids=np.array([101, 102]))
archive = np.load("dataset.npz")
print(archive["ids"])
```

Use `allow_pickle=False` when loading untrusted `.npy`/`.npz` files. Object arrays can involve pickle deserialization and should not be loaded from untrusted sources.

## 4.9 Performance: vectorize, preallocate, benchmark

Preallocate output when the final size is known:

```python
x = np.arange(1_000_000, dtype=np.float64)
out = np.empty_like(x)
np.multiply(x, 2.0, out=out)
```

This avoids creating an additional result array in some workflows. The `out=` parameter is supported by many ufuncs.

Benchmark with repeated runs:

```python
from timeit import timeit

x = np.arange(1_000_000)

vectorized_time = timeit(lambda: x * 2, number=100)
loop_time = timeit(lambda: [int(v) * 2 for v in x], number=10)

print(vectorized_time, loop_time)
```

The loop and vectorized versions use different repetition counts, so divide by the number of runs before comparing per-run time. Benchmark on representative data and include allocation costs if they matter to your application.

## 4.10 When NumPy is not the right tool

| Situation | Consider |
|---|---|
| Labelled tabular data, joins, missing values | Pandas |
| SQL-style analytics on large local files | DuckDB |
| Larger-than-memory parallel arrays | Dask |
| High-performance DataFrame workloads | Polars |
| GPU tensor computation | PyTorch, JAX, CuPy |
| Distributed cluster computation | Spark |
| Symbolic algebra | SymPy |

NumPy is excellent for dense numerical arrays that fit in memory. It is not a database, distributed execution engine, or automatic GPU framework.

### Level 4 – Try it yourself

1. Inspect whether a transposed array is C-contiguous.
2. Use `np.ix_()` to select rows 1 and 3 and columns 0 and 2.
3. Divide two arrays safely, returning NaN for zero denominators.
4. Generate 50,000 normal random values with a fixed seed and calculate their mean.
5. Save two arrays in one compressed `.npz` file and reload them.

<details>
<summary>Solutions</summary>

```python
a = np.arange(12).reshape(3, 4)
print(a.T.flags["C_CONTIGUOUS"])

m = np.arange(20).reshape(4, 5)
selected = m[np.ix_([1, 3], [0, 2])]

num = np.array([4.0, 8.0, 10.0])
den = np.array([2.0, 0.0, 5.0])
safe = np.divide(num, den, out=np.full_like(num, np.nan), where=den != 0)

rng = np.random.default_rng(42)
sample = rng.normal(size=50_000)
print(sample.mean())

np.savez_compressed("two_arrays.npz", first=a, second=m)
loaded = np.load("two_arrays.npz", allow_pickle=False)
print(loaded["first"].shape, loaded["second"].shape)
```
</details>

### Level 4 – Common mistakes and gotchas

- A view can share memory even when its shape differs from the original.
- Non-contiguous arrays may cause hidden copies in downstream operations.
- `out=` can reduce allocations but can also overwrite data if you pass an input as output carelessly.
- `einsum` can be hard to read; use simpler operators when possible.
- Random reproducibility requires controlling generators and recording the environment.
- Never load untrusted object arrays with pickle enabled.

---

# Level 5 – Professional and production practices

## 5.1 Define numerical contracts

Numerical code should make assumptions explicit:

- input shape and axis meaning;
- dtype and acceptable precision;
- units (seconds, metres, Celsius, volts, currency);
- treatment of NaN and infinity;
- valid ranges;
- overflow and underflow behavior;
- whether inputs may be modified;
- expected output shape and dtype.

For example, a function receiving temperature readings should state whether it expects Celsius or Fahrenheit. A shape of `(n, 3)` should state whether columns represent x/y/z or something else.

## 5.2 Write pure, validated numerical functions

```python
import numpy as np

def normalize_rows(values: np.ndarray) -> np.ndarray:
    """Normalize each row to unit Euclidean length.

    Input must be a 2D numeric array. Zero-length rows are rejected.
    The input is not modified.
    """
    array = np.asarray(values, dtype=np.float64)

    if array.ndim != 2:
        raise ValueError("values must be a 2D array")

    norms = np.linalg.norm(array, axis=1, keepdims=True)
    if np.any(norms == 0):
        raise ValueError("cannot normalize a zero-length row")

    return array / norms
```

Example:

```python
vectors = np.array([[3.0, 4.0], [5.0, 12.0]])
print(normalize_rows(vectors))
```

Output:

```text
[[0.6 0.8]
 [0.38461538 0.92307692]]
```

Use `np.asarray()` to accept array-like inputs without copying when possible. Use `np.array(..., copy=True)` when independent storage is required.

## 5.3 Numerical stability

Mathematically equivalent formulas may behave differently in floating-point arithmetic. Prefer stable algorithms and library routines.

Examples:

- Use `np.linalg.solve(A, b)` rather than `np.linalg.inv(A) @ b`.
- Use `np.log1p(x)` instead of `np.log(1 + x)` when `x` is very small.
- Use `np.expm1(x)` instead of `np.exp(x) - 1` when `x` is very small.
- Use `np.hypot(x, y)` for stable Euclidean combinations of two values.
- Use tolerances with `np.isclose()` / `np.allclose()` rather than exact equality for computed floats.

```python
x = np.array([1e-12, 1e-8])
print(np.log1p(x))
print(np.allclose(np.array([0.1 + 0.2]), np.array([0.3])))
```

## 5.4 Control floating-point warnings and invalid operations

```python
with np.errstate(divide="raise", invalid="raise", over="raise"):
    result = np.array([1.0, 2.0]) / np.array([1.0, 0.0])
```

This raises a `FloatingPointError` for division by zero. Use `np.errstate` around a specific operation and choose a policy that fits the application. Do not suppress warnings globally just to make logs quiet.

## 5.5 Test numerical code

Test:
- normal values;
- boundary values;
- empty arrays;
- wrong dimensions;
- NaN and infinity;
- zero denominators or zero norms;
- dtype and shape guarantees;
- numerical tolerance.

Example with `pytest`:

```python
# test_math_utils.py
import numpy as np
import pytest
from math_utils import normalize_rows

def test_normalize_rows():
    actual = normalize_rows(np.array([[3.0, 4.0]]))
    expected = np.array([[0.6, 0.8]])
    np.testing.assert_allclose(actual, expected)

def test_zero_row_rejected():
    with pytest.raises(ValueError, match="zero-length"):
        normalize_rows(np.array([[0.0, 0.0]]))

def test_requires_2d():
    with pytest.raises(ValueError, match="2D"):
        normalize_rows(np.array([1.0, 2.0]))
```

Run:

```bash
python -m pip install pytest
pytest -q
```

Use `np.testing.assert_allclose()` for approximate numerical comparisons and `np.testing.assert_array_equal()` for exact comparisons.

## 5.6 Performance engineering checklist

1. Profile before optimizing.
2. Choose an appropriate dtype; `float32` halves storage versus `float64`, but has less precision.
3. Avoid unnecessary temporary arrays; consider `out=` and in-place operations when safe.
4. Preallocate arrays when output shape is known.
5. Keep operations vectorized.
6. Understand memory layout and strides when integrating with compiled code.
7. Avoid repeated conversions between Python lists and arrays.
8. Benchmark on realistic array sizes and memory conditions.
9. Consider Numba, Cython, C/C++, JAX, or GPU tools only when profiling shows a real bottleneck and the extra complexity is justified.

Do not use `float32` solely to save memory if the problem requires `float64` precision or has numerical conditioning issues. Validate accuracy against a trusted baseline.

## 5.7 Reproducible numerical experiments

Record:
- NumPy and Python versions;
- random seed and generator method;
- input data version;
- units and preprocessing;
- algorithm parameters;
- platform / hardware when performance or low-level numerical behavior matters.

```python
import sys
import numpy as np

print("Python:", sys.version)
print("NumPy:", np.__version__)

rng = np.random.default_rng(2026)
simulation = rng.normal(size=1000)
```

A seed alone is not a complete scientific record if the algorithm, package version, or input data can change.

## 5.8 Safe file handling and deployment

- Prefer `.npy` for a single array and `.npz` for several arrays.
- Use `allow_pickle=False` when loading files from untrusted sources.
- Validate shapes and dtypes immediately after loading.
- Store metadata such as units and axis meanings alongside the array; `.npy` does not provide a rich business schema.
- Avoid writing huge arrays to text formats when binary formats are appropriate.
- Make file writes atomic where partial outputs would be harmful.

## 5.9 A realistic end-to-end sensor workflow

Suppose each row contains three sensor-axis readings. The workflow validates shape and finite values, removes an offset, computes vector magnitude, and reports summary statistics.

```python
import numpy as np

def analyze_sensor_batch(
    readings: np.ndarray,
    offset: np.ndarray
) -> dict[str, np.ndarray | float]:
    """Analyze an (n, 3) sensor batch and a 3-element calibration offset."""
    data = np.asarray(readings, dtype=np.float64)
    bias = np.asarray(offset, dtype=np.float64)

    if data.ndim != 2 or data.shape[1] != 3:
        raise ValueError("readings must have shape (n, 3)")
    if bias.shape != (3,):
        raise ValueError("offset must have shape (3,)")
    if not np.isfinite(data).all() or not np.isfinite(bias).all():
        raise ValueError("inputs must contain only finite values")

    corrected = data - bias
    magnitude = np.linalg.norm(corrected, axis=1)

    return {
        "corrected": corrected,
        "magnitude": magnitude,
        "mean_magnitude": float(magnitude.mean())
    }

batch = np.array([
    [1.1, 2.0, 3.0],
    [1.0, 2.2, 2.9],
    [0.9, 1.8, 3.1]
])
result = analyze_sensor_batch(batch, np.array([1.0, 2.0, 3.0]))

print(result["corrected"])
print(np.round(result["magnitude"], 3))
print(round(result["mean_magnitude"], 3))
```

Expected output:

```text
[[ 0.1  0.   0. ]
 [ 0.   0.2 -0.1]
 [-0.1 -0.2  0.1]]
[0.1   0.224 0.245]
0.19
```

For a production sensor pipeline, add timestamp validation, device identifiers, calibration versioning, missing-sample handling, outlier policy, logging, and tests against known calibration fixtures.

## 5.10 Style conventions

- Use `import numpy as np`.
- Prefer descriptive names such as `temperature_c` and `voltage_v` over `x` and `y` in application code.
- Document shape conventions in function docstrings.
- Make dtype choices explicit at system boundaries.
- Avoid mutating caller-owned arrays unless the API clearly promises in-place behavior.
- Use `np.testing` in tests.
- Keep numerical tolerances tied to measurement precision and domain requirements.
- Pin dependency versions for deployed systems and test upgrades before rollout.

### Level 5 – Try it yourself

1. Write a function that accepts only a finite 2D float array and returns column means.
2. Write a safe ratio function that returns NaN where the denominator is zero.
3. Add tests for correct output, invalid shape, and non-finite values.
4. Compare float32 and float64 memory use and numerical error for a calculation of your choice.
5. Design a data contract for a three-axis accelerometer stream.

<details>
<summary>Solutions and discussion</summary>

```python
def column_means(values):
    data = np.asarray(values, dtype=np.float64)
    if data.ndim != 2:
        raise ValueError("expected a 2D array")
    if not np.isfinite(data).all():
        raise ValueError("values must be finite")
    return data.mean(axis=0)

def safe_ratio(numerator, denominator):
    num, den = np.broadcast_arrays(
        np.asarray(numerator, dtype=float),
        np.asarray(denominator, dtype=float)
    )
    out = np.full(num.shape, np.nan, dtype=float)
    np.divide(num, den, out=out, where=den != 0)
    return out
```

A contract for a three-axis stream should state: shape `(n, 3)`; column order `[x, y, z]`; units (for example, `m/s^2`); timestamp timezone; sampling frequency; device and calibration identifiers; allowed missing values; finite-value policy; dtype; and whether readings are raw or calibrated.
</details>

### Level 5 – Common mistakes and gotchas

- Floating-point equality is not a reliable test for most computed values.
- Overflow can occur even when inputs are valid; choose dtypes and algorithms carefully.
- In-place operations can mutate data shared with other parts of a program.
- A benchmark on tiny arrays may measure Python overhead rather than numerical throughput.
- Faster code is not better if it changes accuracy beyond acceptable tolerances.
- Reproducibility requires more than a random seed.

---

# NumPy quick reference

## Creation

| Goal | Pattern |
|---|---|
| From list | `np.array([1, 2, 3])` |
| Zeros | `np.zeros((r, c))` |
| Ones | `np.ones((r, c))` |
| Filled | `np.full((r, c), value)` |
| Identity | `np.eye(n)` |
| Integer range | `np.arange(start, stop, step)` |
| Fixed number of points | `np.linspace(start, stop, num)` |
| Random generator | `rng = np.random.default_rng(seed)` |

## Shape and selection

| Goal | Pattern |
|---|---|
| Dimensions | `a.ndim` |
| Shape | `a.shape` |
| Element count | `a.size` |
| Reshape | `a.reshape(r, c)` |
| Transpose | `a.T` |
| Row / column | `a[0, :]`, `a[:, 0]` |
| Boolean selection | `a[a > threshold]` |
| Independent copy | `a.copy()` |
| Memory sharing | `np.shares_memory(a, b)` |

## Computation

| Goal | Pattern |
|---|---|
| Element-wise multiply | `a * b` |
| Matrix multiply | `a @ b` |
| Sum | `a.sum(axis=...)` |
| Mean | `a.mean(axis=...)` |
| Standard deviation | `a.std(ddof=1)` |
| Conditional values | `np.where(condition, x, y)` |
| Clip | `np.clip(a, low, high)` |
| Sort | `np.sort(a)` |
| Sort indices | `np.argsort(a)` |
| Approximate equality | `np.allclose(a, b)` |
| Linear solve | `np.linalg.solve(A, b)` |

## I/O

| Goal | Pattern |
|---|---|
| Save one array | `np.save("x.npy", a)` |
| Load one array | `np.load("x.npy", allow_pickle=False)` |
| Save several | `np.savez_compressed("x.npz", a=a, b=b)` |
| Load archive | `np.load("x.npz", allow_pickle=False)` |

---

# Glossary

- **Array (`ndarray`):** NumPy's core multidimensional container.
- **Axis:** A dimension along which an operation can run.
- **Broadcasting:** Shape rules that allow element-wise operations on compatible arrays.
- **Dtype:** The data type used to store each array element.
- **Stride:** Number of bytes moved in memory when advancing one position along an axis.
- **Ufunc:** A vectorized element-wise function such as `np.sqrt`.
- **Vectorization:** Applying operations to whole arrays rather than looping in Python.
- **View:** An array object that shares underlying memory with another array.
- **Copy:** An array with independent data storage.
- **Reduction:** An operation that combines values along an axis, such as sum or mean.

**You have completed the NumPy guide.** To consolidate the material, build a small numerical project—such as a sensor calibration and reporting script—and write tests for its shape, dtype, units, edge cases, and numerical tolerance.
