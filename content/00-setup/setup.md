# Python Setup Guide for Beginners
### Installing and Setting Up Python on Windows, macOS and Linux

Welcome! This guide will help you install Python on your computer, configure it properly, and run your first Python program.

You do not need any prior programming experience to follow this guide.

---

## 1. What is Python?

Python is a popular, beginner-friendly programming language used in:

- Web Development
- Artificial Intelligence and Machine Learning
- Data Science and Data Analysis
- Automation and Scripting
- Cybersecurity
- Software Development

Before writing Python programs, we need to install Python on our computer.

## 2. What Do You Need?

You only need two things:

1. **Python:** The programming language interpreter that executes your Python code.
2. **A Code Editor:** A software application where you can write and manage your code.

We will use **Visual Studio Code (VS Code)** as our code editor.

Download links:

- Python: https://www.python.org/downloads/
- Visual Studio Code: https://code.visualstudio.com/

---

# 3. Installing Python on Windows

Follow these steps if you are using Windows 10 or Windows 11.

### Step 1: Download Python

1. Open your browser.
2. Visit https://www.python.org/downloads/
3. Click on the download option for Windows.
4. Download the recommended Python installer or install manager.

Make sure you download Python 3, not Python 2.

### Step 2: Install Python

1. Open the downloaded installer.
2. Follow the installation instructions.
3. If you are using the traditional Windows installer, enable the **Add Python to PATH** option if it is displayed.
4. Click on Install and wait for the installation to complete.

**Important:** Adding Python to PATH allows you to run Python commands directly from the terminal without specifying its complete installation location.

### Step 3: Verify Python Installation

Now, let's check whether Python has been installed successfully.

1. Press `Win + R`.
2. Type `cmd` and press Enter.
3. A Command Prompt window will open.
4. Type the following command:

```bash
python --version
```

Alternatively, try:

```bash
py --version
```

If Python is installed correctly, you should see something similar to:

```text
Python 3.x.x
```

The exact version number may differ.

### Step 4: Check pip Installation

PIP is Python's package manager. It allows you to install additional libraries and packages.

Run:

```bash
py -m pip --version
```

If it displays a version number, pip is ready to use.

If you used a Python installation that supports the `python` command instead, you can also run:

```bash
python -m pip --version
```

**Congratulations! Python is now installed on Windows.**

---

# 4. Installing Python on macOS

Follow these steps if you are using a MacBook or an iMac.

### Step 1: Download Python

1. Open your browser.
2. Visit https://www.python.org/downloads/macos/
3. Download the latest recommended Python 3 installer for macOS.

### Step 2: Install Python

1. Open the downloaded `.pkg` file.
2. Follow the installation instructions.
3. Agree to the terms and complete the installation.

You can now use Python from the macOS Terminal.

### Step 3: Open Terminal

There are multiple ways to open Terminal:

- Press `Command + Space` to open Spotlight Search.
- Type `Terminal`.
- Press Enter.

### Step 4: Verify Python Installation

In the Terminal, type:

```bash
python3 --version
```

You should see an output similar to:

```text
Python 3.x.x
```

### Step 5: Check pip Installation

Run:

```bash
python3 -m pip --version
```

If a version number appears, pip is installed successfully.

**Note:** macOS may have system-managed Python components. Do not try to replace or modify those. Use the separately installed Python 3 for your programming projects.

**Congratulations! Python is now installed on macOS.**

---

# 5. Installing Python on Linux

Most Linux distributions either come with Python pre-installed or provide it through their package managers.

We will cover Ubuntu/Debian, Fedora and Arch Linux.

### Step 1: Open Terminal

Use the keyboard shortcut:

```text
Ctrl + Alt + T
```

This usually opens the Terminal in Linux distributions.

### Step 2: Install Python

**For Ubuntu / Debian:**

First, update your package list:

```bash
sudo apt update
```

Now install Python and the required tools:

```bash
sudo apt install python3 python3-pip python3-venv
```

**For Fedora:**

```bash
sudo dnf install python3 python3-pip
```

**For Arch Linux:**

```bash
sudo pacman -S python python-pip
```

These commands may ask for your administrator password.

### Step 3: Verify Python Installation

Run:

```bash
python3 --version
```

You should see something similar to:

```text
Python 3.x.x
```

### Step 4: Verify pip Installation

Run:

```bash
python3 -m pip --version
```

If a version number appears, pip is installed.

**Congratulations! Python is now installed on Linux.**

---

# 6. Installing Visual Studio Code (VS Code)

Now that Python is installed, let's set up a code editor.

We will use Visual Studio Code because it is lightweight, beginner-friendly and supports Python development.

### Step 1: Download VS Code

Visit:

https://code.visualstudio.com/

Download the version suitable for your operating system.

Install it by following the instructions.

### Step 2: Install the Python Extension

1. Open Visual Studio Code.
2. Look for the Extensions icon on the left sidebar.
3. Alternatively, press `Ctrl + Shift + X` (Windows/Linux) or `Cmd + Shift + X` (macOS).
4. Search for **Python**.
5. Install the official Python extension published by Microsoft.

This extension provides Python support, code completion, debugging and other useful features.

### Step 3: Select Python Interpreter

1. Open VS Code.
2. Press `Ctrl + Shift + P` on Windows/Linux or `Cmd + Shift + P` on macOS.
3. Search for `Python: Select Interpreter`.
4. Select the Python 3 installation you just installed.

