# RepoInsight-AI

> AI-powered repository intelligence platform that analyzes software repositories and generates professional engineering reports covering architecture, code quality, maintainability, resume readiness, and interview preparation.

<p align="center">

🌐 **Live Demo:** https://repo-insight-ai-ab.vercel.app/

</p>

---

# Overview

RepoInsight-AI automatically analyzes software repositories and generates comprehensive engineering reports using Google's Gemini models.

Rather than simply summarizing source code, RepoInsight-AI performs repository traversal, static analysis, metadata extraction, architecture reasoning, and AI-powered engineering evaluation to provide actionable technical feedback similar to an experienced software engineer performing a design review.

Each generated report includes:

- Executive Summary
- Technology Stack Detection
- Repository Statistics
- Architecture Review
- Code Quality Assessment
- Engineering Strengths
- Engineering Weaknesses
- Actionable Improvement Recommendations
- Resume Highlights
- Interview Questions
- Downloadable Markdown Report

---

# Features

## Intelligent Repository Analysis

- Upload repositories as ZIP archives
- Automatic repository extraction
- Repository root detection
- Recursive repository traversal
- Repository metadata generation
- Smart source code filtering
- Programming language detection
- Framework detection

---

## Smart Repository Filtering

Before AI analysis, the platform automatically ignores unnecessary files including:

- `node_modules`
- `.git`
- `dist`
- `build`
- `.next`
- `coverage`
- generated artifacts
- binary assets

Only meaningful source code is processed, significantly reducing token usage while improving AI response quality.

---

## AI Engineering Review

Powered by **Google Gemini 2.5 Flash**

RepoInsight-AI evaluates:

- Software Architecture
- Folder Organization
- Code Quality
- Engineering Practices
- Maintainability
- Scalability
- Design Decisions
- Resume Readiness

Every AI response is validated before generating the final report.

---

## Professional Engineering Reports

Automatically generates structured engineering reports containing:

- Executive Summary
- Technology Stack
- Repository Statistics
- Architecture Review
- Code Quality Analysis
- Engineering Strengths
- Engineering Weaknesses
- Improvement Suggestions
- Resume Feedback
- Interview Questions

Reports can be downloaded as professional Markdown documents.

---

## Real-Time Analysis Progress

Provides live progress updates throughout the repository processing pipeline.

Stages include:

- Upload Validation
- Repository Extraction
- Repository Traversal
- Metadata Generation
- Static Analysis
- AI Context Building
- AI Review
- Response Validation
- Markdown Generation

---

## Intelligent Repository Validation

Supports two independent validation stages:

### Upload Limit

- Maximum ZIP Upload: **500 MB**

### Analysis Limit

- Maximum Analyzable Source Code: **50 MB**

This enables uploading repositories containing large dependency folders while analyzing only relevant source code.

---

## Robust Error Handling

Gracefully handles:

- Invalid ZIP archives
- Uploads larger than 500 MB
- Oversized repositories
- Corrupted archives
- AI service failures
- Network failures
- Invalid AI responses

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- Unzipper
- Zod

## AI

- Google Gemini 2.5 Flash

## Deployment

- Vercel
- Render

---

# Project Structure

```text
apps/
├── frontend/
└── backend/
```

The frontend provides the user interface and repository upload experience.

The backend performs repository processing, static analysis, AI orchestration, validation, progress tracking, logging, and report generation.

---

# Engineering Pipeline

```text
Repository ZIP
        │
        ▼
Upload Validation
        │
        ▼
Repository Extraction
        │
        ▼
Repository Traversal
        │
        ▼
Repository Filtering
        │
        ▼
Metadata Generation
        │
        ▼
Static Analysis
        │
        ▼
AI Context Builder
        │
        ▼
Gemini Engineering Review
        │
        ▼
Response Validation
        │
        ▼
Markdown Report Generation
        │
        ▼
Professional Engineering Report
```

---

# Running Locally

## Clone Repository

```bash
git clone https://github.com/AtulBoyal/ai-project-reviewer.git

cd ai-project-reviewer
```

## Install Dependencies

```bash
pnpm install
```

## Backend

```bash
cd apps/backend

npm run dev
```

## Frontend

```bash
cd apps/frontend

npm run dev
```

---

# Environment Variables

## Backend

```env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

# Screenshots

## Home Page

> *(Add Screenshot)*

---

## Generated Engineering Report

> *(Add Screenshot)*

---

## Repository Size Validation

> *(Add Screenshot)*

---

# Future Roadmap

## Version 1.1

- GitHub Repository URL Analysis
- Drag & Drop Uploads
- Improved Language Detection
- Repository Metrics Dashboard

## Version 1.2

- Repository Scoring
- Dependency Analysis
- Security Analysis
- Multi-Report Export

## Version 2.0

- User Authentication
- Saved Reports
- Analysis History
- GitHub OAuth
- Repository Comparison
- Team Workspaces
- Background Jobs
- CI/CD Integration
- Multi-LLM Support

---

# Why RepoInsight-AI?

Understanding an unfamiliar repository takes time—even for experienced software engineers.

RepoInsight-AI accelerates this process by combining repository analysis, static code analysis, and AI reasoning to generate structured engineering insights that help developers improve project quality, prepare for interviews, strengthen resumes, and understand unfamiliar codebases faster.

---

# License

MIT License
