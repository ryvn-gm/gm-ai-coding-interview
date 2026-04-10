# Signal / Algorithm Engineer Interview Guide (English)

> 🌐 **Language:** English｜[繁體中文版](interview.md)

**Position:** Signal Processing / Algorithm Engineer (Mid, 2–5 years)
**Format:** Live coding, all AI tools allowed
**Total time:** 90 minutes (Task 1 · 30 min｜Task 2 · 40 min｜Task 3 · 15 min｜Buffer · 5 min)

---

## Interviewer Cheat Sheet (read this 5 min before the interview)

**Core signals to watch for:**

1. **CT** — Does the candidate question premises? Do they speak up when something looks off?
2. **AI collaboration judgment** — Is the AI in the driver's seat, or is the candidate?
3. **Think out loud** — Are they narrating their reasoning?
4. **Handling ambiguity** — When the task is fuzzy, do they define their own scope and move on?

**Three must-dos:**

- ✅ Read the full opening script (especially the "vibe" and "three asks")
- ✅ Mandatory pressure test at Task 2 minute 20
- ✅ Mandatory offline-scenario question at Task 3 minute 8

**Three intervention timings:**

| Task | First intervention | Mandatory pressure test |
|------|-------------------|------------------------|
| Task 1 | 5 min if stuck or not questioning | None |
| Task 2 | 5 min if stuck / 15 min if no data quality check | Minute 20 |
| Task 3 | Minute 5 if not questioning the webhook premise | Minute 8 |

**Three red flags (cap the relevant competency at BARS 2):**

- Pastes entire code into AI without reviewing output
- Repeatedly complains "the question isn't clear" without defining scope themselves
- Silent for more than 15 minutes straight

**The golden rules:**

- **Direction matters, terminology doesn't.** 3+ if the thinking is right.
- **"I don't know but I can find out" ≈ "I know."** Don't penalize for looking things up.
- **Every score needs specific behavioral evidence** — a quote or a concrete action.

---

## What we're looking for

**Critical Thinking (CT) is the meta-skill** — scored independently across all tasks. Each task has a built-in trap that tests whether the candidate questions the premise, not whether they can solve the problem.

### Must-haves (minimum BARS 3 to hire)
1. **AI collaboration judgment** — knows when to use AI, when to question it, when to ignore it
2. **Problem decomposition** — breaks fuzzy requirements into verifiable steps
3. **Debugging** — traces symptoms to root causes across layers
4. **Signal processing fundamentals** — filter, FFT, peak detection principles

### Important (tie-breakers)
5. Fast learning / iteration — ramps up quickly in unfamiliar domains
6. Algorithm verification — doesn't trust results blindly, designs validation
7. Embedded engineering awareness — memory, power, fixed-point trade-offs

### What we want vs. don't want

**Want:**
- AI is a tool, candidate is the decision-maker
- Questions requirements before building
- Stays skeptical of other people's conclusions
- Can use AI to debug but explains root causes themselves
- Finds key problems fast in unfamiliar domains
- Iterates quickly — working version first, optimization later

**Don't want:**
- Takes AI output as truth
- Silently completes tasks without questioning anything
- Validates someone else's conclusion without first questioning it
- Finds problems with AI but can't explain why
- Never touches AI, does everything by hand

---

## BARS scale (1-5 for each competency)

Must-have competencies need a minimum of 3 to hire. Every score needs specific behavioral evidence — quote what the candidate said or did, not "felt thoughtful."

### Critical Thinking (meta-competency, scored per task)

| Score | Behavior |
|-------|---------|
| 1 | Never questions any premise, just executes and hands in |
| 2 | When stuck, flails at the current layer without stepping back |
| 3 | Can question premises when prompted; can articulate one hidden assumption |
| 4 | Actively questions the requirements themselves; identifies unverified assumptions in AI output |
| 5 | Proactively reframes the problem; can say "this conclusion breaks if X"; asks the AI with hypotheses, not requests |

### AI Collaboration Judgment

| Score | Behavior |
|-------|---------|
| 1 | Doesn't use AI at all, OR blindly takes everything AI produces |
| 2 | Uses AI but only does surface checks ("looks right to me") |
| 3 | Can identify at least one problem or limitation in AI output |
| 4 | Queries AI with specific hypotheses; cross-checks the output |
| 5 | Uses AI as a thinking tool; designs validation actively; can clearly explain why they trust or distrust AI output |

### Problem Decomposition

| Score | Behavior |
|-------|---------|
| 1 | Can't break the problem down; attempts a one-shot solution |
| 2 | Breaks into large chunks but the chunks aren't logically connected |
| 3 | Splits the task into 2–3 verifiable steps and executes in order |
| 4 | Each step has clear expected input/output; when stuck, knows exactly which layer is stuck |
| 5 | Precise granularity; adjusts steps dynamically based on intermediate results; defines acceptance criteria proactively |

### Debugging

| Score | Behavior |
|-------|---------|
| 1 | Finds a problem but can't explain why it's a problem |
| 2 | Describes symptoms but only attempts fixes at the current layer |
| 3 | Traces symptom up one layer to find the root cause |
| 4 | Traces root cause across layers; can explain the causal chain |
| 5 | Not only finds the root cause but identifies other places the same class of issue might appear; proposes systemic fixes |

### Signal Processing Fundamentals

| Score | Behavior |
|-------|---------|
| 1 | Can't explain the physical meaning of any signal parameter |
| 2 | Knows the terms (filter, FFT) but can't explain what they actually do |
| 3 | Correctly explains filter / FFT / peak detection basics and when they're appropriate |
| 4 | Can judge whether a specific processing step is necessary (e.g., double smoothing is redundant) |
| 5 | Chooses processing methods based on data characteristics; explains parameter trade-offs |

### Algorithm Verification

| Score | Behavior |
|-------|---------|
| 1 | Blindly trusts results, no verification |
| 2 | Does basic sanity checks (e.g., looks at value ranges) |
| 3 | Designs at least one test case to verify correctness |
| 4 | Designs edge cases and controls; compares expected vs actual proactively |
| 5 | Builds a verification flow; considers statistical significance and data quality impact |

### Embedded Engineering Awareness

| Score | Behavior |
|-------|---------|
| 1 | No consideration of hardware constraints at all |
| 2 | When prompted, can mention memory or power as concerns |
| 3 | Proactively mentions at least one of memory / power / latency trade-offs |
| 4 | Ties specific resource constraints to the design choice |
| 5 | Actively weighs embedded limits in design; proposes specific constraints like fixed-point, buffer size, duty cycle |

### Fast Learning / Iteration

| Score | Behavior |
|-------|---------|
| 1 | Can't make any progress in an unfamiliar domain |
| 2 | Starts trying but direction is unclear; takes too long |
| 3 | Quickly finds key information and produces an initial result |
| 4 | After initial result, quickly identifies problems and iterates |
| 5 | Builds a mental model of the new domain fast; direction of iteration is sharp; connects new knowledge to existing experience |

### Scoring Principles (very important)

**Direction matters, not terminology.** This is a Signal/Algorithm Engineer role, not a System Architect or ML researcher role. System design jargon (buffer, batch sync, exponential backoff) and stats jargon (confounding, within-subject design) are nice-to-haves, not gates.

A candidate saying "store them somewhere first, then send when there's network" gets 3–4. Saying it with "local buffer + batch sync" gets 4–5. **Same thinking, just different vocabulary.** The jargon adds points, but its absence doesn't subtract them.

If a candidate is vague but directionally right, use follow-up questions to distinguish 3 from 4. If they answer the follow-up concretely → 4. If still vague → 3.

