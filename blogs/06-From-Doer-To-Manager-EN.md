# I Had It Completely Backwards

---

When I started working on this AI Agent project, I fell into a trap.

I was thinking: how do I teach AI to write SQL?

I actually started listing rules — "use BETWEEN for dates," "remember JOIN for multi-table queries," "field names use underscores not camelCase"...

Halfway through I realized something was off. This list would be endless. And honestly, my own SQL wasn't that great. How was I supposed to "teach" an AI?

Then my mentor said something that clicked:

> "AI doesn't need you to teach it SQL. It already knows. It knows more than you do."

So where was the problem?

---

## The Real Problem

The issue wasn't that AI can't write code. The issue was **it didn't know what my database looked like**.

It's like a transfer student.

Their math foundation is solid — they know all the theorems and formulas. But give them a word problem and they're stuck — because they don't know the background. The problem says "distance between A and B is 500 km," they don't know what A and B are. It says "Xiaoming's speed is 60 km/h," they don't know who Xiaoming is.

AI is the same way.

You ask it "find all high-risk patients" — it doesn't know what criteria define high-risk. Your database has a `risk_level` field, it doesn't know. The values are 'high', 'medium', 'low', it doesn't know that either.

**Plenty of capability, missing information.**

---

## Give It "Background Knowledge" Like a Teacher

Once I understood this, the approach became clear.

I didn't need to teach AI how to write SQL. I needed to **tell it what my database looks like**.

Just like a good teacher doesn't assume students know everything. They provide background first:

- "A is Beijing, B is Shanghai"
- "Xiaoming rides a bicycle, relatively slow"
- "This problem is about pursuit"

With that background, the student can solve it themselves.

Same with AI. I give it this information:

- "Your database has 11 tables"
- "Patient info is in the `patient` table"
- "High-risk marking is in `ob_profile.risk_level`, values are 'high' or 'low'"

With this, it can write correct SQL on its own.

---

## How to Pass Information Efficiently

But there's a problem: database structure information is extensive. 11 tables, dozens of fields, each with types, constraints, relationships... writing it all out is thousands of words.

Give all of it to the AI? You could, but it's wasteful.

It's like teaching a class. You don't read the entire textbook aloud. You **highlight key points**: these pages matter, this formula will be on the test, this example is important.

The code does the same thing.

Original database definition looks like this:

```sql
CREATE TABLE patient (
    patient_id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Compressed, it becomes:

```
patient(patient_id:int*PK, name:str*NN, age:int, created_at:ts)
```

No information lost, 70% shorter.

This is the trick for **giving AI reading comprehension**: high information density, minimal fluff, clear priorities.

---

## A Mindset Shift

After this lesson, I had a significant realization:

**The core skill for using AI isn't programming — it's information organization.**

Before, when I coded, my mindset was "I do it" — I write functions, I call APIs, I debug.

Now with AI, the mindset needs to shift to "I provide information" — I organize the database structure, clarify business rules, spell out constraints.

It's like going from student to teacher.

Students care about "how do I solve this problem." Teachers care about "how do I explain the background so students can solve it themselves."

Using AI means being the AI's teacher.

---

## For People Just Starting Out

If you're also learning AI Agent development, here's what I'd share:

**Don't try to "teach" AI how to do things.**

AI is smart enough. Most skills it already has. What you need to do:

1. Figure out what information it's missing
2. Organize that information into a clear, compact format
3. Provide it at the right moment

This skill will become increasingly important.

You're not just passing database schema to AI — you'll pass code context, conversation history, business rules. It's all the same thing: **efficiently deliver the information AI needs**.

---

## What I'm Taking Away

The biggest change from this lesson isn't learning how to extract Schema. It's realizing a role shift:

**From "person who does things" to "person who manages information."**

I used to think the core programmer skill was writing code.

Now I think the core skill in the AI era might be **organizing and transmitting information**.

AI can help write code. But how to organize information, when to provide it, how much to give — those judgments still require humans.

That's my early-career perspective on "how to work in the AI era."

Hope it's helpful to others on the same learning path.
