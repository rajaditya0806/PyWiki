# Scikit-Learn: From Absolute Beginner to Professional

*A practical, step-by-step guide to classical machine learning with
Python*

## How to use this guide

This guide takes you from your first machine-learning model to a
disciplined, end-to-end machine-learning workflow using **Scikit-Learn**
(also written as `sklearn`).

It assumes basic Python knowledge: variables, lists, loops, functions,
imports, and working with packages. You do not need to know machine
learning already.

Machine learning is not just calling `model.fit()`. A reliable
practitioner must understand the problem, prepare data correctly, choose
a suitable model, evaluate it honestly, avoid data leakage, and
communicate limitations.

### Learning outcomes

By the end, you should be able to:

-   Explain machine learning and its main problem types.
-   Prepare features and target values.
-   Split data into training, validation, and test sets.
-   Train regression, classification, and clustering models.
-   Build preprocessing and modeling pipelines.
-   Evaluate models using suitable metrics.
-   Use cross-validation and hyperparameter search.
-   Avoid common mistakes such as data leakage and overfitting.
-   Save and load a model safely.
-   Complete and document an end-to-end ML project.

------------------------------------------------------------------------

# 1. What is Machine Learning?

Machine Learning (ML) is a branch of artificial intelligence in which a
computer learns patterns from data and uses those patterns to make
predictions or decisions.

In traditional programming, you write explicit rules. In machine
learning, you provide examples and an algorithm learns a model from
them.

Example: suppose you have historical data containing house sizes and
their sale prices. You can train a model to learn the relationship and
estimate the price of a house it has not seen before.

## 1.1 Main types of machine learning

### A. Supervised learning

The training data contains both input information and the correct answer
(called the **target** or **label**).

Two common supervised tasks:

**Regression:** predict a numerical value.

Examples: - House price - Temperature - Monthly sales - Delivery time

**Classification:** predict a category.

Examples: - Spam or not spam - Fraudulent or legitimate - Cat, dog, or
bird - Customer likely to leave or stay

### B. Unsupervised learning

The data has no target labels. The algorithm tries to find structure or
patterns.

Examples: - Grouping customers by purchasing behavior. - Finding similar
documents. - Discovering groups in a dataset.

A common unsupervised task is **clustering**.

### C. Other areas

You may later encounter reinforcement learning, semi-supervised
learning, and self-supervised learning. Scikit-Learn is primarily
focused on classical machine-learning methods rather than deep-learning
frameworks.

------------------------------------------------------------------------

# 2. What is Scikit-Learn?

Scikit-Learn is a widely used Python library for classical machine
learning. It includes tools for:

-   Data preprocessing
-   Regression
-   Classification
-   Clustering
-   Dimensionality reduction
-   Model selection
-   Cross-validation
-   Evaluation metrics
-   Pipelines

Install the common libraries:

``` bash
python -m pip install scikit-learn numpy pandas matplotlib joblib
```

Check the version:

``` bash
python -c "import sklearn; print(sklearn.__version__)"
```

The package is installed as `scikit-learn`, but imported in Python as
`sklearn`.

For reproducible projects, use a virtual environment and record
dependencies:

``` bash
python -m pip freeze > requirements.txt
```

------------------------------------------------------------------------

# 3. The Basic Machine-Learning Workflow

Most supervised machine-learning projects follow this pattern:

1.  Define the problem.
2.  Collect and understand the data.
3.  Separate input features (`X`) and target (`y`).
4.  Split data into training and test sets.
5.  Preprocess the data.
6.  Choose a baseline model.
7.  Train the model.
8.  Evaluate it on data it did not train on.
9.  Improve it using validation and cross-validation.
10. Save, document, and monitor the model where appropriate.

## 3.1 Features and target

Imagine a dataset with these columns:

    Hours studied   Attendance (%)   Marks
  --------------- ---------------- -------
                2               70      45
                4               80      60
                6               90      78
                8               95      92

Here:

-   `Hours studied` and `Attendance` are features.
-   `Marks` is the target.

In Scikit-Learn, `X` usually contains the features and `y` contains the
target.

