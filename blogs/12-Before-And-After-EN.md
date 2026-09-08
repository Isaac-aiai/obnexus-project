# You Think Testing AI Means Testing the Process? Wrong

---

## A Testing Problem

My AI Agent can finally write data — assign beds, update predictions, create alerts, place orders.

Code done, I got stuck on a question:

**How do you test something like this?**

Regular functions are easy to test. `add(1, 1)` always returns `2`. Same every time. I can write `assert add(1, 1) == 2`.

But Agents are different. Ask it "find me an empty bed":

- First time it might query the bed table first, then the room table
- Second time it might query room first, then bed
- Third time it might use completely different SQL

Results are all correct, but the process differs.

You can't write:

```python
assert agent("find an empty bed") == "some specific sentence"
```

Because it says something different every time.

---

## What I Learned from Journalism

Thought about it for a while. Found the answer somewhere unexpected: **news fact-checking.**

How do journalists verify a report's accuracy?

They don't verify "how the reporter gathered information" — how many calls they made, how many sites they visited, how many people they talked to. Process is too complex. Every reporter does it differently.

What they verify is **results**:

- Report says "the company laid off 50%" → Check: did they really lay off 50%?
- Report says "CEO resigned" → Check: did the CEO really resign?
- Report says "stock dropped 20%" → Check: did it really drop 20%?

**Doesn't matter how the reporter got the information. As long as the final reported facts are accurate, it passes.**

AI Agents can be tested the same way.

---

## Before → Action → After

The core framework is just three steps:

| Step | What to Do | Analogy |
|------|------------|---------|
| Before | Check initial system state | What things looked like before the event |
| Action | Let Agent execute the operation | Reporter goes to investigate |
| After | Check final system state | Verify if the report is accurate |

Example with "transfer bed" functionality:

```python
# Before: Where is Zhang San now? Are there empty beds in postpartum?
before_bed = query("SELECT bed_id FROM admission WHERE patient_name='Zhang San'")
available_beds = query("SELECT * FROM bed WHERE room_type='postpartum' AND status='empty'")

# Action: Let Agent do the transfer
agent("Transfer Zhang San to postpartum ward")

# After: Did Zhang San actually end up in postpartum?
after_bed = query("SELECT bed_id FROM admission WHERE patient_name='Zhang San'")
assert after_bed in available_beds
```

The key here:

**I don't care how the Agent did it. I only care whether the system state is correct after it's done.**

Agent wants to query bed table first or room table first? Up to it. As long as Zhang San ends up in the right bed, it's correct.

---

## Why This Testing Approach Is Better

This method has several advantages:

### 1. Naturally Handles Uncertainty

Agent's "process" might differ each time, but the "result" is deterministic.

- Test process → fragile, prone to false positives
- Test result → robust, only cares about final state

### 2. Test Code Is Simpler

No need to mock Agent's internal behavior. No intercepting API calls. No verifying generated SQL.

Just query database state directly: what it looked like before, what it looks like after.

### 3. Regression Testing Works

If the Agent upgrades later (new model, changed prompt), as long as results are still correct, tests pass.

Internal implementation can change freely. Interface contract stays stable.

---

## An Engineering Detail

One detail worth mentioning: **test fixtures.**

Write operations change database state. Without isolation between tests, later tests get polluted by earlier ones.

Solution: restore database to initial state before each test:

```python
@pytest.fixture(autouse=True)
def reset_database():
    # Before each test
    restore_from_backup()
    yield
    # After each test (optional cleanup)
```

Like fact-checking: each time you verify a new piece of news, you start fresh, unaffected by previous checks.

---

## Extended Thinking: The Audit Problem

Testing solves "verifying correctness during development."

But there's another problem: **nobody runs tests in production.**

Agent might execute hundreds of operations daily after going live. How do you review when something goes wrong?

Like news organizations needing to keep interview recordings, raw files, edit history — **audit trails.**

AI Agents need the same:

- What operation was executed
- What prompt triggered it
- What was the result
- When did it execute

I researched this — the field is called Governance or Audit. The Strands framework has interfaces for writing logs to S3, DynamoDB, etc.

Didn't implement this time — current priority is getting Agent core working. But I noted this requirement. Must do before launch.

**Knowing what needs to be done matters more than doing it right now.**

---

## Summary

How to test systems with uncertainty:

> **Don't test process, test results. Before → Action → After.**

This framework applies beyond AI Agents. Any system that "changes world state" can be tested this way:

- Database writes: query → modify → query again
- API calls: pre-call state → call → post-call state
- Even business process improvements: before state → what changed → after state

Simple frameworks are often the most useful.