**Evidence-based scoring.** Every score needs a specific quote or observed action:

- ❌ *"CT: 4. Candidate was very thoughtful."*
- ✅ *"CT: 4. At 8 min, spontaneously asked: 'Does 800ms have to be fixed? Users move at different paces.' Later used AI to verify adaptive threshold feasibility before deciding to use fixed 800ms for v1."*

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

These apply to every task. None of the "friendly reminders" below count as scored interventions.

### 1. Think out loud
- **Why it matters:** We can't evaluate thinking we can't see.
- **Friendly reminder at 5 min silence:** *"Mind walking me through what you're thinking? I want to understand your approach."*
- **If still silent after 2 reminders:** Note as "unable to evaluate reasoning" — caps Problem Decomposition at 3.
- **If silent for 15+ min total:** Caps Problem Decomposition at 2 and AI Collaboration at 3.
- **Task 3 exception:** Task 3 is verbal — break silence after 1 minute, not 5.

### 2. Handling ambiguity
- **Ideal:** Spots fuzzy bit → makes assumption → says it out loud → proceeds. (CT + Problem Decomposition 4–5)
- **Acceptable:** Asks interviewer to clarify, then proceeds after getting a partial answer. (CT 3–4)
- **Passive:** Spots the fuzzy bit but freezes waiting for the interviewer. (Problem Decomposition 2–3)
- **Red flag:** Repeatedly complains "the question isn't clear" but doesn't define scope themselves. (CT + Problem Decomposition capped at 2)
- **Key principle:** *What* assumption they make doesn't matter — whether they made one consciously and explained it does.

### 3. Resourcefulness
- **Ideal:** Doesn't know X → looks it up / asks AI → explains what they found. (AI collab +1, knowledge competency not penalized)
- **Blind guessing:** Knowledge competency capped at 3.
- **Frozen on unknown:** Problem Decomposition capped at 2.
- **Principle:** "I don't know but I can find out" ≈ "I know."

---

## Task 1 — Overengineered Codebase (30 min)

**Primary evaluation:** CT · AI Collaboration · Signal Processing Fundamentals

### Prompt to read
> "The coach wants to know which reps were too fast. Without breaking the existing `count()` interface, please add `detect_fast_reps()` that returns whether each rep was below 800ms."

### The traps (interviewer-only, don't reveal)

**Premise trap 1:** Is "too fast" a fixed 800ms, or relative to *this user's* baseline? Different users move at different paces. Implementing 800ms is fine, but candidates who never question it will ship bad products.

**Premise trap 2:** The existing codebase is deliberately overengineered. Strong CT candidates ask, before writing anything: *"Should I add to this architecture, or should we first talk about whether this architecture makes sense?"*

**Deliberately planted issues in the codebase:**
1. `gaussian_filter1d` + `KalmanSmoother` — double smoothing, Kalman is redundant after bandpass
2. `_compute_adaptive_threshold` is an O(n × window) pure Python loop — clean data doesn't need adaptive threshold at all
3. `hash(raw_signal.tobytes())` caching — this use case has zero reason to cache
4. 4 dataclasses + 4 classes wrapping what's essentially peak detection
5. `FilterConfig` and `PeakConfig` both define `smoothing_sigma` — redundant, unclear ownership

### Timeline

| Time | Expected phase | What to watch |
|------|---------------|---------------|
| 0–5 min | Reading code, understanding architecture | Does the candidate react to the complexity, or just accept it? |
| 5–10 min | Asking questions or starting to code | Do they ask about 800ms? Do they ask "should I refactor or add?" |
| 10–20 min | Implementation | When they use AI, do they ask "help me add this" or "is this code reasonable"? |
| 20–25 min | Testing / verification | Do they test at all? Edge cases? |
| 25–30 min | Wrap-up Q&A | Follow-up questions (see question bank below) |

### Observation × BARS table

| Observed behavior | Competency | BARS |
|---|---|---|
| Asks where 800ms comes from, or whether it should be per-user | CT | 4–5 |
| Points out codebase is overengineered (even if they still add the feature) | CT + Signal Processing | 4–5 |
| Didn't spot it during coding but catches it when asked at the end | CT | 3 |
| Asks AI "is this code reasonable?" rather than "help me add a feature" | AI Collaboration | 4–5 |
| Checks whether AI output fits the codebase's style and scale | AI Collaboration | 4 |
| Pastes AI output without reviewing | AI Collaboration | **Red flag** — cap at 2 |
| Notices double smoothing or unnecessary adaptive threshold | Signal Processing | 4–5 |
| Knows the term `gaussian_filter1d` but can't say why it's redundant | Signal Processing | 2 |

### Expected performance paths

| Path | Typical behavior | Overall |
|------|-----------------|---------|
| 🟢 Ideal | Questions architecture → asks about 800ms → uses AI to analyze code quality → implements cleanly → runs tests | CT 4–5, AI 4–5 |
| 🟡 Acceptable | Reads code and implements directly → uses AI with review → gets it working → in Q&A can spot the premise issue when asked | CT 3, AI 3–4 |
| 🔴 Below bar | Pastes code into AI → takes AI solution as-is → never questions 800ms or architecture → can't reflect in Q&A | CT 1–2, AI 1–2 |

### Interventions

| When | Trigger | Script | Score impact |
|------|--------|--------|-------------|
| 5 min | Stuck but silent | *"What do you think of this codebase's complexity?"* | Caps CT at 4 |
| 15 min | Implementing without questioning 800ms | *"What's your take on the 800ms number?"* | Caps CT at 4 |
| 20 min | Totally stuck | *"Feel free to ignore the existing architecture — just implement it the simplest way you can."* | Caps Problem Decomposition at 4 |

### Interviewer response scripts

**When candidate asks good CT questions:**

| Candidate says | You say | Why |
|---|---|---|
| *"Does 800ms have to be fixed? People move at different paces."* | *"Great question — what would you do if it weren't fixed? Let's go with 800ms for now, and you can think about improvements as you go."* | Affirm the CT, but pull them back to shipping. Note this → CT 4–5. |
| *"This codebase feels overengineered. Should I refactor or add to it?"* | *"What feels overengineered to you? Walk me through it, then we can decide."* | Make them demonstrate signal processing knowledge first. |
| *"Can I skip the existing architecture and write something simpler?"* | *"You can do whatever you want as long as you don't break the `count()` interface."* | Give them freedom. |

**When candidate is hand-writing everything:**
- At 5 min into coding: *"Friendly reminder — you can use AI tools to speed this up, it won't affect your score."*
- Past 10 min still hand-coding: *"Time is limited — you can have AI generate a first draft and you review it."*
- If they finish by hand with good quality: Don't interrupt. Note their reason for going manual (ask in Q&A).

**When candidate hasn't tested anything:**
- Says "I'm done" but never ran it: *"Want to try running it? The README has an example signal."*
- Ran one happy path: *"What if a rep lands at exactly 800ms? What if there's only 1 rep?"*
- Says "I would test X" but doesn't: *"You have time — feel free to actually try it."*

**When candidate goes silent:**
- 5 min silence: *"Mind walking me through what you're thinking?"*
- 10 min (after one reminder): *"What are you working on right now? Where are you stuck?"*
- Two reminders ignored: Note as "unable to evaluate reasoning" — caps Problem Decomposition at 3.

**When candidate is stuck on ambiguity:**
- *"What does 'too fast' even mean?"* → *"What do you think it could mean? Make a reasonable assumption and tell me, then keep going."*
- *"I need more context."* → *"In real work you often don't get full context. Tell me what assumption you'd make and why, then we'll go from there."*
- Keeps complaining without moving: *"I hear you — but let's make an assumption out loud and start. We can revise later if needed."*