``` python
X = df[["hours_studied", "attendance"]]
y = df["marks"]
```

`X` is usually two-dimensional, even when there is only one feature. `y`
is commonly one-dimensional for ordinary single-output tasks.

## 3.2 Load a sample dataset

Scikit-Learn includes small datasets for learning.

``` python
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)

X = iris.data
y = iris.target

print(X.head())
print(y.head())
print(iris.target_names)
```

The Iris dataset contains measurements of flowers and a species label.
It is useful for learning classification, but it is not a substitute for
testing on realistic data from your own problem.

------------------------------------------------------------------------

# 4. Train-Test Split

A model must be evaluated on examples that were not used to train it.
Otherwise, the evaluation can give an overly optimistic impression.

`train_test_split()` divides data into subsets.

``` python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

iris = load_iris(as_frame=True)

X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))
```

Important parameters:

-   `test_size=0.2`: reserve 20% for testing.
-   `random_state=42`: make the random split repeatable.
-   `stratify=y`: preserve approximate class proportions for
    classification.

A test set should be treated as a final, held-back evaluation set. Do
not repeatedly tune your model against it. Use training data and
cross-validation for model selection, then evaluate once on the test
set.

For time-series data, do not randomly shuffle observations if that would
allow future information to leak into the past. Use a time-aware split.

------------------------------------------------------------------------

# 5. Your First Classification Model

Classification predicts a category.

We will use the Iris dataset and a K-Nearest Neighbors (KNN) classifier.

## 5.1 What is KNN?

KNN predicts the class of a new observation by looking at the closest
examples in the training data.

For example, if most of the five nearest flowers belong to one species,
KNN predicts that species.

## 5.2 Train and predict

``` python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris(as_frame=True)
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = KNeighborsClassifier(n_neighbors=5)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
```

Understand the key methods:

-   `model.fit(X_train, y_train)` learns from the training examples.
-   `model.predict(X_test)` predicts labels for new examples.
-   `accuracy_score(y_test, predictions)` measures the fraction of
    correct predictions.

A model's accuracy on one small split is not proof that it will perform
equally well in the real world.

## 5.3 Predict one new example

``` python
new_flower = [[5.1, 3.5, 1.4, 0.2]]

prediction = model.predict(new_flower)

print(iris.target_names[prediction[0]])
```

The feature order must match the order used during training. In real
applications, use a DataFrame with named columns or a validated input
schema to reduce mistakes.

------------------------------------------------------------------------

# 6. Your First Regression Model

Regression predicts a numerical value.

We will use a built-in Scikit-Learn dataset and linear regression.

## 6.1 What is linear regression?

Linear regression attempts to model a numerical target as a weighted
combination of input features.

For a single feature, the idea is often written as:

`y = mx + c`

-   `x` is the input.
-   `y` is the predicted output.
-   `m` is the slope.
-   `c` is the intercept.

For multiple features, the model learns a coefficient for each feature.

## 6.2 Train a regression model

``` python
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

housing = fetch_california_housing()

X = housing.data
y = housing.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = mse ** 0.5
r2 = r2_score(y_test, predictions)

print("MAE:", mae)
print("RMSE:", rmse)
print("R²:", r2)
```

The first use of `fetch_california_housing()` may download the dataset.
If downloading is not possible, use a local CSV or another dataset
available to you.

## 6.3 Understand regression metrics

**MAE --- Mean Absolute Error**

Average absolute difference between predictions and actual values. It is
expressed in the target's units.

**MSE --- Mean Squared Error**

Average squared prediction error. Large errors receive a stronger
penalty because they are squared.

**RMSE --- Root Mean Squared Error**

Square root of MSE. It is expressed in the target's units and penalizes
large errors more than MAE.

**R² --- Coefficient of Determination**

Measures how much variation is explained by the model relative to a
baseline. It can be negative on test data, meaning the model performs
worse than predicting the test-set mean under the usual definition.

No single metric tells the whole story. Choose metrics that reflect the
actual cost of prediction errors.

------------------------------------------------------------------------

# 7. Data Preprocessing

