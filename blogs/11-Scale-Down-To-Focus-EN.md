# Three Principles for Tech Choices When You're Just Starting Out

---

## The "Learn Everything" Trap

Tech people have this tendency: we want to learn everything.

See AWS RDS? Add it to the list. Security Groups? List. VPC, Subnet, IAM Roles — everything goes on the learning list.

I used to be exactly like this. Result: a simple "sync data to the cloud" task turned into a massive infrastructure project. Hadn't written a line of code yet, already drowning in ops knowledge.

This time, working on my AI Agent project, I made a deliberate choice to do things differently.

Here are three principles that might help if you're in a similar spot.

---

## Principle One: Only Buy the Capabilities You Need

Think about how athletes train.

A sprinter needs explosive power, starting technique, finishing form. They don't need marathon endurance, swimming technique, or gymnastic flexibility.

Try to train everything, and you'll excel at nothing.

What does my AI Agent project actually need?

**A cloud database I can connect to. That's it.**

It doesn't care which availability zone the database runs in. Doesn't care how Security Groups are configured. Doesn't care if the Subnet is public or private.

It just needs a connection string.

So I chose NeonDB:

| Feature | Value |
|---------|-------|
| Serverless | No server management |
| Scale to Zero | No cost when idle |
| 3-minute setup | Sign up → Create → Get connection string |

If I'd gone with RDS, I'd be configuring VPCs, Security Groups, Subnets... Powerful, sure. But I don't need it right now.

**Buy the capabilities you need. Not the ones that "might be useful."**

---

## Principle Two: Separate Learning Zone from Work Zone

Here's a deliberate decision I made: **this project doesn't include learning ops.**

It's not that I can't. I've configured VPCs and IAM Roles in other projects.

But I don't want to bring that complexity into this project.

Why?

Because this project's core is **the AI Agent**. What I need to figure out: how to make the Agent understand the database, how to make it generate correct SQL, how to make it safely execute write operations.

Ops is a different training project entirely.

Like a sprinter doesn't practice swimming during sprint training. You can train both, but not at the same time.

**Work zone focuses on the core problem. Learning zone gets scheduled separately.**

---

## Principle Three: Simplify Tools, Not Principles

Simplifying doesn't mean lowering standards.

Some things can be simplified (use NeonDB instead of self-hosted database). Some principles must stay.

Like: **idempotency.**

Non-idempotent sync scripts are painful:

```python
# Not idempotent
def sync():
    for row in local_data:
        INSERT INTO ...  # Second run: primary key conflict!
```

Idempotent approach:

```python
# Idempotent
def sync():
    DROP TABLE IF EXISTS ...
    CREATE TABLE ...
    INSERT INTO ...
```

Run it any number of times, same result.

Tools can be simplified (NeonDB instead of RDS). But idempotency as a principle can't be skipped. That's basic production code hygiene.

**Simplify the tools, keep the principles.**

---

## A Mental Model: Scale to Zero

NeonDB has this feature called Scale to Zero: database goes dormant after 5 minutes of inactivity, wakes up in milliseconds when the next request comes. No charges during sleep.

This feature perfectly describes the early-stage mindset:

> **Scale down what you don't need to zero. Save resources for what actually matters.**

Database sleeps when idle. Builder focuses when choosing tools.

Is ops knowledge important? Yes. But now isn't the time to learn it. When the project goes live, users grow, availability requirements increase — that's when to learn. You'll have real scenarios and motivation then. Learning will stick better.

Learning it now just fragments attention.

---

## Advice for People Just Starting Out

If you're making early tech choices, these three principles might help:

1. **Only buy what you need** — don't pay for "might be useful"
2. **Separate learning zone from work zone** — core business and skill building are different tracks
3. **Simplify tools, not principles** — use managed services to save time, but don't lower code quality standards

This isn't laziness. It's **deliberately controlling complexity.**

Beginners often feel like learning more is always better. But the truly capable people are the ones who can judge priorities.

Knowing what not to do right now — that's a skill too.

---

## Personal Reflection

As someone fresh out of school, I used to think "simplifying" meant compromising — that you only simplify when you're not capable enough.

Now I think "simplifying" is a choice — you simplify when you've understood the priorities.

Early in your career, focusing energy on core skills is more valuable than learning a little of everything.

Scale Down to Focus. It's not just a database strategy. It's a personal growth strategy.
