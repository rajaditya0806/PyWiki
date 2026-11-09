# Matplotlib: From Absolute Beginner to Professional

*A practical, step-by-step guide to data visualization with Python*

## How to use this guide

This guide assumes you know basic Python variables, lists, loops,
functions, and imports. You do **not** need prior experience with data
visualization.

Work through the chapters in order. Run every example, change the data,
and make the chart your own. The goal is not merely to memorize plotting
commands; it is to learn how to choose, build, improve, and communicate
with visualizations.

### Learning outcomes

By the end, you should be able to:

-   Explain what Matplotlib is and how its plotting model works.
-   Create and customize common charts.
-   Work with NumPy arrays, Pandas DataFrames, dates, categories, and
    missing values.
-   Build multi-panel figures and reusable plotting functions.
-   Improve readability, accessibility, and visual honesty.
-   Save publication-quality figures and troubleshoot common problems.
-   Build a small, documented visualization project.

------------------------------------------------------------------------

# 1. What is Matplotlib?

Matplotlib is a Python library for creating static, animated, and
interactive visualizations. It is widely used in data analysis,
scientific computing, engineering, and reporting.

A chart can help answer questions that are difficult to see in a table:

-   Is a value increasing over time?
-   Which category is largest?
-   Are two variables related?
-   How is a numerical value distributed?
-   Are there unusual observations?

Matplotlib gives you detailed control over the appearance and layout of
a figure.

## 1.1 Install Matplotlib

It is good practice to use a virtual environment for each project.

``` bash
python -m venv .venv
```

Activate it:

**Windows PowerShell**

``` powershell
.venv\Scripts\Activate.ps1
```

**Windows Command Prompt**

``` bat
.venv\Scripts\activate
```

**macOS/Linux**

``` bash
source .venv/bin/activate
```

Install Matplotlib and the common data tools:

``` bash
python -m pip install matplotlib numpy pandas
```

Check the installation:

``` bash
python -c "import matplotlib; print(matplotlib.__version__)"
```

If you use Jupyter:

``` bash
python -m pip install jupyter
```

Start it with `jupyter lab` or `jupyter notebook`.

## 1.2 Your first plot

Create a file named `first_plot.py`:

``` python
import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5]
temperatures = [25, 27, 26, 30, 32]

plt.plot(days, temperatures)
plt.show()
```

What each line does:

1.  `import matplotlib.pyplot as plt` imports the plotting interface and
    gives it the short name `plt`.
2.  `days` contains the horizontal-axis values.
3.  `temperatures` contains the vertical-axis values.
4.  `plt.plot()` creates a line plot.
5.  `plt.show()` displays the figure in a normal Python script.

The horizontal axis is commonly called the **x-axis**; the vertical axis
is the **y-axis**.

## 1.3 Add labels and a title

``` python
import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5]
temperatures = [25, 27, 26, 30, 32]

plt.plot(days, temperatures)

plt.title("Temperature During the Week")
plt.xlabel("Day")
plt.ylabel("Temperature (°C)")

plt.grid(True)
plt.show()
```

A chart should explain itself. Give it a meaningful title, label its
axes, and include units where relevant.

------------------------------------------------------------------------

# 2. Understand the Matplotlib Figure Model

Matplotlib has two central objects:

-   **Figure:** the complete image or canvas.
-   **Axes:** an individual plotting area inside the figure. An Axes
    contains the data, axes, title, legend, and grid.

Be careful: `Axes` is the name of the plotting-area object; `axis` often
refers to one of the x/y scales or their visual markings.

The recommended approach for serious work is the **object-oriented
interface**.

## 2.1 The object-oriented pattern

``` python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [10, 15, 13, 20]

fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_title("Example")
ax.set_xlabel("X values")
ax.set_ylabel("Y values")

plt.show()
```

-   `plt.subplots()` creates a Figure and an Axes.
-   `fig` represents the whole figure.
-   `ax` represents the plotting area.
-   `ax.plot()` draws on that specific Axes.
-   `ax.set_*()` methods configure its labels and title.

