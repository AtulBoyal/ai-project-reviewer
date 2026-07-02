# AI Project Reviewer

> AI-powered engineering review platform that analyzes software repositories and generates professional architecture reviews, code quality reports, resume feedback, interview questions, and actionable engineering recommendations.

<p align="center">


🌐 Website: **(https://ai-project-reviewer-ab.vercel.app/)**

</p>

---

## Overview

AI Project Reviewer automatically reviews software repositories using Google's Gemini models and produces a comprehensive engineering report similar to what an experienced Staff Software Engineer would provide during a technical design review.

Instead of simply summarizing a repository, the platform performs repository analysis, static analysis, architecture evaluation, engineering reasoning, and generates professional recommendations that help developers improve their projects.

The generated report includes:

- Project Summary
- Technology Stack Detection
- Architecture Review
- Folder Structure Evaluation
- Code Quality Analysis
- Engineering Strengths
- Engineering Weaknesses
- Actionable Improvement Suggestions
- Resume Feedback
- Interview Questions
- Downloadable Markdown Report

---

## Features

### Repository Analysis

- Upload any Git repository as a ZIP archive
- Automatic repository extraction
- Repository traversal
- Intelligent repository filtering
- Ignores generated folders like:
  - `node_modules`
  - `.git`
  - `dist`
  - `build`
  - `coverage`
- Detects programming languages
- Detects frameworks
- Extracts repository metadata

---

### AI Engineering Review

Powered by **Google Gemini 2.5 Flash**

The AI reviews:

- Software Architecture
- Folder Organization
- Engineering Practices
- Code Quality
- Design Decisions
- Scalability
- Maintainability
- Resume Readiness

The generated output is validated before being returned.

---

### Professional Report

Generates a structured engineering report containing:

- Executive Summary
- Technology Stack
- Architecture Review
- Folder Structure Score
- Code Quality Score
- Strengths
- Weaknesses
- Engineering Recommendations
- Resume Review
- Interview Questions

Reports can also be exported as Markdown.

---

### Smart Progress Tracking

Real repository progress instead of fake loading bars.

Stages include:

- Uploading Repository
- Extracting Repository
- Reading Repository
- Building Metadata
- Static Analysis
- AI Review
- Response Validation
- Markdown Generation

---

### Intelligent Repository Filtering

Before sending anything to Gemini:

- Generated folders are ignored
- Binary assets are skipped
- Large files are skipped
- Only analyzable source code is processed

This reduces cost while improving AI quality.

---

### Error Handling

Gracefully handles:

- Invalid ZIP files
- Uploads larger than 500 MB
- Repositories with more than 50 MB of analyzable source code
- AI service failures
- Invalid AI responses
- Automatic AI response repair

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide Icons

### Backend

- Node.js
- Express
- TypeScript
- Multer
- unzipper
- Zod

### AI

- Google Gemini 2.5 Flash

---

## Project Structure

```
apps/
├── frontend/
│
└── backend/
```

Frontend contains the user interface.

Backend handles repository processing, AI orchestration, validation, logging and report generation.

---

## Engineering Pipeline

```
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
Context Builder
        │
        ▼
Gemini Review
        │
        ▼
JSON Validation
        │
        ▼
Response Repair (if needed)
        │
        ▼
Markdown Generation
        │
        ▼
Engineering Report
```

---

## Running Locally

### Clone

```bash
git clone https://github.com/AtulBoyal/ai-project-reviewer
cd ai-project-reviewer
```

### Install

```bash
pnpm install
```

### Backend

```bash
cd apps/backend
npm run dev
```

### Frontend

```bash
cd apps/frontend
npm run dev
```

---

## Environment Variables

Backend

```
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

### Generated Engineering Report

> *(Add Screenshot)*

---

### Repository Size Validation

> *(Add Screenshot)*

---

## Future Roadmap

### Version 1.1

- GitHub Repository URL support
- Drag-and-drop uploads
- Better language detection

### Version 1.2

- Multi-file Markdown export
- Repository statistics dashboard
- Improved AI prompting

### Version 2.0

- User Authentication
- Saved Reports
- Analysis History
- GitHub OAuth
- Multi-LLM Support
- Team Workspace
- Repository Comparison
- CI/CD Integration

---

## Why I Built This

Recruiters often spend only a few minutes reviewing projects, while developers rarely receive detailed engineering feedback beyond linting and automated tests.

AI Project Reviewer was built to bridge that gap by providing repository-level engineering reviews, architecture insights, and actionable recommendations using modern large language models.

The goal is to help developers improve both their software engineering skills and the quality of projects they showcase in their portfolios.

---

## License

MIT License
