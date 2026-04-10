# Signal / Algorithm Engineer Interview Guide (English)

> 🌐 **Language:** English｜[繁體中文版（完整）](interview.md)
>
> This is a condensed English version of the interviewer guide. For the full evaluation rubric, BARS scale, reference answers, and scripted responses, see [interview.md](interview.md).

**Position:** Signal Processing / Algorithm Engineer (Mid, 2–5 years)
**Format:** Live coding, all AI tools allowed
**Total time:** 90 minutes (Task 1 · 30 min｜Task 2 · 40 min｜Task 3 · 15 min｜Buffer · 5 min)

---

## What we're looking for

**Critical Thinking (CT) is the meta-skill** — scored independently across all tasks. Each task has a built-in trap testing whether the candidate questions the premise, not whether they can solve the problem.

### Must-haves (minimum BARS 3 to hire)
1. **AI collaboration judgment** — knows when to use AI, when to question it
2. **Problem decomposition** — breaks fuzzy requirements into verifiable steps
3. **Debugging** — traces symptoms to root causes across layers
4. **Signal processing fundamentals** — filter, FFT, peak detection

### Important (tie-breakers)
5. Fast learning / iteration
6. Algorithm verification
7. Embedded engineering awareness

---

## Opening script (read this to the candidate)

> "Hi, thanks so much for coming in today. Before we start, I want to go over a few things so you feel comfortable.
>
> **About the interviewers:** You might see more than one of us today — we have folks with different areas of expertise, so different people may jump in to ask questions. That's completely normal, doesn't mean you're doing anything wrong. Just think of us as your colleagues for the next 90 minutes.
>
> **About the vibe:** Honestly, we want you to relax and even enjoy this if you can. This isn't a trick interview — no gotchas, no leetcode hards. What we're really trying to figure out is pretty simple: would we enjoy working with you? So *how* you think and interact with us matters just as much as the answers, maybe more. If you need water, a break, or the bathroom at any point, just say so.
>
> **AI tools:** All AI tools are welcome. ChatGPT, Claude, Copilot, Cursor — whatever you'd normally use. We don't care *whether* you use AI, we care about *how* you use it. Pasting whole files into Claude is totally fine.
>
> **Three quick asks before we dive in:**
>
> 1. **Talk out loud as you work.** We care about your thinking, not just your final answer. Tell us what you're reading, why, what you're trying, where you're stuck. If you go silent and code for 20 minutes, it honestly hurts you more than it helps — we can't tell what you're thinking.
>
> 2. **Some of the questions are intentionally fuzzy.** Real-world requirements always are, and we want to see how you handle it. When you hit a fuzzy bit, please say so, make a reasonable assumption, explain your assumption out loud, and keep going. We're totally fine if your assumption is different from what we had in mind — what matters is that you made one and can explain why. Please don't freeze on 'the question isn't clear.'
>
> 3. **If you don't know something, just look it up or ask the AI.** No penalty. Guessing blindly looks worse than checking.
>
> **The plan:** Three tasks — a 30-minute coding task, a 40-minute data analysis task, and a 15-minute verbal design discussion. Each task has a README with setup instructions. After each one I'll ask you a few follow-up questions.
>
> Any questions before we start? Otherwise, let's dive in."

---

## Three cross-task behavioral signals

These apply to every task.

### 1. Think out loud
- **Why it matters:** We can't evaluate thinking we can't see.
- **Friendly reminder at 5 min silence:** *"Mind walking me through what you're thinking? I want to understand your approach."*
- **If still silent after 2 reminders:** Note as "unable to evaluate reasoning" — caps Problem Decomposition at 3.

### 2. Handling ambiguity
- **Ideal:** Spots fuzzy bit → makes assumption → says it out loud → proceeds.
- **Acceptable:** Asks interviewer to clarify, then proceeds.
- **Red flag:** Repeatedly complains the question is unclear but doesn't define scope themselves.
- **Key principle:** *What* assumption they make doesn't matter — whether they made one consciously and explained it does.

### 3. Resourcefulness
- **Ideal:** Doesn't know X → looks it up / asks AI → explains what they found.
- **Principle:** "I don't know but I can find out" ≈ "I know."
- **Red flag:** Blind guessing or freezing on unknowns.

**None of these "friendly reminders" count as scored interventions.**

---

## Task 1 — Overengineered Codebase (30 min)

### Prompt to read
> "The coach wants to know which reps were too fast. Without breaking the existing `count()` interface, please add `detect_fast_reps()` that returns whether each rep was below 800ms."