Use `fig, ax = plt.subplots()` as your default starting point. The
simpler `plt.plot()` style is useful for quick experiments, but explicit
Figure and Axes objects are easier to manage in larger programs.

## 2.2 Figure size and resolution

``` python
fig, ax = plt.subplots(figsize=(8, 5), dpi=120)
```

-   `figsize` is measured in inches.
-   `dpi` means dots per inch and affects raster resolution.

A larger figure is not automatically clearer. Choose a size appropriate
for the report, screen, or document where it will appear.

## 2.3 Multiple plots in one figure

``` python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].plot([1, 2, 3], [2, 4, 6])
axes[0].set_title("First plot")

axes[1].bar(["A", "B", "C"], [5, 3, 7])
axes[1].set_title("Second plot")

fig.tight_layout()
plt.show()
```

`plt.subplots(1, 2)` creates one row and two columns of Axes. `axes[0]`
is the first plot and `axes[1]` is the second.

For a grid:

``` python
fig, axes = plt.subplots(2, 2, figsize=(9, 7))
```

You can access each Axes by row and column, such as `axes[0, 1]`.

------------------------------------------------------------------------

# 3. The Essential Chart Types

Choose a chart based on the question and the type of data. A more
complicated chart is not necessarily a better chart.

## 3.1 Line chart: change over an ordered sequence

Use a line chart for trends, especially over time.

``` python
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [120, 150, 135, 180, 210]

fig, ax = plt.subplots()
ax.plot(months, sales, marker="o", linewidth=2)

ax.set_title("Monthly Sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales (units)")
ax.grid(True, alpha=0.3)

plt.show()
```

Useful options:

-   `marker="o"` places a marker at each observation.
-   `linewidth=2` changes line thickness.
-   `linestyle="--"` creates a dashed line.
-   `color="tab:blue"` sets a color.

Do not connect unrelated categories with a line if the connecting
segments imply a meaningful order or continuity that does not exist.

## 3.2 Bar chart: compare categories

``` python
import matplotlib.pyplot as plt

subjects = ["Maths", "Physics", "Chemistry", "English"]
marks = [88, 76, 91, 82]

fig, ax = plt.subplots()
bars = ax.bar(subjects, marks)

ax.set_title("Marks by Subject")
ax.set_xlabel("Subject")
ax.set_ylabel("Marks")
ax.set_ylim(0, 100)

ax.bar_label(bars, padding=3)
plt.show()
```

A bar chart is good for comparing discrete categories. For ordinary bar
charts, a zero baseline makes the length comparison honest and easy to
interpret.

Horizontal bars are useful for long category names:

``` python
fig, ax = plt.subplots()
ax.barh(subjects, marks)
ax.set_xlabel("Marks")
ax.set_title("Marks by Subject")
plt.show()
```

## 3.3 Scatter plot: relationship between two numerical variables

``` python
import matplotlib.pyplot as plt

hours_studied = [1, 2, 2.5, 3, 4, 5, 6]
marks = [45, 50, 55, 60, 68, 75, 82]

fig, ax = plt.subplots()
ax.scatter(hours_studied, marks, s=60, alpha=0.8)

ax.set_title("Study Hours and Marks")
ax.set_xlabel("Hours Studied")
ax.set_ylabel("Marks")
ax.grid(True, alpha=0.25)

plt.show()
```

A scatter plot can reveal clusters, trends, and unusual points. A
visible relationship does not by itself prove that one variable causes
the other.

## 3.4 Histogram: distribution of numerical data

A histogram groups numerical observations into intervals called
**bins**.

``` python
import matplotlib.pyplot as plt

exam_scores = [45, 52, 58, 60, 61, 65, 67, 70, 72, 75, 78, 80, 85, 90]

fig, ax = plt.subplots()
ax.hist(exam_scores, bins=6, edgecolor="black")

ax.set_title("Distribution of Exam Scores")
ax.set_xlabel("Score")
ax.set_ylabel("Number of Students")

plt.show()
```

