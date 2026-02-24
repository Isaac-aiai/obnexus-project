# How I Got Stuck on Window Functions for Two Hours

---

Last week a SQL query had me stuck for two hours.

The requirement sounded simple: get the **latest** vital sign record for each patient.

I knew the data table had multiple records per patient (measured every 4 hours). I just needed the most recent one.

First instinct: `GROUP BY`.

Wrote it, ran it, didn't work — `GROUP BY` only returns grouped fields and aggregates. The actual values I wanted — blood pressure, heart rate, fetal heart rate — were gone.

Searched around. Apparently I needed window functions.

Then I saw this line of code:

```sql
ROW_NUMBER() OVER (
    PARTITION BY admission_id
    ORDER BY recorded_at DESC
) AS rn
```

Stared at it for five minutes. More staring, more confusion.

What's `OVER`? What's `PARTITION BY`? Why is there an `ORDER BY` inside parentheses?

I read three tutorials. Every one explained syntax definitions. None of them actually made me understand what was happening.

---

## The Journalist's Verification Method

Then I switched approaches.

A journalist friend once told me about their fact-checking principle: **don't just take someone's word for it — verify it yourself.**

If a news story says "Company X laid off 50%," you can't just use that. You ask: where's the source? Any internal documents? Can you find an affected employee to confirm?

Every detail needs to be traceable.

I figured learning this SQL was the same. Instead of reading explanations, I should **verify**.

So I ran an experiment: **delete `PARTITION BY` and see what changes.**

---

## One Experiment Solved the Mystery

SQL without `PARTITION BY`:

```sql
SELECT *,
  ROW_NUMBER() OVER (ORDER BY recorded_at DESC) AS rn
FROM vital_signs
```

Ran it — the entire table's records got numbered sequentially. 1, 2, 3, 4... all the way to the end.

Added `PARTITION BY` back and ran again:

```sql
SELECT *,
  ROW_NUMBER() OVER (
    PARTITION BY admission_id
    ORDER BY recorded_at DESC
  ) AS rn
FROM vital_signs
```

This time each patient's records were **numbered separately**. Patient A: 1, 2, 3. Patient B: also 1, 2, 3. Independent.

Comparing the two results, I immediately understood:

**`PARTITION BY` is saying — slice the table into separate windows, number within each window.**

Like a journalist fact-checking multiple sources: you don't mix all information together and sort. You group by source, then sort by time within each group.

---

## Why Tutorials Didn't Work

Looking back, why didn't those tutorials help?

Because they were **telling me definitions** instead of **letting me verify**.

"PARTITION BY divides the result set into partitions" — syntactically correct, but meaningless to me.

What actually made me understand was: I **saw** the difference between having and not having `PARTITION BY`.

It's like fact-checking a story: you can read ten reposts all saying "Company X laid off 50%," but you're still not sure. Until you get the internal memo or interview someone affected, you can't really say "I know."

**Verified knowledge is the only knowledge you truly own.**

---

## A Useful Learning Pattern

From this experience, I've extracted a learning pattern:

1. **Start with a real problem** — not "I want to learn window functions," but "I need to get each patient's latest record"
2. **When stuck, design an experiment** — change one variable, see what differs
3. **Verify by comparison** — let facts speak, don't just trust explanations
4. **Write conclusions in your own words** — not copied from tutorials

This method works beyond SQL. Any technical concept — if you only read without verifying, you stay in the "kind of get it" state forever.

Run it yourself. Change parameters. See results. **Ten minutes of experimentation beats an hour of reading tutorials.**

---

## For Fellow Engineers

If you're stuck on some technical concept, try this:

1. Write a minimal example
2. Delete the part you don't understand, see what changes
3. Add it back, compare both results
4. Summarize for yourself: what is this thing actually doing?

Sounds dumb, but it's effective.

Journalists don't fact-check by being clever — they do it with **patience and method**. Learning tech is the same.

---

## Postscript

I've since used this method to understand several other concepts that were fuzzy before: the difference between `OUTER JOIN` and `INNER JOIN`, `HAVING` vs `WHERE`, CTEs vs subqueries...

Same pattern every time: minimal example, change one variable, compare results.

Probably the most practical learning technique I've picked up from this project.

Sharing it with fellow engineers still being tortured by various syntax concepts.