**When candidate doesn't know something:**
- *"I forget the numpy API for this."* → *"No worries, look it up."*
- *"I've never used `scipy.signal.find_peaks`."* → *"Ask the AI or check the docs — go for it."*

**When candidate finishes early:**
- Feature + tests done with > 5 min left: *"Nice work. What problems do you think this feature might hit in production?"*
- Handles that well: *"If this code were yours to maintain long-term, what would you change?"*
- Handles that well too: *"You used AI effectively earlier — what did it help with, and what didn't it help with?"*

### Reference answer (with scoring annotations)

This is a top-scoring response flow. Candidates don't need to match it exactly — what matters is whether the thinking path and key moments are hit.

---

**Step 1: Read the code, question the architecture (0–5 min)**

> *"This codebase has Kalman + adaptive threshold + multiple nested dataclasses, but the core thing it's doing is peak detection. Why does it need to be this complicated?"*

📌 **CT +5:** First reaction is to question architectural fit.

> *"After `gaussian_filter1d` there's also Kalman smoothing. That's double smoothing — after bandpass, the signal should already be clean enough."*

📌 **Signal Processing +4:** Can judge whether a step is necessary.

> *"Before I dive in — am I adding to this architecture, or can we discuss whether the architecture is reasonable first?"*

📌 **CT +5:** Clarifies scope before acting.

---

**Step 2: Question the 800ms premise (5–10 min)**

> *"Where does 800ms come from? Is it a fixed global threshold, or relative to the user's own pace? People move at very different speeds."*

📌 **CT +5:** Questions a baked-in assumption.

> *"How about I implement with fixed 800ms for v1, but leave the interface open so we can swap in adaptive later?"*

📌 **Problem Decomposition +4:** Pragmatic staged approach, not all-or-nothing.

---

**Step 3: AI-assisted implementation (10–20 min)**

> Asks AI: *"Is this code's architecture reasonable? Are there parts that are overengineered?"*

📌 **AI Collaboration +4–5:** Asks with a hypothesis, not "help me add `detect_fast_reps`".

> Checks AI output against current style and scale. Doesn't just paste.

📌 **AI Collaboration +4:** Reviews and adapts.

---

**Step 4: Test and verify (20–25 min)**

> Tests edge cases: rep at exactly 800ms, very fast rep (200ms), single rep, no reps.

📌 **Algorithm Verification +4:** Edge cases, not just happy path.

> *"If sampling rate changes, the number of samples for 800ms will change — the threshold needs to scale."*

📌 **Signal Processing +5:** Understands the relationship between parameters and physical quantities.

---

### Deduction table (Task 1)

| Behavior | Competency | Cap | Notes |
|----------|-----------|-----|-------|
| Never questioned 800ms or architecture | CT | 2 | Zero premise awareness |
| Saw overengineered code and had no reaction | CT | 2 | No sense for code quality |
| When asked "is 800ms reasonable?" still says yes | CT | 2 | Can't question even with prompting |
| When prompted, quickly catches the premise issue | CT | 3 | Reactive, not proactive |
| Pasted code into AI without reading or changing | AI Collaboration | 2 | Red flag |
| Pasted AI's code without checking if it's necessary | AI Collaboration | 2 | Red flag |
| Shipped the feature but never tested | Algorithm Verification | 2 | No verification habit |
| Doesn't know what `gaussian_filter1d` does | Signal Processing | 2 | Basic knowledge missing |
| Knows the term but can't explain why double smoothing is redundant | Signal Processing | 3 | Surface-level knowledge |
| Didn't finish the feature in 30 min | Problem Decomposition | 3 | Efficiency issue |
| **No penalty:** | | | |
| Chose to add to the overengineered code rather than refactor | — | — | Reasonable under time pressure |
| Used AI to generate code but reviewed and modified it | — | — | Correct AI usage |
| Implementation style differs from existing code | — | — | Not an evaluation point |

### Follow-up question bank (Task 1)

**If the candidate questioned the premise → go deeper:**

**Q:** *"How would you design an adaptive threshold so different users have their own 'too fast' baseline?"*
- 📌 Ideal: *"Collect N recent session rep times per user, compute mean and stddev, flag below mean - 1σ as too fast. Use a global default during cold start."* → CT +5, Algorithm Verification +4
- 📌 Acceptable: *"Use the user's own average as baseline."* → CT +4
- 📌 Below: *"Let the coach configure it manually."* → CT +2 (dodges the question)

**Q:** *"If this code were yours to inherit, how would you refactor it? What's the priority order?"*
- 📌 Ideal: *"1. Delete Kalman (no need for double smoothing after bandpass). 2. Replace adaptive threshold with fixed. 3. Remove the cache (no repeat-compute scenario). 4. Collapse the 4 dataclasses into 1."* → Signal Processing +5, Problem Decomposition +5
- 📌 Acceptable: *"Feels too complex — I'd start by simplifying the class structure."* → Problem Decomposition +3
- 📌 Below: *"Looks fine to me, wouldn't change much."* → CT +1

**If the candidate didn't question the premise → guide them:**

**Q:** *"What if I told you different users move at very different paces? How would you change the feature?"*
- 📌 Ideal: *(pauses)* *"Oh — so 800ms is wrong. It should be based on the user's own pace."* → CT +3 (reactive but quick)
- 📌 Acceptable: *"Let users configure their own threshold."* → CT +3
- 📌 Below: *"Just add a parameter and pass it in from outside."* → CT +2 (technical answer, misses the point)

**Q:** *"Do you think the existing codebase complexity is reasonable? If not, what's off?"*
- 📌 Ideal: *"Not reasonable. Kalman is redundant, adaptive threshold isn't needed, cache is pointless, too many dataclasses. Core problem is peak detection and it doesn't need this much machinery."* → CT +4, Signal Processing +4
- 📌 Acceptable: *"It's a bit complex, but I'm not sure exactly which parts are unnecessary."* → CT +3
- 📌 Below: *"Looks fine, every class has a purpose."* → CT +1

**AI usage reflection:**

**Q:** *"That question you asked the AI earlier — if you phrased it differently, would you have gotten a better answer?"*
- 📌 Ideal: *"I asked 'help me add a feature,' but if I'd asked 'is this code overengineered?' first, AI might have flagged the problem before I started building on shaky ground."* → AI Collaboration +5
- 📌 Acceptable: *"I could have been more specific."* → AI Collaboration +3
- 📌 Below: *"I think the question was fine, the answer was correct."* → AI Collaboration +2

**Q:** *"The code the AI gave you — what assumptions did it make?"*
- 📌 Ideal: *"It assumed 800ms was correct, assumed the existing architecture was reasonable, assumed sampling rate wouldn't change."* → AI Collaboration +5
- 📌 Acceptable: *"It assumed 800ms was the right threshold."* → AI Collaboration +3
- 📌 Below: *"It didn't make assumptions, it just did what I asked."* → AI Collaboration +1

### Red flag (Task 1)

Silently builds the feature and hands it in, never asks a single question about the requirements or the architecture.

---

## Task 2 — Dataset Analysis (40 min)

**Primary evaluation:** CT · Fast Learning · AI Collaboration · Debugging

### Prompt to read
> "We have 7 days of sleep and activity data from smart ring users (CSV). The PM says their initial analysis shows 'more exercise → better sleep that night' and wants to ship this as a feature. Please verify this and tell me what you find. All AI tools allowed."

### The traps (interviewer-only)

**Data file:** `task2/sleep_exercise.csv`

**Expected outcomes:**
- Raw same-day correlation: r ≈ 0.54 (looks meaningful)
- After correct temporal pairing + removing artifacts: r ≈ 0 (**PM's conclusion doesn't hold**)