Real-world data is rarely ready for a model. It may contain missing
values, different units, text categories, and extreme values.

Preprocessing converts raw information into a form that a model can use.

## 7.1 Missing values

Some rows may not have every value.

Example:

        Age    Income
  --------- ---------
         20     25000
         25   missing
    missing     40000

A common simple strategy is to fill missing numerical values with the
median.

``` python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy="median")

X_filled = imputer.fit_transform(X)
```

Other strategies include: - `mean` - `most_frequent` - `constant`

The right approach depends on what is missing and why. Do not
automatically fill missing values with zero.

## 7.2 Feature scaling

Features may have very different numerical ranges.

For example: - Age: 18 to 80 - Annual income: 20,000 to 2,000,000

Some algorithms, such as KNN, support vector machines, and many
regularized linear models, are sensitive to feature scale.

### StandardScaler

Transforms a feature so that it has approximately zero mean and unit
standard deviation based on the training data.

``` python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Notice the difference:

-   Use `fit_transform()` on training data.
-   Use only `transform()` on test data.

Do not fit the scaler on the complete dataset before splitting. That
leaks information from the test set into the training process.

### MinMaxScaler

Scales values to a specified range, commonly 0 to 1.

``` python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Scaling is not necessary for every algorithm. Decision trees and random
forests, for example, generally do not require feature scaling.

## 7.3 Categorical encoding

Machine-learning algorithms generally need numerical input. Text
categories must be converted into numerical representations.

### OneHotEncoder

``` python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(handle_unknown="ignore")

encoded = encoder.fit_transform(
    [["Delhi"], ["Mumbai"], ["Delhi"]]
)

print(encoded.toarray())
```

One-hot encoding creates separate indicator columns for categories.
`handle_unknown="ignore"` helps the transformer handle categories that
were not present during fitting.

Avoid assigning arbitrary numbers to unordered categories if that would
incorrectly suggest a numerical ranking.

------------------------------------------------------------------------

# 8. Pipelines: The Professional Way to Combine Steps

A pipeline chains preprocessing and model training into one object.

This helps keep training and prediction consistent and reduces the risk
of data leakage during cross-validation.

``` python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = load_iris(as_frame=True)
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipeline = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=5)
)

pipeline.fit(X_train, y_train)

predictions = pipeline.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
```

The pipeline first scales the data, then trains KNN. When you call
`predict()`, it applies the same learned scaling before making
predictions.

For real projects with numerical and categorical columns, use
`ColumnTransformer` to apply different preprocessing steps to different
columns.

------------------------------------------------------------------------

# 9. Important Classification Algorithms

There is no algorithm that is best for every problem. Learn the
assumptions, strengths, limitations, and practical behavior of several
models.

## 9.1 Logistic Regression

Despite its name, logistic regression is commonly used for
classification.

``` python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
```

Useful as a baseline. It can be effective when the relationship is
reasonably simple and is often easier to interpret than more complex
models.

## 9.2 Decision Tree

A decision tree makes predictions by splitting data according to feature
conditions.

``` python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(
    max_depth=4,
    random_state=42
)
```

Trees are easy to visualize and can model non-linear relationships, but
a deep tree can overfit.

## 9.3 Random Forest

A random forest combines many decision trees to produce a more stable
prediction.

``` python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
```

Random forests are a strong general-purpose starting point for many
tabular classification tasks. They can be less interpretable than a
single small tree.

## 9.4 Support Vector Machine (SVM)

SVMs seek a decision boundary that separates classes with a large
margin. Kernel methods can model more complex boundaries.

``` python
from sklearn.svm import SVC

model = SVC(kernel="rbf", C=1.0)
```

SVMs often benefit from feature scaling. Their performance can be
sensitive to parameters such as `C` and `gamma`.

## 9.5 Naive Bayes

Naive Bayes uses Bayes' theorem with simplifying
conditional-independence assumptions.

``` python
from sklearn.naive_bayes import GaussianNB

model = GaussianNB()
```

Different Naive Bayes variants suit different feature types. It is often
used as a simple baseline, including for some text-classification tasks.

------------------------------------------------------------------------