The number and width of bins affect the appearance of the distribution.
Try more than one sensible bin setting and avoid choosing bins solely
because they make a preferred story look stronger.

## 3.5 Pie chart: parts of a whole

Pie charts can be appropriate when there are only a few categories that
form a meaningful whole.

``` python
import matplotlib.pyplot as plt

labels = ["Food", "Travel", "Rent", "Other"]
expenses = [30, 15, 40, 15]

fig, ax = plt.subplots()
ax.pie(
    expenses,
    labels=labels,
    autopct="%1.1f%%",
    startangle=90
)
ax.set_title("Monthly Expense Distribution")
ax.axis("equal")

plt.show()
```

For many categories or close values, a bar chart is usually easier to
compare accurately.

## 3.6 Box plot: compare distributions and identify possible outliers

``` python
import matplotlib.pyplot as plt

class_a = [55, 60, 62, 65, 70, 72, 75, 80, 95]
class_b = [50, 58, 60, 63, 64, 66, 68, 70, 73]

fig, ax = plt.subplots()
ax.boxplot([class_a, class_b], tick_labels=["Class A", "Class B"])

ax.set_title("Score Distribution by Class")
ax.set_ylabel("Marks")
plt.show()
```

A box plot summarizes the median, quartiles, spread, and possible
outliers according to the plotting convention. An outlier marker is a
prompt to investigate, not proof of an error.

------------------------------------------------------------------------

# 4. Customize Charts Professionally

A useful chart is readable before it is decorative.

## 4.1 Colors, markers, and line styles

``` python
fig, ax = plt.subplots()

ax.plot(
    [1, 2, 3, 4],
    [10, 15, 12, 20],
    color="tab:blue",
    marker="o",
    linestyle="--",
    linewidth=2,
    markersize=7,
    label="Series A"
)

ax.legend()
plt.show()
```

Prefer a small, consistent palette. Use color to communicate meaning,
not merely to make every series different. Check that the chart remains
understandable when printed in grayscale or viewed by someone with
color-vision differences.

## 4.2 Legends

A legend explains which plotted series corresponds to which label.

``` python
fig, ax = plt.subplots()

ax.plot([1, 2, 3], [2, 4, 6], label="Product A")
ax.plot([1, 2, 3], [3, 5, 7], label="Product B")

ax.legend(title="Products", loc="upper left")
plt.show()
```

Always provide a `label` for each series that needs to appear in the
legend.

## 4.3 Limits and ticks

``` python
fig, ax = plt.subplots()

ax.plot([1, 2, 3, 4], [10, 20, 30, 40])

ax.set_xlim(1, 4)
ax.set_ylim(0, 50)
ax.set_xticks([1, 2, 3, 4])
ax.set_yticks([0, 10, 20, 30, 40, 50])

plt.show()
```

Limits control the visible range. Ticks are the positions where values
are marked. Avoid removing context or exaggerating differences through
misleading axis limits.

## 4.4 Annotations

Annotations call attention to a particular point.

``` python
fig, ax = plt.subplots()

x = [1, 2, 3, 4]
y = [10, 15, 13, 25]

ax.plot(x, y, marker="o")

ax.annotate(
    "Highest value",
    xy=(4, 25),
    xytext=(2.7, 27),
    arrowprops={"arrowstyle": "->"}
)

plt.show()
```

Use annotations sparingly. They should clarify the chart, not cover the
data.

## 4.5 Grid and visual hierarchy

``` python
ax.grid(axis="y", linestyle=":", alpha=0.4)
```

Light grid lines can help readers estimate values. A strong title, clear
labels, and restrained decoration generally matter more than elaborate
styling.

## 4.6 Reusable styles

Matplotlib includes built-in styles:

``` python
import matplotlib.pyplot as plt

print(plt.style.available)

plt.style.use("ggplot")
```