**README clue (candidate can see):** The `sleep_score` description says "measured by the ring when the user *wakes up* and recorded against that day." A strong CT candidate notices: the sleep_score for date=Jan 8 is actually the sleep from the night of Jan 7→8, not tonight's sleep.

**Three layers of data problems (harder to spot as you go deeper):**

| Layer | Problem | Impact | Difficulty |
|-------|---------|--------|-----------|
| 1 | `sleep_score` is measured at wake-up → date=Jan 8's sleep is "last night's" sleep. PM says "more exercise → better sleep *tonight*," so correct pairing is steps[Jan 8] vs sleep[Jan 9], not same-day. Naive same-day analysis compares "today's exercise" with "last night's sleep" — causality reversed. | Spurious positive r ≈ 0.54 | Medium — requires reading field description carefully and reasoning about time |
| 2 | 3 users have multiple days with `steps > 50,000` (motion artifacts, 11 rows total) paired with high sleep scores | Inflates correlation significantly | Easy — basic EDA catches it |
| 3 | Sample is only 12 users × 7 days | Statistically meaningless | Hard — requires stats intuition |

**Deeper premise trap:** PM says "initial analysis shows." That itself is an unverified premise. Strong CT candidates ask *how* the PM ran that analysis rather than jumping straight to verifying a possibly-wrong conclusion.

**Interviewer note:** The README contains the clue ("measured upon waking") but doesn't explicitly say "so same-day pairing is wrong." If the candidate misses it, use the intervention scripts below to nudge.

### Timeline

| Time | Expected phase | What to watch |
|------|---------------|---------------|
| 0–5 min | Read CSV, inspect columns, EDA | Do they go straight to correlation, or do `df.describe()` / `df.head()` first? |
| 5–10 min | Discover (or miss) data problems | Do they notice the wake-up-time wording? Do they look at `steps` distribution? |
| 10–20 min | Analysis + iteration | When they find a problem, do they delete or investigate first? |
| **20 min** | **Mandatory pressure test** | *"PM says this is shipping next week. What's your response?"* |
| 20–35 min | Deeper analysis + conclusion | After cleaning, does the conclusion flip? Can they explain clearly? |
| 35–40 min | Wrap-up Q&A | Follow-up questions |

### Observation × BARS table

| Observed behavior | Competency | BARS |
|---|---|---|
| First step is EDA rather than straight to correlation | CT | 4–5 |
| Notices sleep_score is "measured upon waking" → realizes same-day pairing is wrong | CT | 4–5 |
| Only spots it after prompt "are you confident in data quality?" | CT | 3 |
| Questions sample size and statistical significance | CT | 5 |
| Asks *"how did the PM run the initial analysis?"* | CT | 5 |
| Uses AI to run data quality check before analysis | AI Collaboration | 4–5 |
| Runs AI straight to correlation without review | AI Collaboration | **Red flag** — cap at 2 |
| Finds outlier and investigates whether it's artifact or real | Debugging | 4 |
| After finding problems, quickly pivots analysis direction | Fast Learning | 4 |
| Under PM pressure, clearly states data limits instead of caving | CT | 4–5 |

### Expected performance paths

| Path | Typical behavior | Overall |
|------|-----------------|---------|
| 🟢 Ideal | Does EDA → finds outliers and temporal mismatch → questions PM premise → cleans and re-runs → conclusion flips → holds the line under PM pressure | CT 4–5, Fast Learning 4–5 |
| 🟡 Acceptable | Runs correlation first but spots outliers → removes and reruns → may miss pairing issue but raises doubts → partially communicates limits under pressure | CT 3, Fast Learning 3–4 |
| 🔴 Below bar | Runs correlation → r=0.55 → "confirmed" → no data quality check → agrees to ship under pressure | CT 1–2, Fast Learning 1–2 |

### Interventions

| When | Trigger | Script | Score impact |
|------|--------|--------|-------------|
| 5 min | Doesn't know where to start | *"Have you looked at the basic statistics of the data yet?"* | Caps Problem Decomposition at 4 |
| 15 min | Ran correlation but didn't check data quality | *"How confident are you in this dataset's quality?"* | Caps CT at 4 |
| 20 min | **Mandatory pressure test** | *"PM says this is shipping next week. What's your response?"* | Normal scoring |

### Interviewer response scripts

**When candidate asks good questions:**

| Candidate says | You say | Why |
|---|---|---|
| *"How did the PM run the initial analysis?"* | *"Good question. They ran a correlation in Excel between steps and sleep_score, got about 0.5."* | Answer the question but don't give away the trap. This implicitly suggests PM did naive same-day pairing. Note → CT +5. |
| *"When is sleep_score measured? Is today's score tonight's sleep or last night's?"* | *"Check the field description in the README."* | Don't answer directly — make them read the clue themselves. |
| *"Is 12 people × 7 days even enough statistically?"* | *"What do you think? How many samples would you need?"* | Throw it back so they can show stats intuition. |
| *"Some step counts are over 50,000 — that doesn't seem right?"* | *"What do you think is going on?"* | Make them reason about artifact vs real. |

**When candidate is hand-coding everything:**
- Past 5 min of manual pandas: *"Friendly reminder — you can use AI to do the EDA quickly so you spend time on the findings, not the syntax."*
- Past 10 min and still on basic plotting: *"Time is limited — let AI run the analysis, you focus on whether the results make sense."*

**When candidate stops after initial analysis:**
- Gets r=0.54, declares "positive correlation": *"How confident are you in this result? Anything you'd want to confirm first?"*
- Removed outliers but didn't think about pairing: *"Which night's sleep does `sleep_score` on a given date represent, do you think?"*
- Only ran one analysis: *"Is there another angle you'd want to look at this data from?"*

**When candidate goes silent:**
- 5 min silence during EDA or coding: *"Mind sharing what you're seeing, what you're thinking?"*
- 10 min: *"What are you digging into right now? What have you found?"*
- Two reminders ignored: Note as "unable to evaluate reasoning" — caps Problem Decomposition at 3.

**When candidate is stuck on ambiguity:**
- *"Does the PM mean steps or active_minutes by 'exercise'?"* → *"Not specified — pick one and explain your reasoning. You can try both if you have time."*
- *"How should I define 'good sleep quality'?"* → *"How would you define it? Make an assumption and keep going."*
- *"This data isn't enough for me to do anything."* → *"I understand — but that's part of the task. Tell me what limits you see, what assumptions you'd make, and do what you can within those."*
- Keeps complaining without analyzing: *"Data quality being bad is actually one of the findings we want — note it. But right now, please run an analysis and share your assumptions. We can discuss limits afterwards."*

**When candidate doesn't know something:**
- *"I'm a bit rusty on pandas."* → *"No worries, ask AI or check the docs. Your judgment matters more than the syntax."*
- *"I don't remember how to compute correlation."* → *"Look it up, no penalty."*
- *"I'm not great at significance testing."* → *"Ask the AI, or just share your intuition."*

**When candidate finishes early:**
- Found problems + conclusion flipped with > 10 min left: *"Great. If you were on the data team, how would you report this back to the PM?"*
- Handles that: *"If the PM insists on shipping, what's a compromise you could suggest?"*
- Still time: *"What kind of experiment would you design to actually validate 'exercise affects sleep'?"*

### Reference answer (with scoring annotations)

---

**Step 1: EDA (0–5 min)**

> *"Let me first see what the data looks like — `df.describe()`, `df.head()`, `df.info()`."*

📌 **CT +4:** Starts with EDA, not straight to correlation.