# 10. Important Regression Algorithms

## 10.1 Linear Regression

``` python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
```

A useful baseline for numerical prediction. Inspect residuals and
assumptions rather than relying only on a score.

## 10.2 Ridge and Lasso

These are regularized linear models. Regularization penalizes overly
large coefficients and can help control overfitting.

``` python
from sklearn.linear_model import Ridge, Lasso

ridge_model = Ridge(alpha=1.0)
lasso_model = Lasso(alpha=0.1)
```

The `alpha` parameter controls regularization strength. Its useful range
depends on the data and feature scale.

## 10.3 Decision Tree Regressor

``` python
from sklearn.tree import DecisionTreeRegressor

model = DecisionTreeRegressor(
    max_depth=5,
    random_state=42
)
```

It can model non-linear relationships but can overfit when allowed to
grow too complex.

## 10.4 Random Forest Regressor

``` python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)
```

It averages predictions from many trees. It is useful for many tabular
problems, though training and prediction can be more resource-intensive
than a simple linear model.

------------------------------------------------------------------------

# 11. Evaluate Classification Models Properly

Accuracy is not always enough.

Imagine a fraud dataset where 99% of transactions are legitimate. A
model that predicts "legitimate" every time gets 99% accuracy but
detects no fraud.

Use additional metrics.

## 11.1 Confusion matrix

A confusion matrix compares actual labels with predicted labels.

``` python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

cm = confusion_matrix(y_test, predictions)

display = ConfusionMatrixDisplay(confusion_matrix=cm)
display.plot()
plt.show()
```

For binary classification:

-   True Positive (TP): positive case correctly predicted.
-   True Negative (TN): negative case correctly predicted.
-   False Positive (FP): negative case incorrectly predicted as
    positive.
-   False Negative (FN): positive case incorrectly predicted as
    negative.

## 11.2 Precision

Of the cases predicted positive, how many were actually positive?

High precision means fewer false positives.

## 11.3 Recall

Of all actual positive cases, how many did the model identify?

High recall means fewer false negatives.

## 11.4 F1-score

The harmonic mean of precision and recall. It can be useful when both
matter, but it does not replace understanding the underlying costs.

``` python
from sklearn.metrics import classification_report

print(classification_report(y_test, predictions))
```

## 11.5 ROC-AUC

ROC-AUC evaluates how well a classifier ranks positive examples above
negative examples across thresholds. It usually requires a score or
probability, not just predicted class labels.

``` python
from sklearn.metrics import roc_auc_score

probabilities = model.predict_proba(X_test)[:, 1]
print(roc_auc_score(y_test, probabilities))
```

This example assumes a binary classifier with a `predict_proba()` method
and that the positive class is at column index 1. Check class ordering
using `model.classes_`.

For highly imbalanced datasets, precision-recall curves and average
precision can be more informative than ROC-AUC.

------------------------------------------------------------------------

# 12. Overfitting and Underfitting

These are two fundamental problems in machine learning.

## 12.1 Underfitting

A model underfits when it is too simple to capture useful patterns in
the data.

Possible signs: - Poor training performance. - Poor validation
performance.

Possible responses: - Try a more flexible model. - Improve useful
features. - Reduce excessive regularization. - Check whether the
features contain enough information.

## 12.2 Overfitting

A model overfits when it learns details or noise specific to the
training data and performs poorly on unseen data.

Possible signs: - Very good training performance. - Much worse
validation or test performance.

Possible responses: - Simplify the model. - Use regularization. -
Collect more representative data. - Use cross-validation. - Reduce
leakage and overly complex features.

The goal is not to maximize training performance. It is to generalize to
data the model has not seen.

------------------------------------------------------------------------

# 13. Cross-Validation

A single train-validation split can be sensitive to which examples
happen to be selected.

Cross-validation evaluates a model across multiple splits.

In k-fold cross-validation, the training data is divided into k parts.
Each part is used for validation once while the remaining parts are used
for training.

``` python
from sklearn.datasets import load_iris
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X = iris.data
y = iris.target

model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=5)
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

print("Scores:", scores)
print("Mean accuracy:", scores.mean())
```

