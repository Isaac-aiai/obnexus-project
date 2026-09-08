# Organizing Data Like Filing Case Documents

---

Centuries ago, courts faced a problem: too many case files.

A single case might involve plaintiffs, defendants, witnesses, physical evidence, testimonies, judgments... pile it all together and finding anything takes forever. Eventually people learned to categorize: personnel go in personnel volumes, evidence in evidence volumes, testimonies in testimony volumes. Each category in a standard format, linked by case numbers.

That was the beginning of records management.

When I learned databases today, I realized programmers use the same approach — except we call them "tables" instead of "case volumes."

---

## Databases Turned Out to Be Simple

Before this lesson, my impression of databases was: heavy enterprise stuff. Install servers, configure ports, maybe buy licenses for the serious ones. Something you only use in "real projects."

Then what happened?

My mentor had me run one command:

```bash
mise run download-db
```

A few seconds later, a `.sqlite` file downloaded to my machine.

Then he said: **That's the database.**

I blinked. A file? That's it?

No server. No ports. No username/password. One file is a complete database. I could copy it to a USB drive, move to another computer, and it would just work.

I realized: databases aren't as scary as I thought. At their core, they're just **organized file management**.

---

## Eleven Volumes

Opening this database, I found 11 tables:

| Table | What it records |
|-------|-----------------|
| patient | Patient files |
| provider | Medical staff |
| room | Room information |
| bed | Bed status |
| admission | Admission records |
| shift | Shift schedules |
| medical_order | Medical orders |
| vital_sign | Vital signs |
| labor_progress | Labor progress |
| ob_profile | OB profiles |
| alert | Alert records |

This is data from an OB/GYN hospital. Imagine if it were all mixed together.

Picture it: patient info, bed status, doctor schedules, medication records, labor progress, alerts... all in one giant table. Finding a patient's admission time means first filtering out scheduling records. Checking a bed's status means skipping past medical orders.

That's like dumping all case files in one room unsorted. You *can* find things. But it's exhausting.

Split into 11 tables:

- `patient` only tracks who the patient is
- `bed` only tracks where beds are
- `admission` only tracks who checked in
- `alert` only tracks what's abnormal

**Each table is an independent case volume, responsible for one thing.**

Need to link information? Use IDs. Just like case files using case numbers to connect different volumes.

---

## Why This Matters for Beginners

As someone new to databases, here's what I've realized: **good structure lowers the learning barrier**.

If this database were one giant table with dozens of fields mixed together, I wouldn't know where to start.

But split into 11 tables, each with just a few fields, I can explore one by one: first look at `patient` to understand patient records, then `bed` to understand how beds are tracked, then `admission` to see how they connect.

**Complex systems decomposed into simple parts.**

This decomposition doesn't make things more complicated — it makes learning possible.

---

## Two Layers of Simplicity

Today I saw two kinds of "simple":

**First layer: tool simplicity.**

SQLite made the database a single file. No servers to install, no networks to configure. Download and use. For beginners, this means focusing on "what does the data look like" rather than "how do I get the database running."

**Second layer: design simplicity.**

The 11-table structure makes complex business understandable. Like courts categorizing case files — each category answers one question.

These two layers work together. Good tools lower the entry barrier. Good design makes complex problems decomposable.

---

## What I'm Taking Away

I used to think "simple" was a compromise — fewer features, therefore simple.

Today I learned: **simple is a capability**.

Taking complex things and decomposing them so people can understand step by step — that requires the designer to deeply understand the domain and make deliberate choices.

SQLite's creator chose "one file" as the design, letting everyone worldwide start with zero cost.

This hospital database designer chose "11 tables" as the structure, making complex medical operations orderly.

For anyone starting to learn tech, maybe this is worth remembering:

**If something looks complex, it might not be inherently complex — it might just not be well decomposed yet.**

Find the right decomposition, and complex becomes simple.
