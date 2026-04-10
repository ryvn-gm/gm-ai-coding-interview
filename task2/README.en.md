# Task 2 — Data Analysis & Validation

> 🌐 **Language:** English｜[繁體中文版](README.md)

## Background

Our smart ring tracks daily activity and sleep quality for our users. This is an export from the backend — 12 users over 7 days.

## The task

The PM said a quick analysis showed *"the more people exercise, the better they sleep that night,"* and they want to ship this as a product feature.

Please verify this claim and tell the interviewer what you find.

## About the data

File: `sleep_exercise.csv`

| Column | Type | Description |
|--------|------|-------------|
| `user_id` | string | User ID (U001 ~ U012) |
| `date` | date | Record date (2024-01-08 ~ 2024-01-14) |
| `steps` | int | Daily step count, raw from the ring's accelerometer |
| `active_minutes` | int | Daily active minutes, derived by an algorithm from accelerometer data |
| `sleep_score` | float | Sleep quality score (0–100), measured by the ring when the user wakes up and recorded against that day |

84 rows in total (12 users × 7 days).

## Environment

- Language: Python
- Available packages: pandas, numpy, scipy, matplotlib — plus anything else you'd like
- All AI tools are welcome — use whatever you'd normally reach for

## A few quick reminders

(See [welcome.en.md](../welcome.en.md) for the longer version.)

- **Talk us through your thinking.** Tell us what you're noticing, what you suspect, what you're about to try. "I want to see the distribution before I run any correlation" is exactly the kind of thing we love hearing.
- **If something's unclear, make an assumption.** Something like "I'm going to assume by 'exercise' the PM meant `steps`, but I'll try `active_minutes` too if I have time" is great — just say it and move on. Don't get stuck on definitions.
- **Don't know something? Look it up.** Pandas not your strongest suit? Stats a bit rusty? Ask the AI or check the docs — no penalty whatsoever.

Good luck — and try to have a bit of fun with it!