You can also set consistent defaults:

``` python
import matplotlib.pyplot as plt

plt.rcParams.update({
    "figure.figsize": (8, 5),
    "font.size": 11,
    "axes.titlesize": 15,
    "axes.labelsize": 12,
    "lines.linewidth": 2
})
```

Set defaults once near the start of a project. Be aware that global
settings affect subsequent plots in the same process.

------------------------------------------------------------------------

# 5. Working with NumPy

Matplotlib works naturally with NumPy arrays.

``` python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title("Sine Wave")
ax.set_xlabel("x")
ax.set_ylabel("sin(x)")
ax.grid(True, alpha=0.3)

plt.show()
```

`np.linspace(0, 10, 100)` creates 100 evenly spaced values between 0 and
10.

Other useful NumPy functions:

-   `np.arange(start, stop, step)`
-   `np.linspace(start, stop, number_of_points)`
-   `np.sin(array)`
-   `np.cos(array)`
-   `np.random.default_rng(seed)` for reproducible random data

Example of reproducible random data:

``` python
rng = np.random.default_rng(42)
values = rng.normal(loc=50, scale=10, size=500)
```

A fixed seed makes the same pseudo-random sequence reproducible, which
is useful for examples and tests.

------------------------------------------------------------------------

# 6. Working with Pandas DataFrames

In real projects, data often comes from CSV or Excel files. Pandas makes
it easy to prepare that data, and Matplotlib can visualize it.

``` python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv")

print(df.head())
print(df.info())

fig, ax = plt.subplots()
ax.plot(df["month"], df["sales"], marker="o")

ax.set_title("Monthly Sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales")

fig.tight_layout()
plt.show()
```

You can also use Pandas' plotting methods:

``` python
df.plot(x="month", y="sales", kind="line")
plt.show()
```

Pandas plotting is convenient for quick exploration. Use the
object-oriented Matplotlib interface when you need more precise layout
or customization.

## 6.1 Clean before plotting

Check the data types, missing values, duplicates, and unusual values
before drawing conclusions.

``` python
print(df.dtypes)
print(df.isna().sum())
print(df.duplicated().sum())
```

Do not automatically replace every missing value with zero. Decide what
missingness means in the context of the dataset.

------------------------------------------------------------------------

# 7. Dates and Time Series

For time-based data, parse dates instead of treating them as arbitrary
text.

``` python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("daily_sales.csv", parse_dates=["date"])
df = df.sort_values("date")

fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(df["date"], df["sales"])

ax.set_title("Daily Sales")
ax.set_xlabel("Date")
ax.set_ylabel("Sales")
fig.autofmt_xdate()

plt.show()
```

Useful ideas for time-series charts:

-   Sort observations chronologically.
-   Make the time zone clear when relevant.
-   Choose sensible tick intervals.
-   Avoid implying daily observations if data is only available monthly.
-   Consider rolling averages when the underlying question concerns
    longer-term trends.

For advanced date formatting, explore `matplotlib.dates`.

------------------------------------------------------------------------

# 8. Multiple Axes and Complex Layouts

## 8.1 Several panels

``` python
import matplotlib.pyplot as plt

months = [1, 2, 3, 4, 5]
sales = [10, 15, 12, 18, 22]
costs = [6, 8, 7, 10, 12]

fig, axes = plt.subplots(2, 1, figsize=(8, 7), sharex=True)

axes[0].plot(months, sales, marker="o")
axes[0].set_title("Sales")
axes[0].set_ylabel("Units")

axes[1].plot(months, costs, marker="s", color="tab:orange")
axes[1].set_title("Costs")
axes[1].set_xlabel("Month")
axes[1].set_ylabel("Units")

fig.tight_layout()
plt.show()
```

`sharex=True` makes the panels use the same x-axis scale.

## 8.2 Shared axes

Sharing axes makes comparisons easier when the same units and scales
apply. Do not share axes when doing so would hide meaningful differences
or make the values confusing.

