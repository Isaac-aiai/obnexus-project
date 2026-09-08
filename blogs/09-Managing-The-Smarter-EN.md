# Ancient Intelligence Wisdom, Modern AI Debugging

---

## The General Doesn't Go to the Battlefield

Two thousand years ago, military strategists solved a problem:

**How does a general command a battle they can't see?**

Battlefield is smoke and chaos. The general can't personally run to every direction to see what's happening. But they need to make decisions: where to send the main force? When to commit reserves? Should the flank retreat?

The answer: **intelligence reporting systems**.

Scouts at the front constantly send back messages: "enemy right flank has a gap," "our left flank is under heavy pressure," "enemy commander's banner moved east."

This fragmented information flows back to the general's tent. Only then can correct judgments be made.

Without intelligence reporting, the general is blind. No amount of brilliance helps.

---

## AI Also Needs Intelligence Reports

Working on my AI Agent project, I encountered a similar problem:

Agent is smarter than me. It remembers the entire database schema, handles multiple complex queries simultaneously, never gets tired or annoyed.

But all it gives me is a result: "There are 15 patients in the ward."

Is this result correct? How did it calculate this? Any errors along the way?

**I don't know. It's a black box.**

Like a general who only receives "we won" or "we lost" messages but doesn't know how the battle evolved. When something goes wrong, no idea which step failed.

---

## Making AI Write "Battle Reports"

The solution is simple: **make AI report its reasoning process**.

I added a Tool called `write_debug_report`:

```python
@tool(name="write_debug_report")
def tool_write_debug_report(self, content: str) -> str:
    """Write a debug report documenting the reasoning process."""
    path_enum.path_debug_report_md.write_text(content, encoding="utf-8")
    return f"Debug report written to: {path_enum.path_debug_report_md}"
```

Code is simple, but the effect is significant.

Now Agent writes a "battle report" every time it answers a question:

- What did user ask (mission objective)
- Which tables I analyzed (areas scouted)
- Which SQL I executed (actions taken)
- Query results (battlefield status)
- My reasoning (why this decision)
- Final answer (battle outcome)

With this "battle report," I went from "seeing only results" to "seeing the process."

---

## A Real Debugging Scenario

Example.

User asks: "How many new patients were admitted in the last week?"

Agent answers: "42 people."

Without debug report, I can only choose to believe or not believe.

With debug report, I can see:

```markdown
## Problem Analysis
User wants to know new admissions in the past week

## Query Strategy
1. Use admission table
2. Filter admission_time >= 7 days ago
3. Count records

## Executed SQL
SELECT COUNT(*) FROM admission
WHERE admission_time >= datetime('now', '-7 days')

## Query Result
42

## Reasoning Process
admission table records admission info, admission_time is admission time
Using datetime function to calculate 7 days ago...
```

Now I can verify:

- Right table? Yes, admission is the admission records table
- Right field? Yes, admission_time is admission time
- SQL logic correct? Yes, datetime function usage is correct
- Number correct? I can manually run it to confirm

**Black box became white box.**

---

## Engineering Implications

From an engineering perspective, this design solves several problems:

### 1. Debugging Becomes Possible

AI isn't like traditional code where error messages tell you which line broke. When AI is wrong, it confidently gives you a wrong answer.

With debug reports, you can trace the reasoning chain: which step misunderstood, which SQL was wrong, which logic had holes.

### 2. Testing Has a Basis

Traditional unit testing: input A, expect output B, compare results.

AI testing: need to compare results AND check reasoning process. Same output of 42, "guessed correctly" and "reasoned correctly" are different.

Debug reports give you the means to check reasoning process.

### 3. User Trust Can Be Built

In medical scenarios, nurses won't blindly trust a number from AI.

But if AI says: "I queried the admission table, filter was last 7 days, SQL was this, result was 42" — nurses can verify. Verification passes, trust is built.

---

## An Implementation Detail

One detail worth mentioning.

Initially I had Agent append reasoning process at the end of answers. But user experience was bad — users just want answers, not a wall of technical details.

Current approach: answer goes to user, debug report writes to separate file.

Like a general receiving two types of reports: a brief "we won" summary, and a detailed battle analysis report. Former for quick understanding, latter for staff debriefing.

**Layered processing, each takes what they need.**

---

## Broader Thinking

After building this feature, I thought of something broader:

> Managing intelligent systems and managing people have the same underlying logic.

For thousands of years, humans invented various management tools:

- Armies have intelligence reporting
- Companies have weekly reports
- Finance has audit processes
- Law has case archiving

These tools share the same essence: **make the managed party's behavior visible, traceable, and verifiable.**

AI arrives, we don't need to invent new management methods. We just implement these ancient wisdoms in code.

Making AI write debug reports is essentially making it write "intelligence reports."

Nothing mysterious — it's basic management science.

---

## Advice for Fellow Engineers

If you're also working on Agent projects, I strongly recommend adding debug report functionality from the start.

1. Doesn't need to be complex — a file-writing function is enough
2. Let Agent know in System Prompt what it should record
3. Format can be simple — key is coverage: input, reasoning, action, output

These 10 lines of code will save you dozens of hours of debugging.

Plus, when you demo your Agent to others, being able to open the debug report and say "this is its thinking process" — instant professionalism.
