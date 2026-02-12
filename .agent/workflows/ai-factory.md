---
description: AI Factory - Comprehensive toolkit for project setup, feature development, and code quality
---

# AI Factory Workflow

**AI Factory** is the primary development framework for this project. It provides a set of slash commands to automate the entire development lifecycle.

---

## 🚀 Getting Started

### 1. Initialize Project Context
If the project is new or skills are missing, run:
```bash
/ai-factory
```
*Analyzes tech stack, installs skills, and configures MCP servers.*

---

## 🏗️ Development Lifecycle

### 2. Start a New Feature
To begin working on a new feature or non-trivial change:
```bash
/ai-factory.feature <description>
```
*Creates a git branch, asks for testing/logging preferences, and creates an implementation plan.*

### 3. Create a Quick Task Plan
For smaller tasks or when you don't want a separate branch:
```bash
/ai-factory.task <description>
```
*Creates a trackable implementation plan in `.ai-factory/PLAN.md`.*

### 4. Polish the Plan (Optional but Recommended)
Before implementing, refine the plan for better quality:
```bash
/ai-factory.improve
```
*Analyzes the plan against the codebase, identifies gaps, and suggests improvements.*

### 5. Execute Implementation
To start or resume coding:
```bash
/ai-factory.implement
```
*Follows the plan task-by-task, marking progress and handling checkpoints.*

### 6. Commit Changes
Once a task or feature is complete:
```bash
/ai-factory.commit
```
*Analyzes staged changes and generates a conventional commit message.*

---

## 🛠️ Maintenance & Quality

### 7. Fix a Bug
For quick, unplanned fixes:
```bash
/ai-factory.fix <description or error>
```
*Directly investigates and fixes issues, adding mandatory logging and suggesting tests.*

### 8. Refactor or Modernize
To upgrade code or improve architecture:
```bash
/ai-factory.evolve <target>
```
*Applies modern patterns (e.g., signals, standalone components) to existing code.*

### 9. Code Review
Perform a comprehensive quality check:
```bash
/ai-factory.review <target>
```
*Checks code against best practices and project standards.*

### 10. Security Audit
Check for vulnerabilities and best practices:
```bash
/ai-factory.security-checklist
```
*Runs security scans and provides a prioritized checklist of improvements.*

---

## 🧩 Skill Management

### 11. Generate or Acquire Skills
To add new capabilities to the AI agent:
```bash
/ai-factory.skill-generator <name or URL>
```
*Searches skills.sh or generates custom skills from documentation URLs.*

---

## 📋 Quick Reference

| Command | Purpose |
|---------|---------|
| `/ai-factory.feature` | New branch + implementation plan |
| `/ai-factory.task` | Quick implementation plan only |
| `/ai-factory.implement` | Execute active plan |
| `/ai-factory.commit` | Conventional commit generation |
| `/ai-factory.fix` | Fast-track bug fixing |
| `/ai-factory.improve` | Polish/refine existing plan |
| `/ai-factory.review` | Comprehensive code quality check |
| `/ai-factory.evolve` | Modernization and refactoring |
| `/ai-factory.deploy` | Deployment workflow |
| `/ai-factory.security-checklist` | Security audit |
| `/ai-factory.skill-generator` | Add new AI capabilities |
