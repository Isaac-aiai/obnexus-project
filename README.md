# obnexus — AI Agent for OB/GYN Ward Operations

An intelligent AI agent that helps healthcare staff manage obstetrics and gynecology ward operations through natural language conversations. Built as a hands-on learning project for AI Agent development.

![Chat Interface](img/13-Connect-UI-To-Agent/01-chat-interface.png)

---

## Why Healthcare Operations Need AI Agents

### The Challenge: Complex and Tedious Logistics

Healthcare operations logistics is one of the most complex domains in any organization. In a hospital, staff must constantly juggle:

- **Bed Management**: Tracking bed availability across different room types (triage, labor & delivery, postpartum, OR), coordinating patient flow, and optimizing occupancy rates
- **Patient Transfers**: Moving patients between rooms based on their care stage, ensuring continuity of care, and updating all relevant systems
- **Discharge Planning**: Predicting length of stay, coordinating with multiple departments, and preparing beds for incoming patients
- **Resource Allocation**: Scheduling procedures, assigning providers, managing equipment availability, and handling emergencies
- **High-Risk Monitoring**: Tracking vital signs, identifying concerning trends, creating alerts, and ensuring timely interventions

This data typically lives in **Hospital Information Systems (HIS)** — the backbone software that manages administrative, financial, and clinical aspects of hospital operations. Patient clinical data is stored in **Electronic Health Records (EHR)** systems.

### The Solution: AI Agents with Database Access

Traditional software requires staff to navigate complex menus, fill out forms, and understand database schemas. AI agents change this paradigm:

1. **Natural Language Interface**: Staff can simply describe what they need in plain language
2. **Autonomous Query Planning**: The agent understands intent and decides which tables to query
3. **Safe Write Operations**: The agent can execute approved operations (bed assignments, order creation) with proper validation
4. **Contextual Understanding**: The agent knows hospital workflows and can guide staff through complex processes

![Agent Capabilities](img/13-Connect-UI-To-Agent/02-what-can-i-do.png)

### What This Agent Can Do

Our obnexus agent demonstrates these capabilities:

| Category | Examples |
|----------|----------|
| **Query** | Ward status, bed availability, patient census, high-risk patients |
| **Predict** | Length of stay estimation, discharge time prediction |
| **Execute** | Bed assignments, patient transfers, order creation, alert generation |
| **Coordinate** | Shift handover summaries, procedure scheduling, provider assignments |

![Agent Chat Example](img/13-Connect-UI-To-Agent/OB-GYN-wards-operation-agent-chat-example.png)

---

## Architecture

```
[ Architecture Diagram Placeholder ]

+------------------+     +------------------+     +------------------+
|    Frontend      |     |    Backend       |     |    Database      |
|  Next.js + React | --> |  FastAPI + Agent | --> |  PostgreSQL      |
|  Vercel AI SDK   | <-- |  Strands Agents  | <-- |  (SQLite local)  |
+------------------+     +------------------+     +------------------+
         |                       |
         |                       v
         |               +------------------+
         |               |    AWS Bedrock   |
         |               |  Claude / LLM    |
         +-------------> +------------------+
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 + React 19 + TypeScript | Modern web application framework |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS with accessible components |
| **AI Interface** | Vercel AI SDK for React | Streaming chat UI with reasoning display |
| **Backend** | FastAPI + Python 3.12 | High-performance async API server |
| **Agent Framework** | Strands Agents (AWS) | Lightweight agent SDK (simpler than LangChain) |
| **LLM** | AWS Bedrock (Claude) | Enterprise-grade LLM with tool use |
| **Database** | PostgreSQL (prod) / SQLite (local) | Relational database with sync mechanism |
| **Deployment** | Vercel | Serverless deployment platform |
| **Package Management** | pnpm (Node) + uv (Python) | Fast, disk-efficient package managers |
| **Dev Tools** | mise-en-place | Polyglot runtime version manager |
| **AI Assistant** | Claude Code + Custom Skills + MCP | Development workflow automation |

### Why These Choices?

- **Strands Agents over LangChain**: Simpler, more predictable, native AWS integration
- **Vercel AI SDK**: First-class support for streaming responses and reasoning display
- **PostgreSQL + SQLite**: Production-ready database with fast local development
- **mise**: Single tool to manage Node.js, Python, and project tasks

---

## Getting Started

### Prerequisites

Install [mise](https://mise.jdx.dev/) — a development tool version manager that automatically installs Node.js, Python, and other dependencies.

```bash
# macOS
curl https://mise.run | sh

# Or follow instructions at https://mise.jdx.dev/getting-started.html
```

### Step 1: Clone and Install Dependencies

```bash
cd obnexus-project

# Install all dependencies (Node.js + Python)
mise run inst
```

### Step 2: Configure Environment

Create a `.env` file in the project root:

```bash
# Database (NeonDB PostgreSQL)
DB_HOST=ep-xxx-pooler.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASS=your_password
DB_NAME=neondb

# AWS Bedrock
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
```

### Step 3: Download Local Database (Optional)

For local development without cloud database:

```bash
.venv/bin/python scripts/test_download_sqlite_file.py
```

This downloads a SQLite snapshot to `tmp/data.sqlite`.

### Step 4: Start Development Servers

```bash
mise run dev
```

This starts:
- **Next.js frontend** at http://localhost:3000
- **FastAPI backend** at http://localhost:8000

### Step 5: Open the Chat Interface

Navigate to http://localhost:3000/chat and start chatting with the agent!

---

## Project Structure

```
obnexus-project/
├── api/                    # FastAPI backend
│   └── index.py           # Main API endpoints
├── app/                    # Next.js frontend
│   └── chat/              # Chat page
├── components/            # React components
│   └── chat/              # Chat UI components
├── obnexus/     # Python core library
│   ├── one/               # Main class with mixins
│   ├── db_schema/         # Database schema extraction
│   ├── prompts/           # Agent system prompts
│   └── write_operations.py # Database write functions
├── scripts/               # Test and utility scripts
├── tests_python/          # Python unit tests
├── tests_node/            # Node.js tests
├── docs/                  # Documentation
│   ├── dev-guide/         # Developer guides (CN)
│   └── tutorials/         # Step-by-step tutorials
└── tmp/                   # Temporary files (gitignored)
```

---

## Available Commands

```bash
# Development
mise run dev              # Start all dev servers
mise run kill             # Stop all dev servers

# Testing
mise run test             # Run all tests
mise run test-python      # Run Python tests only
mise run test-node        # Run Node.js tests only

# Dependencies
mise run inst             # Install all dependencies
mise run inst-python-deps # Install Python only
mise run inst-node-deps   # Install Node.js only

# Database
.venv/bin/python scripts/test_run_sql_locally_cli.py --sql "SELECT * FROM patient LIMIT 5"
```