## 8.3 Layout management

Use:

``` python
fig.tight_layout()
```

For more complex figures, Matplotlib also supports constrained layout:

``` python
fig, axes = plt.subplots(2, 2, layout="constrained")
```

Avoid combining multiple layout engines without understanding how they
interact.

------------------------------------------------------------------------

# 9. Save and Export Figures

A plot displayed on screen is not yet a deliverable. Professional work
often requires exporting images for reports, presentations, websites, or
papers.

``` python
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot([1, 2, 3], [10, 20, 15])
ax.set_title("Example Figure")

fig.savefig("example.png", dpi=300, bbox_inches="tight")
fig.savefig("example.pdf", bbox_inches="tight")
fig.savefig("example.svg", bbox_inches="tight")

plt.show()
```

Common formats:

-   **PNG:** raster image, useful for general documents and
    presentations.
-   **JPEG:** raster image with lossy compression; usually not ideal for
    charts with text and sharp lines.
-   **PDF:** often useful for documents and print workflows.
-   **SVG:** vector format useful for scalable graphics and web
    workflows.

`dpi=300` is a common choice for high-resolution raster output, but the
appropriate setting depends on the intended use. Vector formats do not
rely on a fixed pixel resolution in the same way.

Save the figure before closing it. In scripts, use `plt.close(fig)`
after saving when generating many figures in a loop to release
resources.

------------------------------------------------------------------------

# 10. Common Beginner Mistakes and How to Fix Them

## Mistake 1: Forgetting `plt.show()`

In a normal Python script, the plot may not appear unless you call:

``` python
plt.show()
```

Notebook environments may display figures automatically, but explicit
code is clearer when sharing scripts.

## Mistake 2: Mixing up Figure and Axes

Prefer:

``` python
fig, ax = plt.subplots()
ax.plot(x, y)
```

This makes it clear which plot you are modifying.

## Mistake 3: Different lengths for x and y

The x and y arrays must have compatible lengths for a normal line plot.

Check:

``` python
print(len(x), len(y))
```

## Mistake 4: Missing labels and units

A chart without axis labels can be impossible to interpret. Include
units such as seconds, kilograms, rupees, or percentages where
appropriate.

## Mistake 5: Overusing colors and effects

Too many colors, 3D effects, shadows, and decorative elements distract
from the data. Use visual effects only when they improve understanding.

## Mistake 6: Plotting unclean data

Inspect missing values, duplicates, types, and outliers before
interpreting a chart.

## Mistake 7: Not closing figures in batch jobs

When creating many figures in a script:

``` python
fig.savefig("output.png")
plt.close(fig)
```

This helps prevent unnecessary memory use.

## Mistake 8: Assuming a chart proves causation

A chart can show an association or trend. It cannot, by itself,
establish that one variable caused another.

------------------------------------------------------------------------

# 11. A Professional Workflow for Data Visualization

A professional visualization process is more than calling `plot()`.

## Step 1: Define the question

Write down the question the chart should answer. Examples:

-   Which product had the highest sales?
-   How did revenue change over time?
-   Is delivery time associated with customer ratings?

## Step 2: Understand the data

Inspect:

-   Number of rows and columns
-   Data types
-   Missing values
-   Duplicate records
-   Units and definitions
-   Data collection period
-   Potential biases or limitations

## Step 3: Select the right chart

  Question                               Common chart choice
  -------------------------------------- ----------------------------
  How does something change over time?   Line
  Which categories are larger?           Bar
  How are values distributed?            Histogram or box plot
  Are two numerical variables related?   Scatter
  How do groups compare in spread?       Box plot
  What are the parts of a whole?         Stacked bar; sometimes pie

These are starting points, not rigid rules. The data structure and
audience matter.

## Step 4: Build a clear first version

Start with the simplest chart that answers the question. Add a title,
axis labels, units, and a legend when needed.

## Step 5: Check accuracy

Ask:

-   Are the axes and units correct?
-   Does the scale exaggerate or hide differences?
-   Are categories ordered sensibly?
-   Are missing values handled transparently?
-   Does the chart imply more certainty than the data supports?

## Step 6: Improve accessibility

-   Use readable text sizes.
-   Do not rely on color alone to communicate categories.
-   Use sufficient contrast.
-   Use markers or line styles as additional cues.
-   Add a text description or caption when the chart is used in a
    report.

## Step 7: Export and document

Save the chart in an appropriate format. Record the dataset source, date
range, definitions, and any important transformations.

------------------------------------------------------------------------

# 12. Mini Project: Complete Sales Analysis Dashboard

This project combines the concepts from the guide.

## Objective

Analyze a small sales dataset and create a figure containing:

1.  Monthly sales trend
2.  Sales by product
3.  Distribution of individual order values
4.  Relationship between quantity and revenue

## Example dataset

Create `sales.csv`:

``` csv
date,product,quantity,revenue
2026-01-05,Laptop,2,100000
2026-01-10,Phone,5,75000
2026-02-03,Laptop,1,50000
2026-02-12,Tablet,4,80000
2026-03-01,Phone,3,45000
2026-03-18,Tablet,2,40000
2026-04-07,Laptop,2,100000
2026-04-20,Phone,4,60000
```

## Suggested folder structure

``` text
sales-analysis/
    data/
        sales.csv
    output/
    analysis.py
    requirements.txt
    README.md
```

Install dependencies:

``` bash
python -m pip install pandas matplotlib
```

## Starter implementation

``` python
from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt

DATA_FILE = Path("data/sales.csv")
OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(exist_ok=True)

# 1. Load the data
df = pd.read_csv(DATA_FILE, parse_dates=["date"])

# 2. Inspect and validate
print(df.head())
print(df.info())
print(df.isna().sum())

# 3. Prepare monthly sales
df["month"] = df["date"].dt.to_period("M").astype(str)
monthly_sales = df.groupby("month")["revenue"].sum()

# 4. Prepare product sales
product_sales = df.groupby("product")["revenue"].sum()

# 5. Build a dashboard-style figure
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0, 0].plot(
    monthly_sales.index,
    monthly_sales.values,
    marker="o"
)
axes[0, 0].set_title("Monthly Revenue")
axes[0, 0].set_xlabel("Month")
axes[0, 0].set_ylabel("Revenue")

axes[0, 1].bar(
    product_sales.index,
    product_sales.values
)
axes[0, 1].set_title("Revenue by Product")
axes[0, 1].set_ylabel("Revenue")

axes[1, 0].hist(df["revenue"], bins=5, edgecolor="black")
axes[1, 0].set_title("Order Revenue Distribution")
axes[1, 0].set_xlabel("Revenue")
axes[1, 0].set_ylabel("Number of Orders")

axes[1, 1].scatter(df["quantity"], df["revenue"])
axes[1, 1].set_title("Quantity vs Revenue")
axes[1, 1].set_xlabel("Quantity")
axes[1, 1].set_ylabel("Revenue")

fig.suptitle("Sales Analysis Dashboard")
fig.tight_layout()

fig.savefig(OUTPUT_DIR / "sales_dashboard.png", dpi=300, bbox_inches="tight")
plt.show()
```

This is a learning example, not a production-ready analytics system. A
real project should validate input columns and values, document currency
units, handle missing or invalid records, and test its transformations.

## Project extensions

Try adding:

-   A date-range filter.
-   Monthly growth percentage.
-   A top-products chart.
-   A moving average.
-   A comparison between product categories.
-   A short written summary of the findings.
-   Automated tests for the data-cleaning and aggregation functions.

------------------------------------------------------------------------

# 13. Practice Exercises

Complete these without immediately looking up a full solution.

## Beginner

1.  Draw a line chart of your weekly study hours.
2.  Create a bar chart showing marks in five subjects.
3.  Create a histogram of 100 randomly generated numbers.
4.  Add a title, x-axis label, and y-axis label to each chart.
5.  Save one chart as a PNG file.

