# while

The `while` keyword repeats a block of code **as long as a condition stays `True`**.

```python
count = 3

while count > 0:
    print(count)
    count -= 1

print("Liftoff!")
```

Output:

```
3
2
1
Liftoff!
```

## Avoid infinite loops

If the condition never becomes `False`, the loop never ends. Here the loop forgets to change `count`:

```python
count = 3
while count > 0:
    print(count)     # prints 3 forever
```

If this happens, press `Ctrl+C` in the terminal to stop the program.

## break and continue

```python
while True:                  # runs forever...
    answer = input("Type 'quit' to stop: ")
    if answer == "quit":
        break                # ...until break exits the loop
    if answer == "":
        continue             # skip to the next round
    print("You typed:", answer)
```

| Keyword | Effect |
|---|---|
| `break` | Leaves the loop immediately |
| `continue` | Skips the rest of this round and starts the next |

## while vs for

Use `for` when you know what you're looping over (a list, a range). Use `while` when you don't know in advance how many rounds you need, such as waiting for valid input.
