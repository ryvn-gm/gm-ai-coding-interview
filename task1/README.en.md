# Task 1 — Add a Feature to an Existing Codebase

> 🌐 **Language:** English｜[繁體中文版](README.md)

Welcome! In this task, you'll be adding a new feature to a small Python codebase that's already up and running.

## What you have

- `rep_counter.py` — a workout rep counter that already works

## The task

The coach wants to know which reps were "too fast." Without breaking the existing `count()` interface, please add `detect_fast_reps()` that returns whether each rep was below 800ms.

The full function signature and an example are in the TODO block at the bottom of `rep_counter.py`.

## Quick start

You can generate a test signal like this (5 seconds of arm motion at 100Hz, with a bit of noise):

```python
import numpy as np
np.random.seed(0)
fs = 100.0
t = np.arange(0, 5, 1/fs)
signal = np.sin(2 * np.pi * 1.5 * t) + 0.3 * np.random.randn(len(t))
```

The existing `count()` should work straight out of the box:

```python
from rep_counter import RepCounter
rc = RepCounter()
result = rc.count(signal, fs=100.0)
print(f"Detected {result.count} reps at positions {result.peak_indices}")
```

Feel free to tweak the signal parameters and try different scenarios — that's actually encouraged.

## Environment

- Language: Python
- Required packages: numpy, scipy
- All AI tools are welcome — use whatever you'd normally reach for

## A few quick reminders

(See [welcome.en.md](../welcome.en.md) for the longer version.)

- **Talk us through your thinking.** Tell us what you're reading, why, what you plan to do, where you're stuck. Coding silently for 20 minutes makes it really hard for us to evaluate you fairly.
- **If something's unclear, make an assumption and keep going.** Something like "I'll assume the sampling rate is fixed at 100Hz" is totally fine — just say it out loud, then move on. Don't get stuck.
- **Don't know something? Look it up or ask the AI.** This won't count against you. Guessing blindly is worse than checking.

Good luck — and try to have a bit of fun with it!