## Intermediate

1.  Create a scatter plot using two columns from a CSV file.
2.  Compare two groups using box plots.
3.  Build a 2 × 2 subplot layout.
4.  Plot monthly values using a Pandas DataFrame.
5.  Add legends and annotations to a multi-series chart.

## Advanced

1.  Create a reusable function that accepts a DataFrame and produces a
    chart.
2.  Build a time-series chart with properly formatted date ticks.
3.  Create a figure with shared axes and a common legend.
4.  Design a chart that remains understandable in grayscale.
5.  Build a small report that saves several figures automatically.

------------------------------------------------------------------------

# 14. Professional-Level Topics to Explore Next

Once you are comfortable with the core library, explore:

-   `matplotlib.dates` for advanced date formatting.
-   `matplotlib.ticker` for custom tick locations and number formatting.
-   `GridSpec` for complex figure layouts.
-   `inset_axes` and inset plots for magnified regions.
-   Error bars and uncertainty visualization.
-   Logarithmic and other axis scales.
-   Color maps and normalization for heatmaps.
-   Contour plots and image visualization.
-   Animations with `matplotlib.animation`.
-   Event handling and interactive figures.
-   Custom legends and annotations.
-   Custom styles and reusable plotting utilities.
-   Integration with Jupyter, Pandas, and scientific Python workflows.
-   Testing plotting code and running it in automated environments.

For interactive web dashboards, Matplotlib may not be the ideal final
presentation tool. You can later explore Plotly, Bokeh, or dashboard
frameworks such as Streamlit. Matplotlib remains especially valuable for
controlled, static, scientific, and report-ready figures.

------------------------------------------------------------------------

# 15. Reference: Essential Commands

  Task                        Command
  --------------------------- -------------------------------------
  Import plotting interface   `import matplotlib.pyplot as plt`
  Create figure and axes      `fig, ax = plt.subplots()`
  Line chart                  `ax.plot(x, y)`
  Bar chart                   `ax.bar(x, y)`
  Horizontal bar chart        `ax.barh(x, y)`
  Scatter plot                `ax.scatter(x, y)`
  Histogram                   `ax.hist(data)`
  Pie chart                   `ax.pie(values)`
  Box plot                    `ax.boxplot(data)`
  Set title                   `ax.set_title("Title")`
  Set x label                 `ax.set_xlabel("X")`
  Set y label                 `ax.set_ylabel("Y")`
  Add legend                  `ax.legend()`
  Add grid                    `ax.grid(True)`
  Save figure                 `fig.savefig("chart.png", dpi=300)`
  Display figure              `plt.show()`
  Close figure                `plt.close(fig)`

------------------------------------------------------------------------

# 16. Official Documentation and Further Learning

Use the official documentation as your reference when you encounter new
features or need exact behavior.

-   Matplotlib documentation: https://matplotlib.org/stable/
-   Matplotlib tutorials: https://matplotlib.org/stable/tutorials/
-   Matplotlib examples gallery: https://matplotlib.org/stable/gallery/
-   Pyplot API: https://matplotlib.org/stable/api/pyplot_summary.html
-   Axes API: https://matplotlib.org/stable/api/axes_api.html
-   Figure API: https://matplotlib.org/stable/api/figure_api.html
-   NumPy documentation: https://numpy.org/doc/
-   Pandas visualization guide:
    https://pandas.pydata.org/docs/user_guide/visualization.html

------------------------------------------------------------------------

# Final Advice

Do not measure your progress by how many chart types you can remember.
Measure it by whether you can look at a dataset, identify the question,
choose an appropriate visual representation, and communicate the result
accurately.

A strong Matplotlib user can do much more than create attractive graphs.
They can create visualizations that are reproducible, readable,
accessible, honest, and useful.

**Learn the fundamentals, practice with real datasets, build reusable
code, and explain what your charts actually tell the reader.**