> *"Steps max is 65,000? 65k steps a day isn't plausible — normal is 5,000-15,000. This is probably a sensor artifact."*

📌 **CT +5:** Proactively finds outliers and questions them.
📌 **Debugging +4:** Doesn't just delete, asks why.

> *"Wait — `sleep_score` is measured on wake-up. So the `sleep_score` for date=Jan 8 is actually the sleep quality from the night of Jan 7→8. The PM says 'more exercise → better sleep *that night*,' which means the Jan 8 daytime exercise should affect the Jan 8 nighttime sleep, which is measured morning of Jan 9. If I naively correlate same-day steps and sleep_score, I'm actually comparing 'today's exercise' with 'last night's sleep' — causality is reversed."*

📌 **CT +5:** Actively spots the temporal pairing problem, understands the direction of causality.

---

**Step 2: Question the PM's premise (5–10 min)**

> *"How did the PM run the initial analysis? Did they account for the sleep_score measurement time? Did they remove artifacts?"*

📌 **CT +5:** Questions the premise behind the premise — the PM's own methodology.

> *"If the PM just ran same-day correlation, they're comparing today's exercise with last night's sleep. Causality is backwards, so the correlation is spurious."*

📌 **Debugging +5:** Cross-layer root cause, explains the causal chain.

---

**Step 3: Clean + re-analyze (10–20 min)**

> Removes rows where `steps > 50000` (11 rows), correctly pairs `steps[today]` with `sleep[tomorrow]`, reruns.

📌 **Fast Learning +4:** Iterates quickly in an unfamiliar domain.

> *"After cleaning, r dropped from 0.54 to nearly 0. The PM's conclusion was the result of artifacts and wrong temporal pairing."*

📌 **CT +5:** Conclusion flip, clearly explains why.

---

**Step 4: Pressure test response (20 min)**

Interviewer asks: *"PM says this is shipping next week. What's your response?"*

> *"I'd tell the PM there are three problems: (1) sleep_score is measured in the morning, so direct same-day pairing reverses causality, (2) some users have clear sensor artifacts, not real exercise, (3) 12 users isn't statistically meaningful. After correct pairing the correlation disappears. I'd recommend collecting at least 100 users over 30 days before drawing conclusions."*

📌 **CT +5:** Clearly states limits, doesn't cave under pressure.
📌 **Fast Learning +4:** Communicates in non-technical language.

> *"If it has to ship, I'd suggest reframing it as 'personalized trend reference' instead of a causal claim — something like 'on days you exercised more, your sleep score tended to be higher,' with a disclaimer."*

📌 **CT +4:** Pragmatic middle ground.

---

**Step 5: Deeper analysis (20–35 min)**

> Per-user subgroup analysis, considers confounding variables.

📌 **Algorithm Verification +4–5:** Not just overall, but stratified.

> *"Correlation isn't causation. Even after cleaning, any correlation could come from a third variable like weather or weekend effects."*

📌 **CT +5:** Skeptical mindset about conclusions.

---

### Deduction table (Task 2)

| Behavior | Competency | Cap | Notes |
|----------|-----------|-----|-------|
| No EDA, straight to correlation | CT | 2 | Skips premise check |
| Didn't notice sleep_score is "wake-up measured" → same-day pairing wrong | CT | 3 | When prompted: 3. Doesn't catch even when prompted: 2 |
| Missed that steps > 50000 is anomalous | Debugging | 2 | Basic EDA catches it |
| Found outlier but deleted without investigating | Debugging | 3 | Knows there's a problem but doesn't dig |
| Didn't question sample size | CT | 3 | Acceptable but not ideal |
| Ran AI straight at analysis without checking data quality | AI Collaboration | 2 | Red flag |
| AI returns r=0.55, candidate declares "confirmed" | AI Collaboration + CT | 2 each | Blindly trusts AI + no questioning |
| Under PM pressure, agrees to ship | CT | 2 | Can't hold the line |
| Under PM pressure, says "data is bad" but can't articulate why | CT | 3 | Knows but can't explain |
| **No penalty:** | | | |
| Used AI for EDA but reviewed results | — | — | Correct usage |
| Doesn't know the term "motion artifact" | — | — | Recognizing anomaly is enough |
| Stats methods rusty but senses sample size problem | — | — | Direction matters |
| Didn't use AI at all during analysis | — | — | Analysis ability > AI usage |
| Only found one layer of problems in 40 min (e.g., outliers but not pairing) | — | — | One layer is enough for a 3 |

### Follow-up question bank (Task 2)

**If the candidate found the problems → go deeper:**

**Q:** *"For this conclusion to be trustworthy, how many samples would you need, and what kind of experimental design?"*
- 📌 Ideal: *"At least a few hundred people, 30+ days. Within-subject design — each person is their own control, comparing their exercise days vs rest days. Also control for confounders like season and weekday/weekend."* → CT +5, Algorithm Verification +5
- 📌 Acceptable: *"At least a few hundred, longer time window."* → CT +3
- 📌 Below: *"Just add a few more users."* → CT +2

**Q:** *"Beyond correlation, what other methods could you use to validate the 'exercise affects sleep' hypothesis?"*
- 📌 Ideal: *"A/B test or randomized controlled trial — randomize people into 'must exercise' vs control, compare sleep. Or Granger causality / lagged regression to see if exercise precedes sleep improvement in the time series."* → CT +5, Algorithm Verification +5
- 📌 Acceptable: *"Run an experiment where some people exercise more."* → CT +3
- 📌 Below: *"Collect more data and rerun correlation."* → CT +2 (same method)

**Q:** *"How would you handle motion artifacts in production — pre-processing or post-processing?"*
- 📌 Ideal: *"Pre-processing is better — add an anomaly detection step in the pipeline (e.g., `steps > 30000` or 'accel features don't look like walking') and flag before writing to the DB. Post-processing means every downstream analysis has to handle it, easy to miss."* → Signal Processing +4, Problem Decomposition +4
- 📌 Acceptable: *"Do both — filter the obvious ones upstream, check again in analysis."* → Problem Decomposition +3
- 📌 Below: *"Just z-score and drop."* → Debugging +2 (treating symptoms)

**If the candidate missed the problems → guide them:**

**Q:** *"When is `sleep_score` measured? Does that affect your analysis?"*
- 📌 Ideal: *(thinks for a moment)* *"Oh — it's measured on waking! So `sleep_score` on Jan 8 is the sleep from last night, not tonight's sleep. My same-day pairing was wrong — I should pair `steps[today]` with `sleep[tomorrow]`."* → CT +3 (guided but quick)
- 📌 Acceptable: *"It's measured in the morning… that might matter, let me rethink."* → CT +2
- 📌 Below: *"Shouldn't matter, it's all same day."* → CT +1

**Q:** *"Have you looked at the `steps` distribution? Anything look off?"*
- 📌 Ideal: *(after checking)* *"Some users have steps over 50,000 — that's impossible, it has to be motion artifact or device malfunction."* → Debugging +3 (reactive but catches it)
- 📌 Acceptable: *"Some values are high, might be outliers."* → Debugging +2
- 📌 Below: *"Looks normal to me."* → Debugging +1

**PM pressure-test follow-ups:**

**Q:** *"If the PM insists on shipping, what compromise would you suggest?"*
- 📌 Ideal: *"Ship it, but reframe as 'personalized trend reference' not a causal claim. UI copy like 'on days you exercised more, your sleep score tended to be higher,' with a disclaimer. Kick off a larger data collection in parallel."* → CT +5, Fast Learning +4
- 📌 Acceptable: *"Add a disclaimer that data is insufficient."* → CT +3
- 📌 Below: *"Just ship it, we can fix it later."* → CT +1