Cross-validation is useful for model comparison and hyperparameter
selection. Keep a final test set separate if you need an unbiased final
evaluation.

Choose a cross-validation strategy that matches the data: -
`StratifiedKFold` for many classification tasks. - `KFold` for ordinary
independent observations. - `GroupKFold` when related observations must
stay together. - `TimeSeriesSplit` for time-ordered data.

------------------------------------------------------------------------

# 14. Hyperparameter Tuning

A **parameter** is learned from training data. A **hyperparameter** is
set before or around training, such as tree depth or the number of
neighbors.

Grid search tests a specified set of hyperparameter combinations using
cross-validation.

``` python
from sklearn.datasets import load_iris
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

pipeline = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier()
)

parameter_grid = {
    "kneighborsclassifier__n_neighbors": [3, 5, 7, 9, 11]
}

search = GridSearchCV(
    pipeline,
    parameter_grid,
    cv=5,
    scoring="accuracy"
)

search.fit(X_train, y_train)

print("Best parameters:", search.best_params_)
print("Best CV score:", search.best_score_)
print("Test score:", search.score(X_test, y_test))
```

The `__` syntax accesses a step's parameter inside a Pipeline.

Other tools: - `RandomizedSearchCV` samples a set number of parameter
combinations. - `HalvingGridSearchCV` and related search methods can be
useful for larger searches, subject to their requirements.

Do not use the final test set to choose hyperparameters. That would turn
it into another validation set.

------------------------------------------------------------------------

# 15. Unsupervised Learning: Clustering

Clustering groups observations based on similarity, without using a
target label.

## 15.1 K-Means

K-Means tries to divide observations into a chosen number of clusters.

``` python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

X, _ = make_blobs(
    n_samples=200,
    centers=3,
    random_state=42
)

model = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

cluster_labels = model.fit_predict(X)

print(cluster_labels)
```

`fit_predict()` fits the model and returns a cluster label for each
observation.

K-Means requires you to choose the number of clusters. It can be
affected by feature scale, outliers, and the shape of the clusters.

## 15.2 Visualize clusters

``` python
import matplotlib.pyplot as plt

fig, ax = plt.subplots()

ax.scatter(
    X[:, 0],
    X[:, 1],
    c=cluster_labels,
    cmap="viridis"
)

ax.set_title("K-Means Clusters")
ax.set_xlabel("Feature 1")
ax.set_ylabel("Feature 2")

plt.show()
```

Cluster numbers are arbitrary labels. Cluster 0 is not inherently better
or more important than cluster 1.

## 15.3 Other clustering methods

Explore: - DBSCAN: can identify dense groups and mark noise points. -
Agglomerative clustering: builds a hierarchy of clusters. - Gaussian
Mixture Models: model data as a mixture of probability distributions.

Evaluate clusters using appropriate domain knowledge and measures such
as silhouette score. A metric alone cannot prove that clusters are
meaningful.

------------------------------------------------------------------------

# 16. Feature Engineering and Feature Selection

A model can only learn from the information provided to it.

**Feature engineering** means creating or transforming input variables
to make useful patterns easier for a model to learn.

Examples: - Extracting month, weekday, or hour from a timestamp. -
Calculating price per unit. - Combining related measurements. -
Converting text categories into numerical features. - Creating
interaction terms when appropriate.

**Feature selection** means choosing a subset of useful features.

Scikit-Learn provides tools such as: - `SelectKBest` - `RFE` -
`SelectFromModel` - `VarianceThreshold`

Feature selection must happen inside the training and validation
process. Selecting features using the complete dataset before splitting
can leak information.

Be especially careful with features that would not be available at the
moment a real prediction is made. A feature that contains future
information can create an impressive but unusable model.

------------------------------------------------------------------------

# 17. ColumnTransformer for Mixed Data

Real datasets often contain both numerical and categorical columns.

`ColumnTransformer` lets you apply different preprocessing to each group
of columns.

``` python
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

numeric_features = ["age", "income"]
categorical_features = ["city", "membership"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000))
])
```

