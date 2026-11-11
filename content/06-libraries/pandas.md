# The Complete Pandas Guide: From Absolute Beginner to Production

> A progressive, hands-on tutorial for learning Pandas in Python. Examples are self-contained and use small datasets so you can run them locally and compare your output.

**Suggested filename:** `pandas-complete-guide.md`  
**Audience:** Complete beginners through working data professionals  
**Tested style:** Modern Pandas 2.x conventions; most examples also work on recent Pandas 1.x releases.

---

## Table of contents

- [How to use this guide](#how-to-use-this-guide)
- [Level 0 – Prerequisites and setup](#level-0--prerequisites-and-setup)
- [Level 1 – Absolute basics](#level-1--absolute-basics)
- [Level 2 – Core concepts](#level-2--core-concepts)
- [Level 3 – Intermediate data analysis](#level-3--intermediate-data-analysis)
- [Level 4 – Advanced techniques](#level-4--advanced-techniques)
- [Level 5 – Professional and production practices](#level-5--professional-and-production-practices)
- [Pandas quick reference](#pandas-quick-reference)
- [Glossary](#glossary)

---

## How to use this guide

Work through the levels in order. Type the examples rather than only reading them. Each code block is intended to be runnable; outputs are shown beneath representative examples. Minor formatting differences may occur between Pandas versions.

Pandas is a library for working with labelled, tabular data. It is especially useful when rows represent observations and columns represent variables: sales records, customer lists, sensor readings, inventory, test results, and similar datasets.

A useful mental model:

- **Python list:** a sequence of values.
- **NumPy array:** a fast, usually homogeneous block of values.
- **Pandas Series:** a one-dimensional labelled array.
- **Pandas DataFrame:** a two-dimensional table with labelled rows and columns.

Pandas is built on NumPy, but adds labels, missing-value tools, data alignment, file readers, grouping, joins, and time-series functionality.

---

# Level 0 – Prerequisites and setup

## 0.1 What you need to know first

You do not need to be an expert in Python. You should become comfortable with:

- variables and assignment;
- strings, integers, floats, and booleans;
- lists and dictionaries;
- `if` statements and `for` loops;
- functions and imports.

Example:

```python
price = 125.0
quantities = [2, 3, 1]
total = sum(quantities) * price
print(total)
```

Output:

```text
750.0
```

Pandas often lets you replace manual loops with expressive table operations. Learn enough Python to understand the examples, then let Pandas do the repetitive data work.

## 0.2 Install Python and Pandas

Use a supported Python 3 release. Create a project folder, then create a virtual environment so this project's packages do not interfere with other projects.

**Windows (PowerShell):**

```powershell
mkdir pandas-learning
cd pandas-learning
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install pandas numpy matplotlib openpyxl pyarrow
```

**macOS / Linux:**

```bash
mkdir pandas-learning
cd pandas-learning
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install pandas numpy matplotlib openpyxl pyarrow
```

The extra packages are useful for Excel (`openpyxl`), Parquet (`pyarrow`), charts (`matplotlib`), and numerical operations (`numpy`).

Verify the installation:

```bash
python -c "import pandas as pd; print(pd.__version__)"
```

Example output (your version may differ):

```text
2.2.3
```

## 0.3 Choose an editor or notebook

Common options:

| Environment | Best for |
|---|---|
| JupyterLab / Notebook | Exploration, lessons, visual analysis |
| VS Code | Notebooks, scripts, debugging, projects |
| PyCharm | Larger Python applications |
| Terminal + `.py` files | Repeatable jobs and production scripts |

Install JupyterLab if desired:

```bash
python -m pip install jupyterlab
jupyter lab
```

A notebook is convenient for exploration. For repeatable work, move stable logic into `.py` modules and tests.

## 0.4 Import conventions

The conventional alias is `pd`. This is widely recognized by Python data practitioners.

```python
import pandas as pd
import numpy as np

print(pd.Series([10, 20, 30]).sum())
print(np.__version__)
```

Output:

```text
60
<your NumPy version>
```

## 0.5 Create a reusable sample dataset

We will reuse this small sales dataset in later levels.

```python
import pandas as pd

sales = pd.DataFrame({
    "order_id": [101, 102, 103, 104, 105, 106],
    "city": ["Delhi", "Mumbai", "Delhi", "Pune", "Mumbai", "Pune"],
    "product": ["Filter", "Fan", "Fan", "Filter", "Filter", "Fan"],
    "quantity": [2, 1, 3, 2, 1, 4],
    "unit_price": [1500, 8000, 8000, 1500, 1500, 8000],
    "order_date": [
        "2025-01-02", "2025-01-03", "2025-01-03",
        "2025-01-05", "2025-01-06", "2025-01-07"
    ],
})

sales["order_date"] = pd.to_datetime(sales["order_date"])
sales["revenue"] = sales["quantity"] * sales["unit_price"]
print(sales.head(3))
```

Output:

```text
   order_id    city product  quantity  unit_price order_date  revenue
0       101   Delhi  Filter         2        1500 2025-01-02     3000
1       102  Mumbai     Fan         1        8000 2025-01-03     8000
2       103   Delhi     Fan         3        8000 2025-01-03    24000
```

### Level 0 – Try it yourself

1. Print the Pandas version.
2. Create a list of three product names and turn it into a DataFrame with one column named `product`.
3. Add a column named `amount` containing `[100, 200, 300]`.

<details>
<summary>Solutions</summary>

```python
import pandas as pd

print(pd.__version__)

products = pd.DataFrame({"product": ["Filter", "Fan", "Motor"]})
products["amount"] = [100, 200, 300]
print(products)
```

Output:

```text
  product  amount
0  Filter     100
1     Fan     200
2   Motor     300
```
</details>

### Level 0 – Common mistakes and gotchas

- Installing a package into a different Python environment from the one running your code. Check `python -m pip --version`.
- Naming your script `pandas.py`; Python may import your file instead of the real package.
- Forgetting to activate the virtual environment.
- Assuming a notebook's current working directory is the same as your project folder.

---

# Level 1 – Absolute basics

## 1.1 Series: one labelled column

A Series is a one-dimensional collection of values with an index. The index gives each value a label.

```python
import pandas as pd

quantities = pd.Series([4, 7, 2], name="quantity")
print(quantities)
```

Output:

```text
0    4
1    7
2    2
Name: quantity, dtype: int64
```

The labels are `0`, `1`, and `2` by default. You can supply your own:

```python
stock = pd.Series(
    [12, 5, 0],
    index=["Filter", "Fan", "Motor"],
    name="stock"
)
print(stock)
print(stock["Fan"])
```

Output:

```text
Filter    12
Fan        5
Motor      0
Name: stock, dtype: int64
5
```

**Why labels matter:** labels make it possible to select meaningful records and align values by identity rather than relying only on position.

## 1.2 DataFrame: a labelled table

A DataFrame contains rows and columns. Each column is a Series, and different columns can have different data types.

```python
products = pd.DataFrame({
    "product": ["Filter", "Fan", "Motor"],
    "price": [1500, 8000, 4200],
    "available": [True, True, False],
})
print(products)
```

Output:

```text
  product  price  available
0  Filter   1500       True
1     Fan   8000       True
2   Motor   4200      False
```

Construct from records:

```python
records = [
    {"name": "Asha", "city": "Delhi"},
    {"name": "Ravi", "city": "Pune"},
]
people = pd.DataFrame(records)
print(people)
```

Output:

```text
   name   city
0  Asha  Delhi
1  Ravi   Pune
```

## 1.3 Inspect a DataFrame before analysing it

Inspection prevents assumptions about row counts, columns, types, and missing values.

```python
print(sales.shape)
print(sales.columns.tolist())
print(sales.dtypes)
print(sales.head(2))
print(sales.tail(2))
print(sales.info())
```

Key methods:

| Method / attribute | What it tells you |
|---|---|
| `df.head(n)` | First `n` rows |
| `df.tail(n)` | Last `n` rows |
| `df.shape` | `(row_count, column_count)` |
| `df.columns` | Column labels |
| `df.index` | Row labels |
| `df.dtypes` | Data type per column |
| `df.info()` | Compact structural summary |
| `df.describe()` | Numeric descriptive statistics |
| `df.sample(n)` | Random sample of rows |

For the sample table, `sales.shape` returns `(6, 7)`.

## 1.4 Select columns

A single column returns a Series; a list of columns returns a DataFrame.

```python
print(sales["city"])
print(sales[["city", "revenue"]])
```

The first selection is one-dimensional. The second remains a table.

## 1.5 Create and modify columns

A column can be calculated from existing columns.

```python
sales["revenue"] = sales["quantity"] * sales["unit_price"]
sales["high_value"] = sales["revenue"] >= 10000
print(sales[["order_id", "revenue", "high_value"]].head(4))
```

Output:

```text
   order_id  revenue  high_value
0       101     3000       False
1       102     8000       False
2       103    24000        True
3       104     3000       False
```

Use `.assign()` when you want a new DataFrame in a chain:

```python
result = sales.assign(
    discount=lambda d: d["revenue"] * 0.05,
    net_revenue=lambda d: d["revenue"] * 0.95
)
print(result[["order_id", "net_revenue"]].head(2))
```

Output:

```text
   order_id  net_revenue
0       101       2850.0
1       102       7600.0
```

## 1.6 Sort rows

```python
print(sales.sort_values("revenue", ascending=False)[
    ["order_id", "revenue"]
].head(3))
```

Output:

```text
   order_id  revenue
2       103    24000
5       106    32000
1       102     8000
```

The exact top rows follow the data: order 106 has the highest revenue, then 103.

Sort by multiple keys:

```python
print(sales.sort_values(
    ["city", "revenue"],
    ascending=[True, False]
)[["city", "order_id", "revenue"]])
```

## 1.7 Basic descriptive statistics

```python
print(sales["revenue"].sum())
print(sales["revenue"].mean())
print(sales["revenue"].min())
print(sales["revenue"].max())
print(sales["city"].value_counts())
```

For the six sample orders:

- total revenue = `71500`;
- average revenue = `13000`;
- minimum revenue = `1500`;
- maximum revenue = `32000`.

`value_counts()` counts the frequency of each category.

### Level 1 – Try it yourself

Use `sales`:

1. Display only `order_id` and `product`.
2. Find the total quantity sold.
3. Sort orders by `quantity` from largest to smallest.
4. Add a `tax` column equal to 18% of revenue.

<details>
<summary>Solutions</summary>

```python
print(sales[["order_id", "product"]])
print(sales["quantity"].sum())
print(sales.sort_values("quantity", ascending=False)[["order_id", "quantity"]])

sales["tax"] = sales["revenue"] * 0.18
print(sales[["order_id", "tax"]].head())
```

Expected total quantity: `13`.
</details>

### Level 1 – Common mistakes and gotchas

- `df["column"]` returns a Series; `df[["column"]]` returns a DataFrame.
- `sort_values()` returns a sorted object; it does not change the original unless you assign the result.
- A calculated column may have a different dtype than expected, especially when missing values are present.
- `print(df.info())` prints the report and then `None`; call `df.info()` by itself.

---

# Level 2 – Core concepts

## 2.1 Indexes and labels

The index is not necessarily a row number. It is a label system.

```python
stock = pd.DataFrame(
    {"quantity": [12, 5, 8]},
    index=["Filter", "Fan", "Motor"]
)
print(stock.loc["Fan", "quantity"])
```

Output:

```text
5
```

Use `reset_index()` to turn the index into a regular column. Use `set_index()` to make a column the index.

```python
indexed = sales.set_index("order_id")
print(indexed.loc[103, "city"])

restored = indexed.reset_index()
print(restored.columns.tolist())
```

## 2.2 `.loc` versus `.iloc`

This distinction is essential.

| Accessor | Selects by | Example |
|---|---|---|
| `.loc` | Label | `df.loc[103, "city"]` |
| `.iloc` | Integer position | `df.iloc[2, 1]` |

```python
print(sales.loc[2, "city"])   # label 2
print(sales.iloc[2, 1])       # third row, second column
```

With a custom index, labels and positions can differ. `.loc` label slices include the ending label; `.iloc` slices exclude the ending position, like normal Python slicing.

```python
small = pd.DataFrame({"value": [10, 20, 30]}, index=["a", "b", "c"])
print(small.loc["a":"b"])
print(small.iloc[0:2])
```

Both show the first two rows, but for different reasons.

## 2.3 Boolean filtering

Filtering creates a subset based on a condition.

```python
large_orders = sales[sales["revenue"] >= 10000]
print(large_orders[["order_id", "revenue"]])
```

Output:

```text
   order_id  revenue
2       103    24000
5       106    32000
```

Combine conditions with `&` (and), `|` (or), and `~` (not). Put each comparison in parentheses.

```python
filtered = sales[
    (sales["city"] == "Delhi") &
    (sales["revenue"] > 5000)
]
print(filtered[["order_id", "city", "revenue"]])
```

Use `.isin()` for membership:

```python
sales[sales["city"].isin(["Delhi", "Pune"])]
```

Use `.between()` for inclusive numeric ranges:

```python
sales[sales["revenue"].between(3000, 10000)]
```

## 2.4 Missing data

Real datasets often contain missing values. Pandas commonly represents them as `NaN`, `None`, or `pd.NA`, depending on dtype.

```python
data = pd.DataFrame({
    "name": ["Asha", "Ravi", "Meera", "Kabir"],
    "score": [88, None, 92, None],
})
print(data.isna())
print(data.isna().sum())
```

Output of the count:

```text
name     0
score    2
dtype: int64
```

Common choices:

```python
data.dropna()                         # remove rows with missing values
data["score"].fillna(0)               # replace missing score with zero
data["score"].fillna(data["score"].mean())  # mean imputation
```

**Choose based on meaning.** Missing sales quantity is not automatically zero. Missing customer age should not be filled with the average without considering the analysis and missingness mechanism.

## 2.5 Data types and conversion

Types affect memory, comparisons, arithmetic, and file output.

```python
raw = pd.DataFrame({
    "quantity": ["2", "5", "unknown"],
    "price": ["10.5", "20.0", "15.0"]
})

raw["quantity_num"] = pd.to_numeric(raw["quantity"], errors="coerce")
raw["price"] = pd.to_numeric(raw["price"], errors="raise")
print(raw)
```

Output:

```text
  quantity price  quantity_num
0         2  10.5           2.0
1         5  20.0           5.0
2   unknown  15.0           NaN
```

Useful dtype conversions:

```python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
df["category"] = df["category"].astype("category")
df["count"] = df["count"].astype("Int64")  # nullable integer dtype
```

Nullable types such as `Int64`, `boolean`, and `string` can represent missing values more consistently than some traditional NumPy dtypes.

## 2.6 String operations

Use the vectorized `.str` accessor rather than a Python loop for common string transformations.

```python
names = pd.Series(["  ALICE ", "bob", "Meera  "])
clean = names.str.strip().str.title()
print(clean.tolist())
```

Output:

```text
['Alice', 'Bob', 'Meera']
```

Other useful methods include `.str.lower()`, `.str.contains()`, `.str.replace()`, `.str.split()`, and `.str.startswith()`.

```python
cities = pd.Series(["New Delhi", "Delhi", "Mumbai"])
print(cities.str.contains("delhi", case=False).tolist())
```

Output:

```text
[True, True, False]
```

## 2.7 Dates and time

Convert text to datetime before extracting date parts or resampling.

```python
events = pd.DataFrame({
    "timestamp": ["2025-01-01 09:30", "2025-01-01 16:00", "2025-01-02 10:00"],
    "value": [10, 15, 8]
})
events["timestamp"] = pd.to_datetime(events["timestamp"])
events["day"] = events["timestamp"].dt.date
events["hour"] = events["timestamp"].dt.hour
print(events[["day", "hour"]])
```

For timezone-aware data, localize naive timestamps only when their source timezone is known, then convert to a common timezone (often UTC) for storage and comparison.

```python
utc_times = events["timestamp"].dt.tz_localize("Asia/Kolkata").dt.tz_convert("UTC")
```

Do not localize timestamps that are already timezone-aware.

## 2.8 Duplicate records

```python
dupes = pd.DataFrame({
    "serial": ["A1", "A2", "A1"],
    "reading": [10, 20, 10]
})
print(dupes.duplicated().tolist())
print(dupes.drop_duplicates())
```

`duplicated()` identifies duplicates; `drop_duplicates()` removes them. Specify `subset=` when uniqueness is defined by only certain columns, and choose `keep="first"`, `"last"`, or `False` deliberately.

### Level 2 – Try it yourself

1. Filter orders from Mumbai.
2. Filter orders with revenue above 5,000 and quantity at least 2.
3. Create a DataFrame with a missing value and count missing values per column.
4. Convert a text date column into datetime.
5. Remove duplicate rows based on a business key.

<details>
<summary>Solutions</summary>

```python
print(sales[sales["city"] == "Mumbai"])

print(sales[
    (sales["revenue"] > 5000) &
    (sales["quantity"] >= 2)
])

example = pd.DataFrame({"code": ["X", "Y", "Z"], "value": [1, None, 3]})
print(example.isna().sum())

example_dates = pd.DataFrame({"date": ["2025-02-01", "2025-02-02"]})
example_dates["date"] = pd.to_datetime(example_dates["date"])

unique = pd.DataFrame({"order": [1, 1, 2], "line": [1, 1, 1]})
unique = unique.drop_duplicates(subset=["order", "line"])
print(unique)
```
</details>

### Level 2 – Common mistakes and gotchas

- Use `&` and `|`, not Python's `and` and `or`, for element-wise Series conditions.
- Parenthesize every comparison in combined filters.
- Do not compare missing values with `== np.nan`; use `.isna()` or `.notna()`.
- `astype(int)` fails when values contain missing entries; use nullable `Int64` or clean the data first.
- Dates stored as strings sort lexicographically, not chronologically in every possible format.
- Duplicate removal is a business decision. Confirm what makes a record unique before dropping anything.

---

# Level 3 – Intermediate data analysis

## 3.1 GroupBy: split, apply, combine

GroupBy is useful when you need summaries by category: revenue by city, defect rate by product, or average sensor reading by machine.

```python
by_city = sales.groupby("city")["revenue"].sum()
print(by_city)
```

Output:

```text
city
Delhi     27000
Mumbai     9500
Pune      35000
Name: revenue, dtype: int64
```

Multiple aggregations:

```python
summary = sales.groupby("city").agg(
    orders=("order_id", "count"),
    units=("quantity", "sum"),
    revenue=("revenue", "sum"),
    average_order=("revenue", "mean"),
)
print(summary)
```

Named aggregation makes output columns clear. Use `as_index=False` when you want grouping keys to remain regular columns:

```python
summary = sales.groupby("city", as_index=False).agg(
    revenue=("revenue", "sum"),
    orders=("order_id", "count")
)
```

## 3.2 Transform versus aggregate

- `agg()` reduces each group to one or more summary rows.
- `transform()` returns a result aligned to the original rows.
- `filter()` keeps or removes whole groups based on a group-level test.

```python
sales["city_total"] = sales.groupby("city")["revenue"].transform("sum")
sales["share_of_city"] = sales["revenue"] / sales["city_total"]
print(sales[["city", "revenue", "city_total", "share_of_city"]].head(3))
```

Use `transform` when each original record needs a group statistic.

## 3.3 Pivot tables and cross-tabulation

A pivot table summarizes one variable across two categorical dimensions.

```python
pivot = pd.pivot_table(
    sales,
    index="city",
    columns="product",
    values="revenue",
    aggfunc="sum",
    fill_value=0
)
print(pivot)
```

A cross-tab counts combinations:

```python
print(pd.crosstab(sales["city"], sales["product"]))
```

Use `pivot()` when each index/column pair must be unique; use `pivot_table()` when duplicates need aggregation.

## 3.4 Concatenate tables

`pd.concat()` stacks or aligns objects along an axis.

```python
jan = pd.DataFrame({"order_id": [1], "revenue": [100]})
feb = pd.DataFrame({"order_id": [2], "revenue": [200]})

all_months = pd.concat([jan, feb], ignore_index=True)
print(all_months)
```

Output:

```text
   order_id  revenue
0         1      100
1         2      200
```

`axis=0` adds rows; `axis=1` aligns objects side-by-side by index. Prefer one concat of a list over repeatedly concatenating inside a loop.

## 3.5 Merge and join

Merging combines tables using keys, much like a database join.

```python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "customer": ["Asha", "Ravi", "Meera"]
})
orders = pd.DataFrame({
    "order_id": [101, 102, 103],
    "customer_id": [1, 2, 2],
    "amount": [500, 700, 300]
})

joined = orders.merge(customers, on="customer_id", how="left", validate="many_to_one")
print(joined)
```

Output:

```text
   order_id  customer_id  amount customer
0       101            1     500     Asha
1       102            2     700     Ravi
2       103            2     300     Ravi
```

Join types:

| `how` | Meaning |
|---|---|
| `inner` | Only keys present in both |
| `left` | All left rows; matching right values |
| `right` | All right rows |
| `outer` | All keys from either side |

Professional habit: use `validate=` where possible (`one_to_one`, `one_to_many`, `many_to_one`, `many_to_many`) to catch unexpected key duplication. Use `indicator=True` to inspect match status.

## 3.6 Reshape: wide and long data

Long format stores a variable/value pair in rows; wide format spreads categories across columns. Long data is often easier to group, chart, and model.

```python
wide = pd.DataFrame({
    "city": ["Delhi", "Pune"],
    "jan": [10, 20],
    "feb": [15, 25]
})
long = wide.melt(id_vars="city", var_name="month", value_name="units")
print(long)
```

Output:

```text
    city month  units
0  Delhi   jan     10
1   Pune   jan     20
2  Delhi   feb     15
3   Pune   feb     25
```

Reverse with `pivot()` when key combinations are unique:

```python
restored = long.pivot(index="city", columns="month", values="units")
```

## 3.7 Apply functions carefully

`apply()` is flexible, but can be slower than built-in vectorized operations or named aggregations.

```python
sales["revenue_band"] = sales["revenue"].map(
    lambda value: "high" if value >= 10000 else "standard"
)
```

For row-wise logic, consider whether it can be expressed with vectorized conditions:

```python
import numpy as np

sales["revenue_band"] = np.where(sales["revenue"] >= 10000, "high", "standard")
```

Use `apply()` when the operation is genuinely custom and cannot be expressed clearly with vectorized methods.

## 3.8 Combine conditions with `where` and `mask`

```python
sales["discounted_revenue"] = sales["revenue"].where(
    sales["quantity"] >= 2,
    sales["revenue"] * 0.98
)
```

`where(condition, other)` keeps values where the condition is true and substitutes elsewhere. `mask()` is the inverse: replace where the condition is true.

### Level 3 – Try it yourself

1. Calculate revenue by product.
2. Calculate order count and total revenue by city.
3. Merge a product master table onto order lines.
4. Convert a wide monthly table into long format.
5. Add a column containing each city's average order revenue on every row.

<details>
<summary>Solutions</summary>

```python
print(sales.groupby("product")["revenue"].sum())

print(sales.groupby("city").agg(
    orders=("order_id", "count"),
    revenue=("revenue", "sum")
))

product_master = pd.DataFrame({
    "product": ["Filter", "Fan"],
    "category": ["Air quality", "Equipment"]
})
print(sales.merge(product_master, on="product", how="left", validate="many_to_one"))

wide = pd.DataFrame({"city": ["Delhi", "Pune"], "jan": [1, 2], "feb": [3, 4]})
print(wide.melt(id_vars="city", var_name="month", value_name="units"))

sales["city_avg_order"] = sales.groupby("city")["revenue"].transform("mean")
```
</details>

### Level 3 – Common mistakes and gotchas

- A merge can multiply rows if the right-hand key is not unique. Check key uniqueness and use `validate=`.
- `pivot()` raises an error for duplicate key combinations; use `pivot_table()` with a suitable aggregation.
- `groupby()` often places group keys in the index by default; use `as_index=False` or `.reset_index()`.
- `apply(axis=1)` can be slow because it invokes Python-level work for each row.
- `concat(axis=1)` aligns by index labels, not necessarily row position.
- Avoid silently filling pivot-table gaps with zero unless zero is semantically correct.

---

# Level 4 – Advanced techniques

## 4.1 Method chaining and readable pipelines

A chain makes a transformation sequence visible from top to bottom. It reduces intermediate variables, but should remain readable.

```python
report = (
    sales
    .assign(net_revenue=lambda d: d["revenue"] * 0.95)
    .query("quantity >= 2")
    .groupby("city", as_index=False)
    .agg(net_revenue=("net_revenue", "sum"))
    .sort_values("net_revenue", ascending=False)
)
print(report)
```

Use `.pipe()` to insert a named transformation into a chain:

```python
def add_margin(frame):
    return frame.assign(margin=frame["revenue"] * 0.25)

result = sales.pipe(add_margin)
```

A chain is not automatically faster. Its main benefit is a clear, auditable transformation pipeline.

## 4.2 MultiIndex

A MultiIndex stores multiple levels of labels on an axis. It is useful for hierarchical summaries, but can make selection and reshaping more complex.

```python
multi = sales.groupby(["city", "product"])["revenue"].sum()
print(multi)
print(multi.loc["Delhi"])
```

Convert levels back to columns:

```python
flat = multi.reset_index(name="revenue")
```

Selection examples:

```python
# Select one top-level city
multi.loc["Delhi"]

# Select a particular city/product pair
multi.loc[("Delhi", "Fan")]
```

For complex slices, sort the MultiIndex first. Do not use MultiIndex merely because several columns are available; ordinary columns are often easier for teams and downstream tools.

## 4.3 Categorical data and memory

Repeated strings can consume significant memory. If a column has a small set of repeated values, `category` may reduce memory and can improve some operations.

```python
df = pd.DataFrame({"city": ["Delhi", "Pune", "Delhi", "Pune"] * 1000})
before = df.memory_usage(deep=True).sum()
df["city"] = df["city"].astype("category")
after = df.memory_usage(deep=True).sum()
print(before, after)
```

Exact byte counts depend on Pandas and platform versions. Categories are most helpful when cardinality is low relative to row count. They may be less useful for mostly unique strings.

## 4.4 Efficient vectorized operations

Prefer built-in operations that work on whole columns:

```python
sales["gross"] = sales["quantity"] * sales["unit_price"]
sales["is_large"] = sales["gross"] >= 10000
```

Avoid a Python loop for simple column arithmetic:

```python
# Less idiomatic for simple arithmetic:
# values = []
# for q, p in zip(sales["quantity"], sales["unit_price"]):
#     values.append(q * p)
```

Vectorization reduces Python overhead and often uses optimized NumPy kernels. Not every Pandas operation is fully vectorized; profile real workloads.

## 4.5 Window calculations

Rolling and expanding calculations are useful for time-series monitoring.

```python
daily = pd.DataFrame({
    "date": pd.date_range("2025-01-01", periods=5, freq="D"),
    "sales": [10, 12, 8, 15, 20]
}).set_index("date")

daily["rolling_3_day"] = daily["sales"].rolling(3, min_periods=1).mean()
daily["running_total"] = daily["sales"].expanding().sum()
print(daily)
```

Rolling windows depend on row order. Sort by timestamp first. For irregular timestamps, time-based windows such as `.rolling("7D")` may be more appropriate than a fixed number of rows.

## 4.6 Efficient file formats and chunked reading

CSV is portable but text-based. Parquet is columnar, typed, compressed, and often faster for analytical workloads.

```python
sales.to_parquet("sales.parquet", index=False)
loaded = pd.read_parquet("sales.parquet")
```

CSV:

```python
sales.to_csv("sales.csv", index=False)
loaded_csv = pd.read_csv("sales.csv", parse_dates=["order_date"])
```

For a CSV too large to fit in memory:

```python
total = 0
for chunk in pd.read_csv("large_sales.csv", chunksize=100_000):
    total += chunk["amount"].sum()
print(total)
```

Chunking works when each chunk can be processed independently or when you maintain a small accumulator. Global sorting, exact deduplication, and complex joins may need a different strategy.

## 4.7 Query planning and memory inspection

```python
print(sales.memory_usage(deep=True))
print(sales.memory_usage(deep=True).sum())
```

Reduce unnecessary columns and rows early:

```python
needed = pd.read_csv(
    "large.csv",
    usecols=["date", "city", "amount"],
    dtype={"city": "category"}
)
```

This can reduce parsing time and memory. Specify dtypes only when they correctly represent the source data.

## 4.8 Avoiding chained assignment

This pattern is ambiguous and may trigger warnings:

```python
# Avoid:
# sales[sales["city"] == "Delhi"]["revenue"] = 0
```

Use a single `.loc` assignment:

```python
sales.loc[sales["city"] == "Delhi", "revenue"] = 0
```

Pandas 2.x Copy-on-Write changes how views and copies behave; code should not rely on accidental mutation through a slice. Prefer explicit assignments and `.copy()` when creating an independent working subset.

## 4.9 Custom functions and type stability

Keep custom functions small, explicit, and predictable.

```python
def add_vat(frame, rate=0.18):
    """Return a copy with VAT calculated from revenue."""
    return frame.assign(vat=frame["revenue"] * rate)

with_vat = add_vat(sales, rate=0.18)
print(with_vat[["order_id", "vat"]].head(2))
```

Avoid functions that silently mutate their input. Document expected columns, dtypes, units, and missing-value behavior.

### Level 4 – Try it yourself

1. Build a chain that filters orders with quantity at least 2, calculates net revenue after a 5% discount, groups by city, and sorts descending.
2. Create a MultiIndex summary by city and product.
3. Calculate a three-observation rolling average for daily readings.
4. Save a DataFrame to Parquet and read it back.
5. Write a function that adds a configurable tax column without modifying its input.

<details>
<summary>Solutions</summary>

```python
pipeline = (
    sales.assign(net=lambda d: d["revenue"] * 0.95)
    .query("quantity >= 2")
    .groupby("city", as_index=False)
    .agg(net=("net", "sum"))
    .sort_values("net", ascending=False)
)

multi_summary = sales.groupby(["city", "product"])["revenue"].sum()

readings = pd.Series([10, 12, 8, 15, 20])
rolling = readings.rolling(3, min_periods=1).mean()

sales.to_parquet("sales.parquet", index=False)
round_trip = pd.read_parquet("sales.parquet")

def add_tax(frame, rate=0.18):
    return frame.assign(tax=frame["revenue"] * rate)
```
</details>

### Level 4 – Common mistakes and gotchas

- A chain can become unreadable; split it into named intermediate steps when debugging.
- A rolling mean on unsorted data produces misleading time-series results.
- Category conversion is not always a memory win; measure it.
- Parquet support requires an engine such as `pyarrow` or `fastparquet`.
- Chunking does not magically make every global operation out-of-core.
- Never assume a DataFrame slice is a safe mutable view.

---

# Level 5 – Professional and production practices

## 5.1 Design a repeatable data workflow

A production workflow should have explicit stages:

1. **Ingest:** read files or query a source.
2. **Validate:** check required columns, types, ranges, and keys.
3. **Clean:** standardize strings, dates, units, and missing values.
4. **Transform:** calculate business metrics.
5. **Aggregate / publish:** create outputs for reports or systems.
6. **Observe:** log row counts, rejected records, duration, and failures.

Separate I/O from transformation logic. This makes the logic testable without requiring a real file or database.

## 5.2 Read files defensively

```python
from pathlib import Path
import pandas as pd

def load_orders(path: str | Path) -> pd.DataFrame:
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(path)

    required = {"order_id", "quantity", "unit_price"}
    frame = pd.read_csv(path)

    missing = required - set(frame.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")

    frame["quantity"] = pd.to_numeric(frame["quantity"], errors="raise")
    frame["unit_price"] = pd.to_numeric(frame["unit_price"], errors="raise")
    return frame
```

Fail early with useful messages. Do not silently continue with missing required columns.

## 5.3 Validate business rules

Basic assertions are useful during development:

```python
assert sales["order_id"].notna().all()
assert sales["order_id"].is_unique
assert (sales["quantity"] >= 0).all()
assert (sales["unit_price"] >= 0).all()
```

For reusable pipelines, use explicit validation functions or a validation library. Validation should distinguish:
- structural rules (required columns, types);
- domain rules (quantity cannot be negative);
- relational rules (foreign keys must match);
- statistical checks (unexpected shifts or outliers).

## 5.4 Handle errors and log outcomes

```python
import logging
from pathlib import Path
import pandas as pd

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)
logger = logging.getLogger(__name__)

def build_report(source: Path, destination: Path) -> None:
    logger.info("Reading %s", source)
    frame = pd.read_csv(source)

    logger.info("Loaded %d rows and %d columns", *frame.shape)
    required = {"city", "revenue"}
    if not required.issubset(frame.columns):
        raise ValueError(f"Expected columns: {sorted(required)}")

    report = frame.groupby("city", as_index=False)["revenue"].sum()
    destination.parent.mkdir(parents=True, exist_ok=True)
    report.to_csv(destination, index=False)
    logger.info("Wrote %d report rows to %s", len(report), destination)
```

Catch exceptions only when you can add context, recover, or clean up. Avoid broad `except Exception: pass`, which hides failures.

## 5.5 Unit tests for transformations

A transformation should be testable with a tiny DataFrame.

```python
# transformations.py
import pandas as pd

def calculate_revenue(frame: pd.DataFrame) -> pd.DataFrame:
    required = {"quantity", "unit_price"}
    if not required.issubset(frame.columns):
        raise ValueError("quantity and unit_price are required")
    return frame.assign(revenue=frame["quantity"] * frame["unit_price"])
```

Test with `pytest`:

```python
# test_transformations.py
import pandas as pd
from pandas.testing import assert_frame_equal
from transformations import calculate_revenue

def test_calculate_revenue():
    source = pd.DataFrame({"quantity": [2, 3], "unit_price": [10, 5]})
    actual = calculate_revenue(source)
    expected = pd.DataFrame({
        "quantity": [2, 3],
        "unit_price": [10, 5],
        "revenue": [20, 15]
    })
    assert_frame_equal(actual, expected)
```

Run:

```bash
python -m pip install pytest
pytest -q
```

Use `pandas.testing.assert_frame_equal()` to compare DataFrames while checking values, labels, and dtypes.

## 5.6 Reproducibility and data contracts

Professional datasets need a contract. Document:

- column names and meanings;
- expected dtypes;
- units and currencies;
- timezone and timestamp convention;
- allowed nulls;
- unique keys;
- source system and refresh frequency;
- transformation version and business definitions.

For example, `revenue` should specify whether it is gross or net, whether tax is included, and which currency it uses. A column named `date` is not enough to define whether it represents order creation, shipment, or settlement.

## 5.7 Performance optimization: measure first

A sensible optimization sequence:

1. Confirm correctness with tests.
2. Measure wall-clock time and memory.
3. Select only required columns (`usecols`).
4. Use appropriate dtypes and categories.
5. Prefer vectorized operations and built-in GroupBy aggregations.
6. Avoid repeated concatenation and unnecessary copies.
7. Use Parquet for repeated analytical reads.
8. Consider a database, Polars, Dask, DuckDB, or Spark when data size or workload exceeds a single-machine Pandas workflow.

Simple timing:

```python
from time import perf_counter

start = perf_counter()
result = sales.groupby("city")["revenue"].sum()
elapsed = perf_counter() - start
print(f"Elapsed: {elapsed:.6f} seconds")
```

For reliable benchmarks, repeat runs, control data size, avoid comparing cold and warm caches unfairly, and profile the full workflow rather than one isolated line.

## 5.8 Common production pitfalls

| Pitfall | Why it hurts | Better practice |
|---|---|---|
| Silent dtype inference | IDs may become floats or dates may remain text | Specify and validate dtypes |
| Unchecked merge | Unexpected row multiplication | Validate keys and merge cardinality |
| Filling all nulls with zero | Changes business meaning | Define null policy per field |
| Row-wise `apply` everywhere | Python overhead | Prefer vectorized expressions |
| Unsorted time series | Wrong rolling / resampling results | Sort and validate timestamps |
| Unbounded data loads | Memory exhaustion | Filter, project columns, chunk, or use a database |
| Hidden mutation | Hard-to-debug state changes | Use explicit returns and assignments |
| No tests | Regressions go unnoticed | Test transformations and edge cases |

## 5.9 A realistic end-to-end example

This example reads raw order data, normalizes it, validates it, calculates revenue, and writes a city report.

```python
from pathlib import Path
import pandas as pd

def make_city_report(source: Path, output: Path) -> pd.DataFrame:
    required = {"order_id", "city", "quantity", "unit_price"}
    raw = pd.read_csv(source)

    missing = required - set(raw.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")

    clean = raw.copy()
    clean["city"] = clean["city"].astype("string").str.strip().str.title()
    clean["quantity"] = pd.to_numeric(clean["quantity"], errors="raise")
    clean["unit_price"] = pd.to_numeric(clean["unit_price"], errors="raise")

    if clean["order_id"].isna().any():
        raise ValueError("order_id cannot be missing")
    if clean["order_id"].duplicated().any():
        raise ValueError("order_id must be unique")
    if (clean[["quantity", "unit_price"]] < 0).any().any():
        raise ValueError("Quantity and unit price must be non-negative")

    clean["revenue"] = clean["quantity"] * clean["unit_price"]

    report = (
        clean.groupby("city", as_index=False)
        .agg(
            orders=("order_id", "count"),
            units=("quantity", "sum"),
            revenue=("revenue", "sum")
        )
        .sort_values("revenue", ascending=False)
    )

    output.parent.mkdir(parents=True, exist_ok=True)
    report.to_parquet(output, index=False)
    return report
```

Example input CSV:

```csv
order_id,city,quantity,unit_price
1,delhi,2,100
2,Pune,1,300
3,Delhi,3,100
```

Expected report:

```text
    city  orders  units  revenue
0  Delhi       2      5      500
1   Pune       1      1      300
```

The function returns the report and writes a Parquet artifact. In a scheduled job, add logging, monitoring, atomic output replacement, and a clear failure notification.

## 5.10 Style and maintainability conventions

- Use descriptive column names and consistent snake_case for Python variables.
- Keep transformation functions focused and document input/output contracts.
- Avoid relying on column order; select columns by name.
- Make currency, units, timezone, and rounding rules explicit.
- Use deterministic sorting before producing reports intended for comparison.
- Keep raw source data immutable; write cleaned data to a separate object or location.
- Pin dependency versions in a lock file for reproducible deployments.
- Review Pandas release notes before upgrading production environments.

### Level 5 – Try it yourself

1. Write a function that checks required columns and rejects duplicate IDs.
2. Write a transformation that returns a new DataFrame with revenue and does not mutate its input.
3. Write a `pytest` test for missing required columns.
4. Add logging for input row count and output row count.
5. Decide whether a 30 GB CSV should be loaded directly into Pandas, chunked, or processed with a database/columnar engine. Explain the trade-off.

<details>
<summary>Solutions and discussion</summary>

```python
def validate_orders(frame):
    required = {"order_id", "quantity", "unit_price"}
    missing = required - set(frame.columns)
    if missing:
        raise ValueError(f"Missing columns: {sorted(missing)}")
    if frame["order_id"].isna().any() or frame["order_id"].duplicated().any():
        raise ValueError("order_id must be present and unique")

def add_revenue(frame):
    validate_orders(frame)
    return frame.assign(
        revenue=frame["quantity"] * frame["unit_price"]
    )
```

A test:

```python
import pandas as pd
import pytest

def test_missing_columns_rejected():
    frame = pd.DataFrame({"order_id": [1]})
    with pytest.raises(ValueError, match="Missing columns"):
        validate_orders(frame)
```

For a 30 GB CSV, direct loading is usually inappropriate unless the machine has ample RAM and the dataset's in-memory expansion is understood. Chunking is suitable for independent aggregates. For repeated large joins, filters, and analytical queries, consider DuckDB, a database, Polars, Dask, or Spark. The right choice depends on RAM, query patterns, concurrency, and operational requirements.
</details>

### Level 5 – Common mistakes and gotchas

- A successful script is not necessarily a reliable pipeline: validation, observability, and tests matter.
- Do not log secrets, personal data, or entire sensitive rows.
- Do not assume a CSV round-trip preserves all original dtypes or timezone metadata.
- Avoid “fixing” bad source data silently; record rejected rows and reasons.
- Do not optimize before measuring. Readability and correctness come first.

---

# Pandas quick reference

## Selection

| Goal | Pattern |
|---|---|
| One column | `df["col"]` |
| Several columns | `df[["a", "b"]]` |
| Label selection | `df.loc[rows, cols]` |
| Position selection | `df.iloc[row_positions, col_positions]` |
| Conditional filter | `df[df["x"] > 10]` |
| Membership | `df[df["x"].isin(values)]` |
| Missing values | `df[df["x"].isna()]` |

## Transformation

| Goal | Pattern |
|---|---|
| Add column | `df["z"] = df["x"] + df["y"]` |
| Functional assignment | `df.assign(z=lambda d: d.x + d.y)` |
| Rename | `df.rename(columns={"old": "new"})` |
| Drop columns | `df.drop(columns=["x"])` |
| Sort | `df.sort_values("x")` |
| Deduplicate | `df.drop_duplicates(subset=["id"])` |
| Convert type | `df["x"].astype("float64")` |

## Analysis and reshaping

| Goal | Pattern |
|---|---|
| Group summary | `df.groupby("key").agg(...)` |
| Group value per row | `df.groupby("key")["x"].transform("mean")` |
| Join | `left.merge(right, on="id", how="left")` |
| Stack rows | `pd.concat([a, b], ignore_index=True)` |
| Wide to long | `df.melt(id_vars=...)` |
| Long to wide | `df.pivot_table(...)` |
| Frequency table | `df["category"].value_counts()` |
| Cross-tab | `pd.crosstab(df["a"], df["b"])` |

## I/O

| Format | Read | Write |
|---|---|---|
| CSV | `pd.read_csv("x.csv")` | `df.to_csv("x.csv", index=False)` |
| Excel | `pd.read_excel("x.xlsx")` | `df.to_excel("x.xlsx", index=False)` |
| JSON | `pd.read_json("x.json")` | `df.to_json("x.json")` |
| Parquet | `pd.read_parquet("x.parquet")` | `df.to_parquet("x.parquet", index=False)` |
| SQL | `pd.read_sql(query, connection)` | `df.to_sql("table", connection)` |

---

# Glossary

- **Alignment:** Matching values by index or column labels.
- **Aggregation:** Reducing many rows to summary values.
- **Categorical dtype:** A dtype for values drawn from a limited set of categories.
- **DataFrame:** Two-dimensional labelled table.
- **Index:** Labels identifying rows (or columns).
- **Merge:** Combining tables based on key columns or indexes.
- **Missing value:** An absent or unknown value represented by `NaN`, `None`, or `pd.NA`.
- **Series:** One-dimensional labelled array.
- **Vectorization:** Applying an operation to an array/column as a whole rather than manually looping in Python.
- **Wide / long:** Two common layouts for representing variables and observations.

**You have completed the Pandas guide.** The best next step is to take a real CSV from your work, inspect it, define its data contract, and build a tested transformation pipeline using the patterns above.
