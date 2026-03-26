# AI Product Copilot

> **Turns a plain English product idea into a complete, structured product plan in seconds — eliminating the blank page problem for Product Managers.**

🔗 **[Live Demo](https://ai-product-copilot-8wi07c8qq-prerna-pm.vercel.app)** &nbsp;|&nbsp; Built by [Prerna Singh](https://linkedin.com/in/prernasingh925) — Product Manager, AI & Enterprise Platforms

---

## The Problem

Product Managers spend 2–4 hours writing a first-draft PRD from scratch. It's the least creative part of PM work, yet it blocks everything downstream — engineering can't start, stakeholders can't review, and the PM is stuck in a blank document when they should be talking to users.

The blank page problem is real. This tool solves it.

**AI Product Copilot takes your product idea and generates a complete, structured product plan in seconds — so you can focus on refining the thinking, not formatting the document.**

---

## Who It's For

**Primary user:** Mid-level Product Managers working across multiple products simultaneously — the PM who knows what good looks like, has the domain knowledge, but is time-constrained and context-switching constantly.

They don't want AI to replace their thinking. They want AI to handle the structure so they can focus on the substance.

---

## What It Generates

Type your product idea + target users + industry. Get a 5-section product plan instantly:

| Section | What's Inside |
|---|---|
| **Problem Definition** | Problem statement, user pain points, target persona |
| **Product Requirements** | Core features, user journey, edge cases |
| **MVP Scope** | Must-have vs. nice-to-have, development phases |
| **Success Metrics** | North Star Metric, KPIs, experiment ideas |
| **Product Roadmap** | Phase 1 Now / Phase 2 Next / Phase 3 Later |

**Export to .docx** — shareable, editable, ready for stakeholder review.

---

## Why 5 Sections (Not 3, Not 7)

Every section exists for a reason:

- **Problem first** — aligns the team on *why* before specifying *what*
- **Separate MVP Scope** — forces prioritisation before any engineering discussion. Most PRD templates skip this and engineers scope incorrectly.
- **Success Metrics before Roadmap** — defines how success is measured before committing to a timeline. Most people do this backwards.
- **Now/Next/Later roadmap** — time-bound phases (Q1/Q2/Q3) become outdated the moment the document is shared. Now/Next/Later stays relevant regardless of when it's read.
- **Experiment ideas in Metrics** — moves beyond KPIs to testable hypotheses. Shows the PM is thinking about validation, not just measurement.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js + TypeScript | Production-grade React framework. Type safety reduces runtime errors. |
| Styling | Tailwind CSS | Rapid, consistent UI. No custom CSS overhead. |
| AI Engine | Google Gemini API | Free tier sufficient for prototype. Fast response times. |
| Export | Client-side .docx generation | PMs need editable output for stakeholder sharing. PDF would be read-only. |
| Deployment | Vercel | Zero-config CI/CD. API key security via environment variables. |
| Build Tool | Google Antigravity | AI-assisted development — zero lines of code written manually. |

---

## Why This Is Not a ChatGPT Wrapper

Four PM decisions differentiate this from a generic AI document generator:

**1. Structured inputs produce structured thinking**
Three explicit inputs — product idea, target users, industry — are required before generation. Adding these parameters in prompt v3 improved output relevance from ~50% to ~85%. Free-text "describe your product" would produce generic output.

**2. Industry-aware output**
The industry parameter calibrates the AI's language, benchmarks, and examples to the specific domain. A healthtech PRD looks different from a fintech PRD. Generic PRD generators ignore this entirely.

**3. Experiment ideas, not just KPIs**
Most AI tools stop at success metrics. Adding experiment ideas — testable hypotheses with variables — moves the output from measurement to validation thinking. This was added in prompt v7 after testing showed shallow experiment suggestions in earlier versions.

**4. Export is the product**
A plan that can't be shared is incomplete. The .docx export — editable, not read-only — is the moment the tool delivers real value. This was a deliberate product decision, not an afterthought.

---

## Prompt Engineering — 8 Iterations

The AI prompt is the product engine. Getting it right required the same discipline as writing a PRD.

| Version | Problem Found | Fix Applied |
|---|---|---|
| v1 | Output was unstructured prose | Added strict 5-section format requirement |
| v2 | Sections were inconsistent length | Added word count guidance per section |
| v3 | Pain points were generic, not persona-specific | Added target users and industry as explicit input parameters |
| v4 | Success metrics were vague | Required specific North Star Metric format with unit |
| v5 | Roadmap had dates that aged poorly | Switched to Now/Next/Later framework |
| v6 | Edge cases missing from PRD | Made edge cases a mandatory subsection |
| v7 | Experiment ideas were shallow ("run an A/B test") | Added testable hypothesis requirement with specific variables |
| v8 (final) | All sections consistent and complete | Prompt finalised |

---

## Measurement — 10 Test Inputs

After building, I ran 10 test inputs across 5 industries to validate output quality:

| Metric | Target | Result |
|---|---|---|
| Section completeness | 5/5 sections on every run | 5/5 on all 10 runs ✅ |
| Output relevance | >80% industry-specific language | ~85% on clear inputs ✅ |
| NSM quality | Specific + measurable | Present in 10/10 runs, specific in 8/10 ⚠️ |
| Edge case handling | Graceful on minimal input | 9/10 passed, 1 very short input was generic ⚠️ |
| Time to first output | <15 seconds | Avg 6.8 seconds ✅ |

> **Key learning:** The metrics quality gap (2/10 runs had vague NSMs) directly shaped prompt v7. Without measuring, I would have missed the weakest section — which is also the one PMs care most about in interviews.

---

## Sample Output

**Input:**
- Idea: "A habit tracker that helps remote workers maintain work-life balance"
- Target users: "Remote workers aged 25–35"
- Industry: "Health & Wellness"

**Output includes:**
- Problem: Remote workers have no physical separation between work and rest, leading to burnout and declining productivity
- NSM: Daily active users who log at least one balance check-in per day
- MVP: Core habit logging + end-of-day reflection prompt + weekly summary
- Experiment: IF we send a personalised end-of-day nudge at the user's chosen time THEN D7 retention will improve by 15% BECAUSE it creates an external cue that reinforces the habit loop

---

## Roadmap

**Shipped (v1.0)**
- ✅ 5-section product plan generation
- ✅ Industry and persona parameters
- ✅ Export to .docx
- ✅ 3 inspiration examples on the input screen (reduces blank page friction)
- ✅ Vercel deployment

**Next (v2.0)**
- 🔲 Save & history — store generated plans, reference past work
- 🔲 Inline edit mode — make it a collaborative document, not just a generator
- 🔲 Team sharing with comments
- 🔲 Export to Notion page / Confluence template / JIRA epic structure

**Later (v3.0 — Multi-Agent)**
- 🔲 Agent 2: User Story Writer — takes the PRD, generates JIRA-ready user stories with acceptance criteria
- 🔲 Agent 3: Competitor Analyser — searches and summarises competing products for the given idea
- 🔲 Agent 4: OKR Generator — turns the success metrics into properly formatted OKRs

---

## Running Locally

```bash
git clone https://github.com/prernasingh925/ai-product-copilot
cd ai-product-copilot
npm install
```

Create a `.env.local` file:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

```bash
npm run dev
```

Open `http://localhost:3000`

> Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

---

## The PM Behind This

This project was built to demonstrate AI product thinking from the PM perspective — not as a showcase of coding ability, but as a showcase of product specification, prompt engineering, output design, measurement, and iteration.

The blank page problem affects every PM. I built the tool I wished I had.

---

**Prerna Singh** — Product Manager, AI & Enterprise Platforms

- 🔗 [LinkedIn](https://linkedin.com/in/prernasingh925)
- 📧 prerna.singh1990@yahoo.in
- 💻 [GitHub](https://github.com/prernasingh925)

*Built using Google Antigravity and AI-assisted development. Zero lines of code written by hand. All product thinking, prompt design, output specification, and QA by me.*
