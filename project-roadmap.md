# AI Project Reviewer Lite - Project Roadmap

**Project Status:** Planned
**Target Outcome:** Resume-Ready AI Project
**Estimated Scope:** 2–3 Days (Focused Development)

---

# Project Vision

AI Project Reviewer Lite is an AI-powered application that analyzes a software repository and generates a structured engineering review.

Instead of simply answering questions like a chatbot, the application automatically inspects a repository, understands its structure and important source files, and produces actionable engineering feedback.

The project is intentionally scoped to be completed quickly while demonstrating practical AI engineering concepts such as repository parsing, context engineering, prompt engineering, and LLM integration.

---

# Project Goals

## Primary Goals

- Build a genuine AI-powered application.
- Learn practical AI engineering concepts.
- Create a strong resume project.
- Keep the implementation maintainable.
- Finish within the available timeline.

---

# Final Version Scope (Locked)

The final version **must include all of the following**.

## Repository Input

Users can:

- Upload a ZIP repository.
- View upload progress.
- See repository information after upload.

---

## Repository Processing

The backend should:

- Extract the ZIP file.
- Traverse the repository recursively.
- Ignore unnecessary directories.

Examples:

- node_modules
- dist
- build
- .git
- binaries
- images
- videos

---

## File Parsing

The system should read the contents of important files.

Supported files include:

- README.md
- package.json
- tsconfig.json
- vite.config.*
- requirements.txt
- pom.xml
- Dockerfile
- docker-compose.yml
- .env.example
- JavaScript
- TypeScript
- React components
- Python
- Java
- C++
- Markdown
- JSON
- YAML

Large files should be truncated intelligently to remain within LLM context limits.

---

## Context Builder

The application should create a structured prompt containing:

- Repository name
- Folder structure
- Tech stack
- Configuration files
- Important source files
- README contents
- Selected code snippets

This context is then sent to the AI model.

---

## AI Analysis

The AI should generate a structured engineering report containing:

### 1. Project Summary

- Purpose
- Overall description

---

### 2. Technology Stack

Examples:

- React
- Express
- PostgreSQL
- Java
- Python

---

### 3. Architecture Overview

High-level explanation of how the project is organized.

---

### 4. Folder Structure Review

Evaluate whether the folder organization is clean and maintainable.

---

### 5. Code Quality Observations

Examples:

- Naming consistency
- Separation of concerns
- Organization
- Readability

---

### 6. Strengths

Examples:

- Good architecture
- Modular design
- Clear folder structure

---

### 7. Weaknesses

Examples:

- Missing tests
- Poor documentation
- Large files
- Repeated code

---

### 8. Improvement Suggestions

Provide prioritized recommendations.

---

### 9. Resume Feedback

Evaluate:

- Resume value
- Portfolio quality
- Recruiter impression

Provide a score out of 10 with justification.

---

### 10. Interview Questions

Generate project-specific technical interview questions.

Example:

- Explain your authentication flow.
- Why did you choose this database?
- Describe your architecture.

---

## Report Display

The generated report should be:

- Well formatted
- Easy to read
- Divided into sections
- Displayed in the application

---

## Report Export

Users should be able to download the generated report as a Markdown (`.md`) file.

---

## User Interface

The application should include:

### Landing Page

- Project description
- Upload button

### Loading Screen

- Repository processing indicator
- AI analysis progress

### Report Page

- Structured report
- Download option

The UI should be clean, minimal, and responsive.

---

## Error Handling

The application should gracefully handle:

- Invalid ZIP files
- Empty repositories
- Unsupported files
- AI API failures
- Large repositories

Users should receive meaningful error messages.

---

# Technology Stack

Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

Backend

- Node.js
- Express
- TypeScript

AI

- Gemini API

Deployment

- Vercel (Frontend)
- Railway or Render (Backend)

---

# Phase 0 — Project Setup

## Goal

Prepare the project foundation.

### Deliverables

- Initialize repository
- Configure frontend
- Configure backend
- Configure TypeScript
- Configure formatting and linting
- Create folder structure

### Exit Criteria

Development environment is ready.

---

# Phase 1 — Repository Processing

## Goal

Read and understand repository contents.

### Deliverables

- ZIP upload
- Repository extraction
- Recursive file traversal
- Ignore unnecessary files
- Read important file contents
- Build repository metadata

### Exit Criteria

The backend successfully produces structured repository information.

---

# Phase 2 — AI Analysis Engine

## Goal

Generate a meaningful engineering review.

### Deliverables

- Prompt builder
- Context builder
- Gemini integration
- Structured AI report
- Error handling

### Exit Criteria

A complete engineering report is generated from repository contents.

---

# Phase 3 — User Interface

## Goal

Create a polished user experience.

### Deliverables

- Upload page
- Progress indicators
- Report page
- Markdown download
- Responsive layout

### Exit Criteria

A user can upload a repository and view the generated report without using the terminal.

---

# Phase 4 — Final Polish

## Goal

Prepare the project for public release.

### Deliverables

- UI improvements
- Better prompts
- Improved report formatting
- Better error handling
- README
- Deployment
- Final testing

### Exit Criteria

The application is stable, documented, deployed, and ready to be showcased.

---

# Explicitly Out of Scope

The following features are **not** part of this project.

- Retrieval-Augmented Generation (RAG)
- Embeddings
- Vector Databases
- Semantic Search
- Multi-Agent Systems
- Conversation Memory
- Chat Interface
- Authentication
- User Accounts
- Database
- Repository History
- GitHub Authentication
- Real-time Collaboration

These belong to the future CodePilot AI project.

---

# Learning Outcomes

By completing this project, the developer should understand:

- LLM API integration
- Prompt engineering
- Context engineering
- Repository parsing
- File filtering
- Token budget management
- Structured AI outputs
- Backend/frontend integration
- Building production-ready AI applications

---

# Definition of Success

The project is successful when:

- A user uploads a software repository.
- The application reads relevant files and repository structure.
- The AI generates a structured engineering review.
- The report provides useful, repository-specific insights.
- The report can be downloaded as Markdown.
- The application is deployed and publicly accessible.
- The developer can confidently explain every architectural and AI-related decision during a technical interview.

---

# Final Deliverable

The final version should be a polished AI-powered web application capable of analyzing real software repositories and producing professional engineering review reports.

It should demonstrate practical AI engineering skills while remaining intentionally simple, maintainable, and achievable within the project's time constraints.

This project serves as a stepping stone toward the larger **CodePilot AI** vision, where advanced capabilities such as Retrieval-Augmented Generation (RAG), embeddings, semantic search, and repository-aware conversations will be introduced.
