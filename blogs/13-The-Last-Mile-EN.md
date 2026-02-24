# The Last Mile from "It Runs" to "It's Usable"

---

## A Problem Every Tech Team Faces

Last week I hit a wall.

My AI Agent worked beautifully in the terminal. Query database, write reports, answer questions — all the features were there.

But my mentor asked: **"Besides you, who's going to use this thing?"**

I paused.

Fair point. Regular users see a command line and think: "What is this? How do I use it?"

This is the trap many tech teams fall into: **code works, but the product isn't done.**

---

## Tech Thinking vs Product Thinking

Engineers easily fall into a misconception: code runs = done.

But from a product perspective, these are completely different things:

| Tech Thinking | Product Thinking |
|--------------|-----------------|
| Does the code run? | Can users use it? |
| Are features complete? | Is the experience friendly? |
| Is the architecture elegant? | Can users understand it? |

It's like teaching.

A professor might have deep expertise in some theory (technical capability), but in class, students understand nothing — because they didn't consider students' background knowledge, learning pace, attention curve.

**Content is right, delivery is wrong.**

Code is the same. Features are right, user experience is wrong — product isn't done.

---

## First Design Decision: Information Layering

After connecting Agent to a Web UI, I faced my first design decision.

Agent isn't a regular chatbot. It "thinks" — analyzes problems, queries databases, calls tools, reasons through results. Should these intermediate steps be shown to users?

First instinct: forget it, too messy, just show the final answer.

But then I thought: **if I were the user, would I want to know how the AI reached its conclusion?**

Answer: **sometimes yes, sometimes no.**

- Just want a quick answer? Don't want to see reasoning
- Answer seems off and want to verify? Need to see how it thought

Different users, different scenarios, different needs.

---

## Solution: Collapsible Thinking Blocks

Final design was a collapsible "Thinking" block:

- Collapsed by default, shows only final answer
- User wants details, one click to expand
- Don't want to see it, leave it folded

```tsx
const ReasoningBlock = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="border rounded-lg">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <span>Thinking</span>
      </button>
      {isExpanded && <div>{text}</div>}
    </div>
  );
};
```

Code is simple, but the design principle behind it matters:

> **Don't decide for users. Give them the choice.**

Like good teaching design: provide core content, but also provide entry points to go deeper. Students who want depth can click in. Students who just want the key points stick with the main line.

---

## Second Design Decision: Separation of Concerns

Implementing this feature, there was another engineering decision to make.

Agent's response content is mixed together — `<thinking>` tags wrap the reasoning process, followed by the answer.

Just throw this blob at the frontend? Could work, but frontend would struggle to handle it.

Better approach: **backend does the separation**:

```python
# Collect all thinking
all_thinking = []
for msg in messages:
    thinking_matches = re.findall(r"<thinking>(.*?)</thinking>", text)
    all_thinking.extend(thinking_matches)

# Extract clean answer
final_answer = re.sub(r"<thinking>.*?</thinking>", "", last_text)
```

Backend separates thinking from answer. Frontend receives structured data. Rendering becomes simple:

- thinking → collapsible block
- answer → normal display

That's **separation of concerns**. Backend handles data processing. Frontend handles display. Each layer does one thing.

---

## Lessons for Tech Teams

From developing this feature, a few points useful for teams:

### 1. Define What "Done" Means

"Code runs" isn't done. "Users can use it" is done.

This definition needs to be clear at project start. Otherwise teams easily stop at "technically complete" and call it a day.

### 2. Expose Engineers to User Feedback

Engineers easily think from their own perspective: "This feature is so cool! The implementation is so elegant!"

But users don't care about elegant implementation. Users only care: **can I use it, is it easy to use.**

Letting engineers see how users actually use the product (or fail to use it) beats any training.

### 3. Ask "What Types of Users Are There" When Designing

This collapsible design essentially recognized two user types:

- Users who only want results
- Users who want to see the process

Consider only one type, and the design skews. Identifying user segments is where good design starts.

---

## Personal Reflection

As someone fresh out of school, this experience taught me something:

> **Between "it runs" and "it's usable" lies a gap called "product."**

Crossing this gap doesn't require more code. It requires a different way of thinking:

- From "how my code runs" to "how users use it"
- From "features complete" to "experience friendly"
- From "I think it's good" to "users think it's good"

That's probably the first step from tech thinking to product thinking.

Next, I need to deploy this product to the cloud so anyone can access it via a link.

From "runs on my computer" to "the whole world can use it" — another gap.

But crossing it is what makes something a real product.