### The traps (interviewer-only)
1. **Premise trap:** Is "too fast" a fixed 800ms, or relative to *this user's* baseline? Implementing 800ms is fine, but candidates who never question it will ship bad products.
2. **Architecture trap:** The existing codebase is overengineered (double smoothing, adaptive threshold in a pure Python loop, pointless cache, 4 dataclasses wrapping what's basically peak-finding). Strong CT candidates ask: *"Should I add to this, or should we first talk about whether this architecture makes sense?"*

### What to watch for
| Behavior | Competency | BARS |
|---|---|---|
| Asks where 800ms comes from | CT | 4-5 |
| Points out codebase is overengineered (even if they still add the feature) | CT + Signal Processing | 4-5 |
| Asks AI "is this code overengineered?" not "help me add a feature" | AI collab | 4-5 |
| Pastes AI output without reviewing | AI collab | Red flag → cap at 2 |
| Notices double smoothing or unnecessary adaptive threshold | Signal processing | 4-5 |

### Interventions
| When | Trigger | Script |
|---|---|---|
| 5 min | Stuck but silent | *"What do you think of this codebase's complexity?"* (caps CT at 4) |
| 15 min | Implementing without questioning 800ms | *"What's your take on the 800ms number?"* (caps CT at 4) |
| 20 min | Totally stuck | *"Feel free to ignore the existing architecture — just implement it the simplest way."* (caps problem decomposition at 4) |

### Common responses
- **Candidate asks "does 800ms have to be fixed?":** *"Great question — what would you do if not? But let's first implement with 800ms, and you can think about improvements as you go."* (Note as CT 4-5.)
- **Candidate asks "should I rewrite this?":** *"You can do whatever you want as long as you don't break the `count()` interface."*
- **Candidate is hand-writing everything:** *"Friendly reminder — you can use AI tools to speed up, won't affect your score."*

### Red flag
Silently builds the feature and hands it in, never asks a single question about the requirements or architecture.

---

## Task 2 — Dataset Analysis (40 min)

### Prompt to read
> "We have 7 days of sleep and activity data from smart ring users (CSV). The PM says their initial analysis shows 'more exercise → better sleep that night' and wants to ship this as a feature. Please verify this and tell me what you find. All AI tools allowed."

### The traps (interviewer-only)

**Raw correlation:** r ≈ 0.54 (looks meaningful).
**After correct pairing + removing artifacts:** r ≈ 0 (PM's conclusion doesn't hold).

Three data problems:
1. **Temporal misalignment (medium difficulty):** `sleep_score` is measured when the user *wakes up* (stated in README). So `sleep_score` on Jan 8 is actually the sleep from the night of Jan 7→8. The PM's "exercise today → sleep tonight" hypothesis requires pairing `steps[Jan 8]` with `sleep[Jan 9]`, not same-day. Naive same-day analysis reverses causality.
2. **Motion artifacts (easy):** 3 users have days with `steps > 50,000` — impossible, these are sensor artifacts paired with high sleep scores, inflating correlation.
3. **Sample size (hard):** Only 12 users × 7 days — no statistical power.

**Deeper trap:** PM says "initial analysis shows." Strong CT candidates ask *how* the PM ran that analysis.

### What to watch for
| Behavior | Competency | BARS |
|---|---|---|
| Starts with EDA (`df.describe()`, etc.) instead of jumping to correlation | CT | 4-5 |
| Spots temporal misalignment from the README clue | CT | 4-5 |
| Questions sample size | CT | 5 |
| Asks "how did the PM run the initial analysis?" | CT | 5 |
| Asks AI for data quality check before analysis | AI collab | 4-5 |
| Finds outliers and asks *why* instead of just deleting | Debug | 4 |

### Mandatory pressure test at 20 min
> "The PM wants to ship this next week. What would you tell them?"

Tests whether they stand by their findings under pressure.

### Interventions
| When | Trigger | Script |
|---|---|---|
| 5 min | Doesn't know where to start | *"Have you looked at the basic statistics of the data yet?"* |
| 15 min | Ran correlation but didn't check data quality | *"How confident are you in this dataset's quality?"* |
| 20 min | **Mandatory** | *"PM wants to ship this next week. What's your response?"* |

### Common responses
- **"What does PM mean by 'exercise'?":** *"Not specified — please make a reasonable assumption and explain it. You can try both steps and active_minutes if you have time."*
- **"What's a good sleep score?":** *"How would you define it? Make an assumption and go."*
- **Candidate is hand-coding EDA:** *"Friendly reminder — let AI do the EDA so you can focus on the findings."*

### Red flag
Runs `corr()`, gets 0.6, says "positive correlation confirmed," ships it. No quality checks, no sample size concerns.

---

## Task 3 — Verbal System Design (15 min)

### Prompt to read
> "Our smart ring SDK is integrating with a third-party health app. Their engineer says they want every detected rep pushed to their server in real time via webhook. Please design this integration."

### The trap (interviewer-only)

**The question deliberately doesn't say where the webhook originates from.** The other engineer implicitly assumes "rep detected" can directly trigger an HTTP request — but they haven't thought about *where* the rep is detected.

**Full data flow:**
```
Ring detects rep ──BLE──→ Phone SDK ──network──→ Your Server ──webhook──→ Third-party
                   ↑              ↑                    ↑
                BLE drops      may be offline      server-to-server, fine
```

**Core insight:** The webhook *itself* is fine in the server-to-server hop (with retry queue, it's a standard reliable webhook). The real problem is the front half — ring → phone → your server — which has BLE drops, offline phones, and battery drain if you push every rep immediately.

Strong CT candidates ask: *"Where is the rep detected? Who sends the webhook?"*

### Scoring principle: direction > terminology
This position is Signal/Algorithm Engineer, not System Architect. Terms like "buffer," "batch sync," "exponential backoff" are nice-to-have. A candidate saying "store them first, send when there's network" gets 3-4. Saying it with the correct jargon gets 4-5. **Never penalize for not knowing a term.**

### What to watch for
| Behavior | Competency | BARS |
|---|---|---|
| Asks "where is rep detected? who sends the webhook?" | CT | 5 |
| Draws the full data flow (ring → phone → server → third-party) | CT | 5 |
| Mentions battery / offline / push frequency (terminology optional) | Embedded | 3-4 |
| Proposes "store and batch" without using the word "buffer" | Problem decomposition | 3-4 |
| Gives specific parameters (e.g., "send every 5 seconds," "cap at 1000 records") | Problem decomposition | 4-5 |
| Asks "does the third party need real-time or complete data?" | CT | 4-5 |

### Interventions
| When | Trigger | Script |
|---|---|---|
| 5 min | Designing server-to-server webhook without questioning | *"The ring connects to the phone via BLE — does that affect your design?"* (caps CT at 4) |
| 8 min | **Mandatory** | *"If the user's phone is offline for a while, how does your design handle it?"* |

### Task 3 is verbal — break silence after 1 minute
There's no code to observe, so long silences leave nothing to evaluate. If they pause for more than a minute, ask: *"Mind sharing what you're thinking? Even half-formed thoughts are fine."*

### Follow-up: distinguishing 3 from 4 (when candidate is vague)
- "Store them first" → *"Where? On the phone or the ring?"* (4 if they say phone)
- "Don't send all at once" → *"How often do you send them? How do you decide?"* (4 if they give a specific strategy)
- "There's a limit" → *"What happens when it's full? Drop oldest or stop collecting?"* (4 if there's a trade-off explained)
- "Handle disconnects" → *"After reconnecting, how do you know which ones haven't been sent?"* (4 if they have an idea)

### Red flag
Immediately starts designing webhook endpoints (auth, retry, rate limits) without ever asking where the rep is detected or how data gets from the ring to the server.

---

## Red flags (any of these caps the relevant competency at BARS 2)

- **AI collab:** Pastes AI output without reviewing; never questions AI-generated complex solutions
- **Problem decomposition:** Can't explain their approach in steps; stuck but can't articulate where
- **Debug:** Found a problem but can't explain why it's a problem; pasted whole code into AI without evaluation
- **Knowledge floor:** Can't explain the physical meaning of any signal parameter; completely misses the webhook architecture problem in Task 3
- **Over-reliance on AI:** Lets AI override their own correct initial judgment (observed from recent real interviews — a candidate had the right approach but handed control to AI and shipped a worse solution)

---

## Post-interview

Fill out the scorecard within 10 minutes of ending:

1. **One score per competency** (CT + 7 job competencies, 1-5)
2. **Evidence for each score** — quote what the candidate said or did (not "felt thoughtful")
3. **Red flags triggered** (if any)
4. **Overall recommendation:** strong hire / hire / borderline / no hire

Bad example: *"CT: 4. Candidate was very thoughtful."*
Good example: *"CT: 4. At 8 min spontaneously asked 'does 800ms have to be fixed? Users move at different paces.' Later used AI to verify adaptive threshold feasibility before making a trade-off."*

If multiple interviewers, each scores independently first, then calibrate in discussion. Don't influence each other's initial scores.

---

*Version: v4.1 (condensed English) · Full rubric in [interview.md](interview.md)*