If you do not see an interpreter, make sure Python is installed and restart VS Code.

---

# 7. Writing Your First Python Program

Let's write our first Python program!

### Step 1: Create a Project Folder

Create a new folder anywhere on your computer.

For example:

```text
Python-Practice
```

### Step 2: Open the Folder in VS Code

1. Open VS Code.
2. Click on File → Open Folder.
3. Select the `Python-Practice` folder.

### Step 3: Create a Python File

1. Click on New File.
2. Name the file:

```text
hello.py
```

The `.py` extension indicates that this is a Python file.

### Step 4: Write Your First Program

Copy and paste the following code:

```python
print("Hello, World!")
print("Welcome to Python Programming!")
```

### Step 5: Run Your Program

Open the VS Code terminal:

- Windows/Linux: `Ctrl + ``
- macOS: `Control + ``

Alternatively, select Terminal → New Terminal from the menu.

Navigate to the folder containing your file if necessary, and execute:

**Windows:**

```bash
py hello.py
```

You can also use:

```bash
python hello.py
```

**macOS / Linux:**

```bash
python3 hello.py
```

You should get the following output:

```text
Hello, World!
Welcome to Python Programming!
```

That's it! You have successfully written and executed your first Python program.

---

# 8. Understanding pip (Python Package Manager)

PIP is a tool that helps you install external Python libraries.

For example, if you want to work with data analysis, you might need a library called NumPy.

You can install it using:

**Windows:**

```bash
py -m pip install numpy
```

**macOS / Linux:**

```bash
python3 -m pip install numpy
```

To check the installed packages:

```bash
python -m pip list
```

On macOS and Linux, you may need to use `python3` instead of `python`.

To upgrade pip:

```bash
python -m pip install --upgrade pip
```

Again, use `python3` on systems where that is the correct command.

### A Few Useful pip Commands

| Command | Purpose |
|---|---|
| `python -m pip install numpy` | Install a package |
| `python -m pip uninstall numpy` | Uninstall a package |
| `python -m pip list` | View installed packages |
| `python -m pip show numpy` | View package information |
| `python -m pip --version` | Check pip version |

---

# 9. (Optional) Setting Up a Virtual Environment

When working on multiple Python projects, it is good practice to create a separate virtual environment for each project.

A virtual environment keeps the packages required by one project separate from other projects.

To create one, first open your project folder in the terminal.

Run:

**Windows:**

```bash
py -m venv .venv
```

Activate it using:

```bash
.venv\Scripts\activate
```

**macOS / Linux:**

```bash
python3 -m venv .venv
```

Activate it using:

```bash
source .venv/bin/activate
```

Once activated, you can install packages inside that environment.

For example:

```bash
python -m pip install numpy
```

To deactivate the environment:

```bash
deactivate
```

You do not need to understand virtual environments immediately. You can learn more about them as you start building Python projects.

---

# 10. Common Errors and Their Solutions

Here are some common problems beginners might encounter.

### Problem 1: 'Python is not recognized as an internal or external command'

**Reason:** Python may not have been added to your system PATH, or your terminal is not detecting the installation.

**Solution:**

- Restart Command Prompt or PowerShell.
- Try running `py --version`.
- If Python is still not detected, check your Python installation and PATH configuration.

### Problem 2: `python3: command not found`

**Reason:** Python 3 may not be installed or may not be available through your system PATH.

**Solution:**

On Ubuntu/Debian, run:

```bash
sudo apt update
sudo apt install python3
```

For other Linux distributions, use their respective package managers.

### Problem 3: `pip: command not found`

**Reason:** pip might not be installed or its command may not be available directly.

**Solution:**

Try using:

```bash
python -m pip --version
```

Or, on macOS/Linux:

```bash
python3 -m pip --version
```

Using `python -m pip` is generally more reliable because it runs pip through the selected Python interpreter.

### Problem 4: VS Code is not detecting Python

**Solution:**

1. Open VS Code.
2. Press `Ctrl + Shift + P` or `Cmd + Shift + P` on macOS.
3. Search for `Python: Select Interpreter`.
4. Select the correct Python installation.
5. Restart VS Code if necessary.

---

# 11. Useful Resources

Here are some official resources that will help you learn more.

| Resource | Link |
|---|---|
| Python Official Website | https://www.python.org/ |
| Python Downloads | https://www.python.org/downloads/ |
| Python Documentation | https://docs.python.org/3/ |
| Python Beginner's Guide | https://wiki.python.org/moin/BeginnersGuide |
| VS Code Download | https://code.visualstudio.com/ |
| VS Code Python Tutorial | https://code.visualstudio.com/docs/python/python-tutorial |

---

# 12. Final Checklist

Before you start learning Python, make sure you have completed the following:

- [ ] Installed Python 3.
- [ ] Verified Python installation using the terminal.
- [ ] Verified pip installation.
- [ ] Installed Visual Studio Code.
- [ ] Installed the Python extension in VS Code.
- [ ] Selected the correct Python interpreter.
- [ ] Created your first `.py` file.
- [ ] Successfully executed your first Python program.

**You're all set! Happy Coding! 🐍**

Remember, you don't need to learn everything at once. Start with the basics, practise regularly, and gradually move towards building projects.