**Q:** *"In one sentence, how would you explain to a non-technical PM why this data can't be used directly?"*
- 📌 Ideal: *"The sleep scores in this data are actually last night's sleep, not tonight's. So comparing today's exercise with tonight's sleep actually flips the cause and effect. Once you fix that, the correlation you saw disappears."* → CT +5 (clear, non-technical)
- 📌 Acceptable: *"The data has quality issues and the conclusion isn't reliable."* → CT +3 (correct but vague)
- 📌 Below: *"r drops from 0.54 to 0.01, p-value not significant."* → CT +2 (technically correct but PM won't follow)

### Red flag (Task 2)

Runs AI straight at correlation, gets 0.6, declares "positive correlation confirmed," no quality checks, no sample size concerns.

---

## Task 3 — Verbal System Design (15 min)

**Primary evaluation:** CT · Embedded Engineering Awareness · Problem Decomposition

### Prompt to read
> "Our smart ring SDK is integrating with a third-party health app. Their engineer says they want every detected rep pushed to their server in real time via webhook. Please design this integration."

### The trap (interviewer-only)

**The question deliberately doesn't say where the webhook originates from.** The other engineer implicitly assumes "rep detected" can directly trigger an HTTP request — but they haven't thought about *where* the rep is detected.

Strong CT candidates ask: *"Where is the rep detected? Who sends the webhook?"*

- Ring sends? → Ring has no network, impossible
- Phone sends? → Possible, but phone may be offline
- Your server sends? → Possible, but data has to get from ring → phone → server first

**Full data flow:**

```
Ring detects rep ──BLE──→ Phone SDK ──network──→ Your Server ──webhook/WS──→ Third-party
                   ↑              ↑                    ↑
                BLE drops      may be offline      server-to-server, fine
```

**Core insight: the webhook is not the problem.** The webhook (or WebSocket) in the server-to-server hop is totally fine — with a retry queue, it's a standard reliable webhook. The real problem is the front half — ring → phone → your server:

| Problem | Where | Why |
|---------|-------|-----|
| Ring has no network | Ring → Phone | BLE devices can't send HTTP, only BLE |
| BLE disconnects | Ring → Phone | Arm angle, distance, interference |
| Phone may be offline | Phone → Server | Gym basements, airplane mode, no signal |
| Push storms | Whole chain | Intense exercise = multiple reps/sec, per-rep HTTP = battery death |

**Reasonable integration designs (by latency tolerance):**

| Design | Data flow | Latency | Good for |
|--------|-----------|---------|----------|
| Server relay + WebSocket | Phone → Your Server → WS push to third-party | Seconds (depends on front half) | Third-party needs near-real-time |
| Server relay + webhook + retry queue | Phone → Your Server → HTTP POST with retry | Seconds to minutes | Standard integration, high reliability |
| Batch sync | Upload after session ends, then notify third-party | Minutes | Most analytics use cases |
| Pull model | Third-party periodically pulls from your API | Controlled (e.g., every 30s) | Third-party has own scheduling |

**Regardless of design, the phone needs local buffer + reconnect-retry.** This is the common foundation for all designs.

**Top answer example:** *"Webhook + retry queue to the third party is fine, but the prerequisite is that the phone has a local buffer for BLE drops and offline scenarios. And we should ask the third party what they actually need — real-time or completeness of data."*

### Scoring principle: direction matters more than terminology

> **This position is Signal/Algorithm Engineer, not System Architect.** System design vocabulary (buffer, batch sync, exponential backoff) is nice-to-have, not a gate.
>
> Scoring looks at **direction of thinking**, not jargon. "Store them first, send when there's network" and "local buffer + batch sync" are the same idea — the former gets 3-4, the latter gets 4-5. **Jargon adds points, absence of jargon doesn't subtract.**
>
> **How to judge:** If the candidate's direction is right but vague, use follow-up questions to distinguish 3 from 4. Concrete answers to follow-ups → 4. Still vague → 3.

### Timeline

| Time | Expected phase | What to watch |
|------|---------------|---------------|
| 0–2 min | Clarifying requirements / jumping to design | Do they ask "where is the rep detected? who sends the webhook?" |
| 2–5 min | Proposing architecture or questioning premise | Do they spot that the *front half* is the problem? |
| 5 min | **Intervention point (conditional)** | If still haven't questioned → *"The ring connects to the phone via BLE — does that affect your design?"* |
| 5–8 min | Adjusting design | How fast do they pivot after the hint? |
| **8 min** | **Mandatory pressure test** | *"If the user's phone is offline for a while, how does your design handle it?"* |
| 8–12 min | Deeper design | How specific is the alternative (batch sync? pull? local buffer?) |
| 12–15 min | Wrap-up Q&A | Follow-up questions |

### Observation × BARS table

| Observed behavior | Competency | BARS |
|---|---|---|
| First asks *"where is rep detected? who sends the webhook?"* | CT | 5 |
| Draws the full data flow (ring → phone → server → third-party) proactively | CT | 5 |
| Discovers BLE / offline is the bottleneck mid-design | CT | 4 |
| Only spots the problem after the BLE hint | CT | 3 (capped at 4) |
| Still only discusses server-to-server retry after the hint | CT | 1–2 |
| Mentions battery / offline / push frequency (no jargon needed) | Embedded | 3–4 |
| Can quantify impact ("BLE per transmission ~N mA" or "per-rep HTTP kills battery") | Embedded | 5 |
| Says "store them first" but can't say where or how much | Embedded | 3 (4 if answers follow-up) |
| No consideration of hardware constraints at all | Embedded | 1 |
| Proposes "don't send all at once / store and forward" (jargon not needed) | Problem Decomposition | 3–4 |
| Design has concrete parameters ("every 5 seconds," "cap at 1000 records") | Problem Decomposition | 4–5 |
| Asks *"does third-party need real-time or complete data?"* (doesn't need to use those exact words) | CT | 4–5 |

### Expected performance paths

| Path | Typical behavior | Overall |
|------|-----------------|---------|
| 🟢 Ideal | Asks "where is rep detected?" → draws full flow → identifies front half as bottleneck → proposes design with local buffer (webhook or WS both fine) → distinguishes real-time vs completeness | CT 5, Embedded 4–5 |
| 🟡 Acceptable | Starts designing server-to-server webhook → after hint, realizes front-half problem → adds phone buffer → handles offline basically | CT 3 (cap 4), Embedded 3 |
| 🔴 Below bar | Immediately designs webhook endpoint → after hint still only discusses server retry → never thought about ring → server flow → no offline handling | CT 1–2, Embedded 1 |

### Interventions

| When | Trigger | Script | Score impact |
|------|--------|--------|-------------|
| 5 min | Designing server-to-server webhook without questioning ring → server flow | *"The ring connects to the phone via BLE — does that affect your design?"* | Caps CT at 4 |
| 8 min | **Mandatory pressure test** | *"If the user's phone is offline for a while, how does your design handle it?"* | Normal scoring |

### Task 3 is verbal — break silence after 1 minute

There's no code to observe. Long silence = nothing to evaluate. If they pause for more than 1 minute, ask: *"Mind sharing what you're thinking? Even half-formed thoughts are fine."*

### Interviewer response scripts

**When candidate gets stuck on "the question isn't clear" (most common in Task 3):**

| Candidate says | You say |
|---|---|
| *"What does the other engineer actually want? I need more context."* | *"The prompt is deliberately light on context. Please list the points you want clarified, make a reasonable assumption about each, and start designing based on those assumptions."* |
| *"I don't know the ring's hardware specs."* | *"What would you reasonably assume? Battery capacity, CPU, whether there's Wi-Fi, etc. State your assumptions and keep going."* |
| *"What does the third party really want?"* | *"The prompt only says they asked for webhook push. What do you think they actually want? Make an assumption."* |
| Keeps asking clarifying questions without starting | *"I hear you, but designing under incomplete information is part of the task. Please make assumptions now and start designing — we'll debate details after."* |

**When candidate goes silent (Task 3 is shorter tolerance):**
- 1 min silence: *"Mind sharing what you're thinking? Even half-formed thoughts are fine."*
- After one half-sentence and silence: *"Keep going — what's your next thought?"*
- Started designing then silent: *"What are you designing right now? Just the rough direction is fine."*

**When candidate doesn't know something:**
- *"I'm not super familiar with BLE."* → *"That's fine — reason from what you know about wireless in general. Or say 'I'll assume BLE has these limitations…' and work from there."*
- *"I mix up webhook and WebSocket."* → *"No worries, tell me your understanding and I'll confirm."*
- *"I haven't worked on wearables."* → *"No problem — use a system you have worked on as an analogy. 'If it were a server I'd do X, but on a wearable I'd guess Y limits apply…'"*

### Reference answer (with scoring annotations)

---

**Step 1: Clarify the data flow (0–2 min)**

> *"Hold on — let me confirm something. Where is the rep detected? On the ring, on the phone, or on the server?"*

📌 **CT +5:** First thing they do is question a missing premise instead of starting to design.

> *"The ring is a BLE device, right? So it can't send HTTP itself — data has to flow over BLE to the phone SDK first, then the phone uploads to our server."*

📌 **CT +5:** Draws the full data flow proactively.
📌 **Embedded +4:** Knows BLE devices don't have internet.

> *"So the full chain is: ring → BLE → phone SDK → network → your server → third party. The webhook can only happen on the last leg — server-to-server."*

📌 **Problem Decomposition +5:** Splits front-half vs back-half precisely.

---

**Step 2: Point out the problems (2–5 min)**

> *"A few concerns I want to raise:*
> *1. BLE drops in the front half — arm angle, distance can interrupt it, so we can't guarantee every rep reaches the phone in real time.*
> *2. The phone may have no network — gym basements, airplane mode, data stuck on phone.*
> *3. High-intensity exercise could produce multiple reps per second — per-rep HTTP would drain the battery."*

📌 **Embedded +4~5:** Proactively lists BLE drops, offline, battery.
📌 **CT +4:** Identifies that "real time" is unrealistic as stated.

> *"So I want to ask first: does the third party actually need real-time, or do they need data completeness? Most cases, they want 'no missing data,' not 'sub-second push per rep.'"*

📌 **CT +5:** Reframes the problem — from "how to implement webhook" to "what does the third party actually need."

---

**Step 3: Propose the design (5–10 min)**

> *"My proposal is a two-part design:*
>
> ***Front half (ring → phone → server):***
> *- Phone SDK stores each rep in a local buffer on receipt*
> *- When network is available, batch upload to our server (every 5 seconds, or at session end — depends on latency requirements)*
> *- On BLE drop or phone offline, data is not lost; resumes on reconnect*
>
> ***Back half (server → third party):***
> *- Webhook + retry queue works fine here — server-to-server is stable*
> *- Or WebSocket as a persistent connection for lower latency*
> *- Failed requests retry with exponential backoff, sit in a queue so nothing is lost."*

📌 **Problem Decomposition +5:** Splits front/back halves cleanly, concrete steps.
📌 **Embedded +4:** Local buffer design, handles reconnect.

> *"If the third party is just doing analytics, batch sync is enough — one push at session end. If they really need near-real-time, bump front-half upload frequency — say every 5 seconds — but tell them end-to-end latency depends on BLE and phone network, which we can't guarantee."*

📌 **CT +5:** Flexible design based on requirements, not a one-size-fits-all.
📌 **Problem Decomposition +4:** Offers scenario trade-offs.

---

**Step 4: Pressure test response (8 min)**

Interviewer asks: *"If the user's phone is offline for a while, how does your design handle it?"*

> *"The phone-side local buffer handles exactly this. Offline → data stored locally, reconnect → replays in timestamp order. If the buffer is nearing full, we can drop oldest raw data but keep summaries. Important thing is: the buffer can't be infinite — we need a cap, say 1000 records or 10 MB."*

📌 **Embedded +5:** Buffer has caps, overflow strategy, priority logic.
📌 **Problem Decomposition +4:** Considers edge cases (what if buffer fills).

---

### Deduction table (Task 3)

> **Principle: deduct for thinking direction, not jargon.** "Store them first" without knowing the word "buffer" = no deduction. No thought of storing at all = deduction.

| Behavior | Competency | Cap | Notes |
|----------|-----------|-----|-------|
| Never asked "where is rep detected" or "how does data flow" | CT | 2 | Zero premise questioning |
| After BLE hint, still sticks to original plan | CT | 1 | Can't adjust with new information |
| After hint, catches on quickly | CT | 4 | Reactive but good |
| After hint, slow to catch on, needs more nudging | CT | 3 | High guidance cost |
| No mention of offline / disconnect scenarios | Embedded | 2 | Basic wearable awareness missing |
| Says "it'll disconnect" but can't say how to handle it | Embedded | 3 | Knows the problem, no solution |
| Never thinks about buffering on the phone | Embedded | 2 | Doesn't understand front-half needs |
| Says "store them first" but can't answer "where, how many, what if full" | Embedded | 3 | Right direction, insufficient depth |
| Says "push every rep in real time" without considering battery | Embedded | 2 | No wearable power awareness |
| Only gives one design, can't adapt when asked "what if requirements differ" | Problem Decomposition | 3 | Inflexible |
| Design doesn't separate "ring → server" from "server → third party" | Problem Decomposition | 3 | Imprecise decomposition |
| When asked about offline: "then wait for network" with no further design | CT | 2 | Avoids instead of solving |
| Entire discussion is server-to-server only, never mentions phone side | CT + Embedded | 2 each | Completely misses front half |
| Says "ring can just connect to Wi-Fi / send HTTP" | Embedded | 1 | Basic hardware misconception |
| **No penalty:** | | | |
| Doesn't know terms buffer / batch sync / exponential backoff | — | — | Jargon is bonus, not gate |
| Mixes up BLE and Wi-Fi names / webhook and WebSocket names | — | — | Clarify and move on |
| Pressure-test response adds buffer design but is a bit vague | — | — | Pressure test scored normally |
| Says "send in batches" without knowing "batch" as a term | — | — | Right thinking = points |

### Follow-up question bank (Task 3)

**If candidate is vague but directionally right → use follow-ups to distinguish 3 from 4:**

- Candidate says "store them first" → *"Where? On the phone or the ring?"* (Answers "phone" → 4)
- Candidate says "don't send all at once" → *"How often do you send? How do you decide?"* (Specific strategy → 4)
- Candidate says "there's a limit" → *"What happens when it's full? Drop oldest or stop collecting?"* (Trade-off logic → 4)
- Candidate says "need to handle disconnects" → *"After reconnect, how do you know which ones haven't been sent?"* (Has an idea → 4)

**If candidate questioned the premise → go deeper:**

**Q:** *"If the third party insists on near-real-time, can you design a compromise? What about 5-second latency?"*
- 📌 Ideal: *"Front half (phone → server) batches every 5 seconds. Back half (server → third party) uses WebSocket for instant push. End-to-end latency ~5–10 seconds, but tell the other side BLE drops will extend latency and we can't guarantee SLA."* → CT +5, Problem Decomposition +5
- 📌 Acceptable: *"Just increase upload frequency."* → Problem Decomposition +3
- 📌 Below: *"5 seconds should be fine with just webhook."* → CT +2 (ignored the front half)

**Q:** *"For batch sync, what's the right granularity? How do you decide what counts as one batch?"*
- 📌 Ideal: *"Depends on use case — a workout session boundary (20-60 min typically) is natural. For all-day tracking, every hour or every app open. Trade-off: too granular = too many HTTP requests, too coarse = too much latency."* → Problem Decomposition +5
- 📌 Acceptable: *"Once per session when it ends."* → Problem Decomposition +3
- 📌 Below: *"Once a day."* → Problem Decomposition +2 (too coarse, data loss risk)

**Q:** *"If 10 third parties all integrate, how does your design scale?"*
- 📌 Ideal: *"Back half uses pub/sub or fan-out — data arrives at server, we publish one event, each third party consumes independently. Front half unchanged — phone uploads once."* → Problem Decomposition +5
- 📌 Acceptable: *"Add a dispatch layer on the server that forwards to each third party."* → Problem Decomposition +4
- 📌 Below: *"Each third party pulls from the phone."* → Embedded +1 (phone can't handle it)

**If candidate caught on only after the hint → check understanding depth:**

**Q:** *"Looking back, what's the real problem with this requirement? Is webhook technically wrong, or did the other engineer skip the front half of the data flow?"*
- 📌 Ideal: *"They skipped the front half. Webhook in server-to-server is totally fine. The problem is the assumption that rep detection can directly become an HTTP request, but BLE and the phone sit between them."* → CT +4
- 📌 Acceptable: *"Webhook can work, but we need to solve how data gets to the server first."* → CT +3
- 📌 Below: *"Webhook just doesn't fit this scenario."* → CT +2 (oversimplified)

**Q:** *"If the ring later got a Wi-Fi module, would your conclusion change?"*
- 📌 Ideal: *"With Wi-Fi, the ring could upload directly, removing the BLE bottleneck. But Wi-Fi is 100× more power-hungry than BLE — we still can't open Wi-Fi per rep. Batching is still necessary, just ring → server directly instead of via phone."* → Embedded +5, CT +5
- 📌 Acceptable: *"Then the ring could upload directly, no phone needed."* → Embedded +3
- 📌 Below: *"Then webhook would work fine."* → Embedded +2 (ignored power cost)

**Q:** *"Webhook + retry queue server-to-server is fine, right? So where's the actual problem?"*
- 📌 Ideal: *"Right, the back half is fine. The problem is the front half — getting data from ring to server — which has BLE drops and phone offline risk. Not the webhook's fault."* → CT +4
- 📌 Acceptable: *"Right, webhook works; the problem is the data source side."* → CT +3
- 📌 Below: *"Webhook still isn't fast enough."* → CT +1 (missed the point)

**Embedded knowledge follow-ups:**

**Q:** *"How much does BLE vs Wi-Fi differ in power consumption? How does that affect your design?"*
- 📌 Ideal: *"BLE per transmission is a few mA, Wi-Fi is hundreds of mA, 100× difference. Even with Wi-Fi you can't leave it on continuously — you need periodic wake-up. So even with Wi-Fi, batching is still required."* → Embedded +5
- 📌 Acceptable: *"Wi-Fi burns a lot more power than BLE, so you can't leave it on."* → Embedded +4
- 📌 Below: *"About the same, they're both wireless."* → Embedded +1

**Q:** *"If the phone SDK buffer is full but still no network, how do you handle it?"*
- 📌 Ideal: *"A few strategies: (1) drop oldest raw data but keep summaries (like rep count + avg duration), (2) compress data — keep only timestamp + duration, drop the waveform, (3) notify the user that storage is low. Depends on what data is most important to keep."* → Embedded +5, Problem Decomposition +4
- 📌 Acceptable: *"Drop the oldest data."* → Embedded +3
- 📌 Below: *"It wouldn't fill up, phones have lots of memory."* → Embedded +1

### Red flag (Task 3)

Immediately starts designing webhook endpoints (auth, retry, rate limits) without ever asking where the rep is detected or how data gets from the ring to the server.

---

## Red flags (cross-task)

Any of these caps the relevant competency at BARS 2. They don't automatically disqualify, but they're strong negative signals.

- **AI collaboration:** Pastes AI output without reviewing; never questions AI-generated complex solutions
- **Over-reliance on AI:** Lets AI override their own correct initial judgment — a candidate with the right approach who hands control to AI and ships a worse solution (observed in recent real interviews)
- **Problem decomposition:** Can't explain their approach in steps; stuck but can't articulate where
- **Debug:** Found a problem but can't explain why it's a problem; pasted whole code into AI without evaluation
- **Knowledge floor:** Can't explain the physical meaning of any signal parameter; completely misses the webhook architecture problem in Task 3
- **Behavioral red flag 1:** Silent for 15+ minutes straight (nothing to evaluate)
- **Behavioral red flag 2:** Repeatedly complains "the question is unclear" but doesn't define scope themselves

---

## Post-interview scorecard

Fill this out within 10 minutes of the interview ending. Memory decays fast.

### Structure

1. **One score per competency** (CT + 7 job competencies, 1–5)
2. **Specific evidence for each score** — quote what the candidate said or did. No vague impressions.
3. **Red flags triggered** (if any)
4. **Overall recommendation:** Strong hire / Hire / Borderline / No hire

### Examples

**Bad example:** *"CT: 4. Candidate was very thoughtful."*

**Good example:** *"CT: 4. At 8 min into Task 1, spontaneously asked 'does 800ms have to be fixed? Users move at different paces.' Later used AI to verify adaptive threshold feasibility before deciding to use fixed 800ms for v1. In Task 2, immediately spotted the 65k-step outlier and asked if it was a sensor artifact. Did not catch the temporal pairing issue even when asked about sleep_score measurement time."*

Good evidence is:
- **Specific** — minute marker or exact quote
- **Observable** — what they said or did, not what you felt
- **Tied to the rubric** — which BARS behavior this matches

### Multi-interviewer calibration

If more than one interviewer is involved:

1. **Score independently first.** Don't discuss scores until everyone has a draft. Social anchoring skews first impressions.
2. **Share scores simultaneously** (e.g., write in chat at the same time).
3. **Discuss any score that differs by 2+ points.** Ask "what evidence drove your score?" rather than "why did you give that."
4. **Revise individually if the discussion changes your view.** Don't force consensus — divergent scores are useful information too.
5. **Final decision by the hiring manager**, informed by all scorecards. Calibration is not voting.

### Common cognitive biases to watch for

- **First impression bias:** First 5 min weights too heavily. Deliberately re-evaluate after each task.
- **Halo / horns:** One strong or weak signal biasing all other scores. Force yourself to write evidence per competency.
- **Similarity bias:** Rating candidates who think like you higher. Notice if your "good signal" list maps to your own style.
- **Contrast effect:** A weak candidate makes the next one look stronger than they are. Calibrate against the rubric, not against the previous interview.

### Decision rules

- **All Must-haves ≥ 3:** Hirable. Use Important competencies and cross-task signals to decide Hire vs Strong Hire.
- **Any Must-have < 3:** No hire, unless there's a clear reason (e.g., Red flag triggered under a misunderstanding that the candidate recovered from). Document the exception.
- **Red flag triggered:** Cap on that competency, but not an automatic no-hire. Look at overall picture.
- **Borderline:** If the final decision is unclear, the default is "no hire." It's cheaper to miss a good candidate than to hire a wrong one.

---

*Version: v4.2 · Full English rubric with BARS, reference answers, deduction tables, and follow-up banks*
