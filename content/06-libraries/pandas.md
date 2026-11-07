# pandas

**pandas** is Python's main library for working with table-like data, such as spreadsheets and CSV files. Its core object is the **DataFrame**: a table with labelled rows and columns.

## Install and import

```bash
pip install pandas
```

```python
import pandas as pd
```

## Creating a DataFrame

```python
df = pd.DataFrame({
    "name": ["Ada", "Linus", "Guido"],
    "age": [30, 25, 35],
})

print(df)
```

Output:

```
    name  age
0    Ada   30
1  Linus   25
2  Guido   35
```

## Selecting and filtering

```python
print(df["age"].mean())      # 30.0

older = df[df["age"] > 28]   # keep only rows where the condition is True
print(older)
```

Output:

```
    name  age
0    Ada   30
2  Guido   35
```

## Reading files

```python
data = pd.read_csv("data.csv")
print(data.head())           # first 5 rows
```

## Common operations

| Operation | What it does |
|---|---|
| `df.head()` | Shows the first rows |
| `df.describe()` | Summary statistics for number columns |
| `df.sort_values("age")` | Sorts rows by a column |
| `df.groupby("col").mean()` | Groups rows and averages each group |
| `df.to_csv("out.csv")` | Saves the table to a file |

pandas is built on top of NumPy, so learning NumPy first makes pandas easier to understand.