This example defines a model pipeline. To train it, pass a DataFrame
containing those four named columns to `model.fit(X_train, y_train)`.

The important advantage is that preprocessing is learned only from the
training portion in each cross-validation split.

------------------------------------------------------------------------

# 18. Model Interpretation

A model score tells you how well a model performed under a particular
evaluation setup. It does not explain why it made a prediction.

Useful interpretation tools include:

## 18.1 Coefficients

For linear models, coefficients show how the prediction changes with a
feature, under the model's assumptions and feature scaling.

Do not interpret coefficient size without considering feature units,
scaling, correlated variables, and the model specification.

## 18.2 Tree-based feature importance

Some tree-based models provide `feature_importances_`.

``` python
import pandas as pd

importance = pd.Series(
    model.feature_importances_,
    index=feature_names
).sort_values(ascending=False)

print(importance)
```

This example assumes `model` is a fitted tree-based estimator and
`feature_names` matches its input features.

Built-in tree importance can be biased toward certain feature types and
does not prove causation.

## 18.3 Permutation importance

Permutation importance measures how much a chosen evaluation score
changes when a feature's values are shuffled.

``` python
from sklearn.inspection import permutation_importance

result = permutation_importance(
    model,
    X_test,
    y_test,
    n_repeats=10,
    random_state=42
)

print(result.importances_mean)
```

Use data that was not used to fit the model for a more meaningful
assessment. Correlated features can complicate interpretation.

For deeper model explanations, explore partial dependence and SHAP as
separate tools, understanding their assumptions and limitations.

------------------------------------------------------------------------

# 19. Save and Load a Trained Model

You may want to save a trained model rather than train it every time
your application starts.

Scikit-Learn commonly works with `joblib` for Python object persistence.

``` python
import joblib

joblib.dump(model, "model.joblib")
```

Load it later:

``` python
import joblib

loaded_model = joblib.load("model.joblib")

predictions = loaded_model.predict(new_data)
```

Important safety and maintenance notes:

-   Only load model files from trusted sources. Pickle-based formats can
    execute code during loading.
-   Keep the preprocessing pipeline with the model.
-   Record the Scikit-Learn and dependency versions.
-   Record the training data version and feature definitions.
-   Test the loaded model before using it.
-   Retrain and validate when the data distribution or requirements
    change.

A saved model file alone is not a complete production deployment.

------------------------------------------------------------------------

# 20. End-to-End Mini Project: Customer Churn Prediction

This project brings together the main concepts.

## Objective

Predict whether a customer is likely to leave a service based on
historical customer information.

This is a **binary classification** problem.

A typical dataset might contain:

    tenure   monthly_charges contract_type     support_calls churn
  -------- ----------------- --------------- --------------- -------
        12               500 Monthly                       3 Yes
        36               300 Yearly                        0 No
         4               650 Monthly                       5 Yes
        24               400 Yearly                        1 No

The values are illustrative. Use a properly sourced dataset for a real
portfolio project.

## Suggested folder structure

``` text
customer-churn/
    data/
        customers.csv
    models/
    reports/
    src/
        train.py
        predict.py
    requirements.txt
    README.md
```

## Step 1: Install dependencies

``` bash
python -m pip install pandas scikit-learn joblib
```

## Step 2: Load and inspect the data

``` python
import pandas as pd

df = pd.read_csv("data/customers.csv")

print(df.head())
print(df.info())
print(df.isna().sum())
print(df["churn"].value_counts())
```

Understand what each column means and whether any columns would reveal
information that is only available after the customer has already
churned.

## Step 3: Separate features and target

``` python
X = df.drop(columns=["churn"])
y = df["churn"]
```

## Step 4: Split the data

``` python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

For a real churn dataset, consider whether a time-based split is more
realistic than a random split.

## Step 5: Build preprocessing and model pipelines

``` python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

numeric_features = ["tenure", "monthly_charges", "support_calls"]
categorical_features = ["contract_type"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000))
])
```

The column names must match your actual dataset. Add or remove features
based on the data you have.

## Step 6: Train the model

``` python
model.fit(X_train, y_train)
```

## Step 7: Evaluate it

``` python
from sklearn.metrics import classification_report, confusion_matrix

predictions = model.predict(X_test)

print(confusion_matrix(y_test, predictions))
print(classification_report(y_test, predictions))
```

Do not report accuracy alone, especially if churn is uncommon. Decide
whether false positives or false negatives are more costly to the
business.

## Step 8: Save the pipeline

``` python
import joblib

joblib.dump(model, "models/churn_pipeline.joblib")
```

## Step 9: Write a project report

Your README should explain:

-   The business problem.
-   Dataset source and license.
-   Meaning of each feature.
-   Cleaning and preprocessing steps.
-   Train/test strategy.
-   Baseline and final model.
-   Evaluation metrics.
-   Limitations and potential bias.
-   How to install and run the project.

## Project extensions

-   Compare Logistic Regression, Random Forest, and other suitable
    models.
-   Use cross-validation and hyperparameter tuning.
-   Inspect precision-recall trade-offs.
-   Choose a decision threshold based on business costs.
-   Calibrate predicted probabilities if probability quality matters.
-   Create a small API to serve predictions.
-   Monitor model performance and data drift after deployment.

------------------------------------------------------------------------

# 21. Common Beginner Mistakes

## Mistake 1: Training and testing on the same data

This measures how well the model remembers its training examples, not
how well it generalizes.

**Fix:** Keep an independent test set.

## Mistake 2: Preprocessing before splitting

If you calculate scaling values, imputation values, or feature-selection
decisions using all data, information from the test set can leak into
training.

**Fix:** Put preprocessing inside a Pipeline and fit it only on training
data.

## Mistake 3: Using accuracy for every classification problem

Accuracy can hide poor performance on rare classes.

**Fix:** Review precision, recall, F1-score, confusion matrix, and
precision-recall curves where appropriate.

## Mistake 4: Ignoring class imbalance

A model may learn to favor the majority class.

**Fix:** Inspect class distribution, use suitable metrics, and consider
class weights or resampling within the training process. Never resample
the test set to make the evaluation look better.

## Mistake 5: Tuning on the test set

Repeatedly checking test performance while making decisions turns the
test set into a validation set.

**Fix:** Use cross-validation or a separate validation set for model
selection.

## Mistake 6: Assuming a high score means a good model

A high score can result from leakage, duplicates across splits, an
unrepresentative dataset, or an unsuitable metric.

**Fix:** Audit the split, data collection process, target definition,
and evaluation design.

## Mistake 7: Ignoring a simple baseline

A complicated model is not automatically better.

**Fix:** Compare against simple baselines such as predicting the mean
for regression or the most frequent class for classification.

## Mistake 8: Treating feature importance as causation

A model may use a feature to make predictions, but this does not mean
changing that feature would cause the target to change.

**Fix:** Separate prediction from causal claims.

------------------------------------------------------------------------

# 22. Professional Machine-Learning Practices

A professional workflow should include more than model training.

## Problem definition

-   Define exactly what is being predicted.
-   Define when the prediction will be made.
-   Identify who will use it.
-   Identify the cost of different errors.
-   Decide what success means before training.

## Data quality and governance

-   Record where data came from.
-   Check permissions and licensing.
-   Protect personal and sensitive information.
-   Look for sampling bias and missing populations.
-   Document transformations and assumptions.

## Reproducibility

-   Set random seeds where appropriate.
-   Record package versions.
-   Keep data and code versions.
-   Use clear project structure.
-   Save experiment configurations and evaluation results.

## Evaluation

-   Use a split that reflects real-world use.
-   Prevent leakage.
-   Compare against a baseline.
-   Choose metrics based on the problem.
-   Report uncertainty and limitations where possible.

## Deployment and monitoring

-   Validate incoming data.
-   Handle invalid or unexpected inputs.
-   Monitor prediction quality when labels become available.
-   Watch for data drift and changing relationships.
-   Have a plan for rollback and retraining.
-   Monitor latency, resource use, and failures.

## Ethics and responsible use

-   Consider whether the data represents the people affected.
-   Evaluate performance across relevant groups where appropriate and
    lawful.
-   Avoid using sensitive features without a legitimate basis and
    careful review.
-   Explain limitations to decision-makers.
-   Provide human oversight for consequential decisions.
-   Do not use a model as the sole basis for high-impact decisions
    without appropriate governance.

------------------------------------------------------------------------

# 23. Practice Exercises

## Beginner

1.  Load the Iris dataset.
2.  Split it into training and testing sets.
3.  Train a KNN classifier.
4.  Print its accuracy.
5.  Train a Linear Regression model on a small numerical dataset.
6.  Explain the difference between features and target.

## Intermediate

1.  Train Logistic Regression and a Decision Tree on the same dataset.
2.  Compare their precision, recall, and F1-score.
3.  Scale features using a Pipeline.
4.  Handle missing values with `SimpleImputer`.
5.  Use `cross_val_score()` to evaluate a model.
6.  Use `GridSearchCV` to tune a model.

## Advanced

1.  Build a `ColumnTransformer` for mixed numerical and categorical
    data.
2.  Compare a simple baseline with multiple models.
3.  Investigate class imbalance and threshold selection.
4.  Use permutation importance to investigate model behavior.
5.  Create a reproducible training script.
6.  Save a complete preprocessing-and-model pipeline.
7.  Write a model card or technical report describing intended use and
    limitations.

------------------------------------------------------------------------

# 24. Essential Scikit-Learn Commands

  Task                     Common tool
  ------------------------ ---------------------------
  Load built-in datasets   `sklearn.datasets`
  Split data               `train_test_split()`
  Train a model            `model.fit(X, y)`
  Make predictions         `model.predict(X)`
  Predict probabilities    `model.predict_proba(X)`
  Scale numerical data     `StandardScaler()`
  Normalize ranges         `MinMaxScaler()`
  Fill missing values      `SimpleImputer()`
  Encode categories        `OneHotEncoder()`
  Combine preprocessing    `ColumnTransformer()`
  Chain transformations    `Pipeline()`
  Evaluate accuracy        `accuracy_score()`
  Evaluate regression      `mean_absolute_error()`
  Classification report    `classification_report()`
  Confusion matrix         `confusion_matrix()`
  Cross-validation         `cross_val_score()`
  Grid search              `GridSearchCV()`
  Randomized search        `RandomizedSearchCV()`
  Cluster data             `KMeans()`
  Save model               `joblib.dump()`
  Load model               `joblib.load()`

------------------------------------------------------------------------

# 25. Official Documentation and Further Learning

The official documentation is the most reliable reference for current
APIs, parameter options, and examples.

-   Scikit-Learn main documentation: https://scikit-learn.org/stable/
-   Getting started:
    https://scikit-learn.org/stable/getting_started.html
-   User guide: https://scikit-learn.org/stable/user_guide.html
-   Supervised learning:
    https://scikit-learn.org/stable/supervised_learning.html
-   Unsupervised learning:
    https://scikit-learn.org/stable/unsupervised_learning.html
-   Model selection and evaluation:
    https://scikit-learn.org/stable/model_selection.html
-   Preprocessing data:
    https://scikit-learn.org/stable/modules/preprocessing.html
-   Pipelines and composite estimators:
    https://scikit-learn.org/stable/modules/compose.html
-   Metrics:
    https://scikit-learn.org/stable/modules/model_evaluation.html
-   Common pitfalls:
    https://scikit-learn.org/stable/common_pitfalls.html
-   NumPy documentation: https://numpy.org/doc/
-   Pandas documentation: https://pandas.pydata.org/docs/

------------------------------------------------------------------------

# Final Advice

A professional machine-learning practitioner is not someone who can
import the largest number of algorithms. It is someone who can define a
useful problem, understand the data, build a valid evaluation process,
select an appropriate model, and explain what the results do and do not
mean.

Start with simple models. Understand every step. Build a reliable
baseline before trying advanced algorithms. Keep the test set honest,
prevent data leakage, and document your decisions.

**The real skill is not making a model fit the data. It is building a
model that can be trusted to work on data it has never seen.**
