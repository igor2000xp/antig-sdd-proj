# AI Agent Integration Guide

**Project:** Angular E-commerce Application  
**Version:** 1.0.0  
**Last Updated:** 2026-02-12  
**AI Framework:** Antigravity with AI Factory

---

## Overview

This document provides comprehensive specifications for AI agents to interact with this Angular 21 e-commerce application. The project uses **AI Antigravity** as the primary AI development framework, enhanced with **AI Factory** for skill-based development workflows.

### What are AI Antigravity Tune Files?

AI Antigravity tune files are configuration and instruction files that enable AI agents to understand project context, follow established patterns, and execute development tasks consistently. These files include:

- **Project configuration** (`.ai-factory.json`)
- **Skill definitions** (`.ai/skills/*/SKILL.md`)
- **Project documentation** (`.ai-factory/DESCRIPTION.md`)
- **Memory bank standards** (`memory-bank/standards/*.md`)
- **Workflow definitions** (`.agent/workflows/*.md`)
  - `ai-factory.md` - Core development lifecycle commands
  - `specsmd-*.md` - Orchestration agents for SpecsMD framework

---

## Skill Set

This project has the following AI skills installed and available:

### Core Development Skills

| Skill | Purpose | Usage |
|-------|---------|-------|
| `ai-factory` | Project setup and skill management | `/ai-factory` |
| `feature` | Feature development workflow | `/feature <description>` |
| `task` | Implementation planning | `/task <description>` |
| `implement` | Execute implementation plans | `/implement` |
| `fix` | Bug fixing workflow | `/fix <description>` |
| `improve` | Code improvement suggestions | `/improve <file-or-feature>` |
| `evolve` | Refactoring and modernization | `/evolve <component>` |

### Angular-Specific Skills

| Skill | Purpose | Usage |
|-------|---------|-------|
| `angular-ecommerce` | E-commerce patterns (cart, checkout, products) | Reference for e-commerce features |
| `angular-vitest` | Testing patterns with Vitest | Reference for unit/component tests |
| `cypress-cucumber-bdd` | BDD E2E testing patterns | Reference for E2E tests |

### Quality & Architecture Skills

| Skill | Purpose | Usage |
|-------|---------|-------|
| `architecture` | Architecture analysis and design | `/architecture analyze` |
| `best-practices` | Code quality guidelines | Reference for best practices |
| `review` | Code review assistance | `/review <file-or-pr>` |
| `security-checklist` | Security audit | `/security-checklist` |
| `commit` | Generate commit messages | `/commit` |

### Utility Skills

| Skill | Purpose | Usage |
|-------|---------|-------|
| `skill-generator` | Create new custom skills | `/skill-generator <name>` |
| `deploy` | Deployment workflows | `/deploy` |

---

## File Structure Specifications

### 1. AI Factory Configuration (`.ai-factory.json`)

**Location:** `/.ai-factory.json`  
**Format:** JSON  
**Purpose:** Central configuration for AI Factory and installed skills

#### Schema

```json
{
  "version": "string",              // AI Factory version (e.g., "1.4.0")
  "agent": "string",                // Agent type (e.g., "universal")
  "skillsDir": "string",            // Path to skills directory (e.g., ".ai/skills")
  "installedSkills": ["string"],   // Array of installed skill names
  "mcp": {                          // MCP server configuration
    "github": boolean,              // GitHub integration enabled
    "filesystem": boolean,          // Filesystem MCP enabled
    "postgres": boolean             // Postgres MCP enabled
  }
}
```

#### Current Configuration

```json
{
  "version": "1.4.0",
  "agent": "universal",
  "skillsDir": ".ai/skills",
  "installedSkills": [
    "ai-factory",
    "angular-ecommerce",
    "angular-vitest",
    "architecture",
    "best-practices",
    "commit",
    "cypress-cucumber-bdd",
    "deploy",
    "evolve",
    "feature",
    "fix",
    "implement",
    "improve",
    "review",
    "security-checklist",
    "skill-generator",
    "task"
  ],
  "mcp": {
    "github": true,
    "filesystem": true,
    "postgres": false
  }
}
```

#### Validation Rules

- `version` must be a valid semver string
- `skillsDir` must be a valid relative path
- `installedSkills` array must contain only existing skill directory names
- `mcp` values must be boolean

---

### 2. Skill Definition Files (`.ai/skills/*/SKILL.md`)

**Location:** `/.ai/skills/{skill-name}/SKILL.md`  
**Format:** Markdown with YAML frontmatter  
**Purpose:** Define skill behavior, triggers, and instructions

#### Schema

```yaml
---
name: string                          # Required: skill identifier (lowercase-hyphen)
description: string                   # Required: what the skill does and when to use it
argument-hint: string                 # Optional: argument format hint
disable-model-invocation: boolean     # Optional: true = user-only invocation
user-invocable: boolean              # Optional: false = model-only invocation
allowed-tools: [string]              # Optional: pre-approved tools
context: string                       # Optional: execution context (e.g., "fork")
agent: string                         # Optional: subagent type
model: string                         # Optional: model override
license: string                       # Optional: license type
compatibility: string                 # Optional: requirements
metadata:                            # Optional: custom metadata
  author: string
  version: string
  category: string
---

# Skill Instructions

Markdown content with instructions, examples, and patterns.
```

#### Example: angular-ecommerce Skill

```yaml
---
name: angular-ecommerce
description: E-commerce patterns for Angular applications. Use when building shopping cart, product catalog, checkout flows, or payment integration.
argument-hint: [feature-name]
allowed-tools: Read Write Grep
metadata:
  author: ai-factory
  version: "1.0"
  category: angular-patterns
---

# Angular E-commerce Patterns

[Detailed instructions and code examples...]
```

#### Validation Rules

- `name` must match directory name
- `name` must be lowercase with hyphens only (max 64 chars)
- `description` must be present and under 1024 characters
- YAML frontmatter must be valid
- Markdown body should be under 500 lines (use references/ for detailed content)

---

### 3. Project Description (`.ai-factory/DESCRIPTION.md`)

**Location:** `/.ai-factory/DESCRIPTION.md`  
**Format:** Markdown  
**Purpose:** Comprehensive project documentation for AI context

#### Required Sections

```markdown
# Project: [Project Name]

## Overview
[Clear description of the project]

## Core Features
- [Feature 1]
- [Feature 2]

## Tech Stack
- **Language:** [Primary language]
- **Framework:** [Framework and version]
- **Testing:** [Testing tools]
- **Tooling:** [Development tools]

## Architecture Notes
[High-level architecture decisions]

## Non-Functional Requirements
[Performance, security, accessibility requirements]

## Development Workflow
[How to develop, test, and deploy]

## Project Structure
[Directory structure overview]
```

---

### 4. Memory Bank Standards (`memory-bank/standards/*.md`)

**Location:** `/memory-bank/standards/`  
**Format:** Markdown  
**Purpose:** Project-specific standards and conventions

#### Standard Files

- `tech-stack.md` - Technology decisions
- `coding-standards.md` - Code style and conventions
- `testing-standards.md` - Testing requirements
- `architecture-standards.md` - Architecture patterns

#### Format

```markdown
# Standard: [Standard Name]

## Overview
[What this standard covers]

## Decisions
[Specific decisions and rules]

## Examples
[Code examples demonstrating the standard]

## Rationale
[Why these decisions were made]
```

---

### 5. Workflow Definitions (`.agent/workflows/*.md`)

**Location:** `/.agent/workflows/`  
**Format:** Markdown with YAML frontmatter  
**Purpose:** Define repeatable development workflows

#### Schema

```yaml
---
description: [short title describing the workflow]
---

# Workflow Steps

1. [Step 1 description]
   ```bash
   # Commands to execute
   ```

2. [Step 2 description]
   // turbo  # Optional: auto-run this step
   ```bash
   # Commands to execute
   ```
```

#### Turbo Annotations

- `// turbo` above a step: Auto-run that specific step
- `// turbo-all` anywhere: Auto-run ALL command steps

---

## Available Operations

### 1. Reading Project Context

**Operation:** Load project configuration and context

```typescript
// Read AI Factory configuration
const config = await readFile('.ai-factory.json');
const aiFactory = JSON.parse(config);

// Read project description
const description = await readFile('.ai-factory/DESCRIPTION.md');

// Read tech stack standards
const techStack = await readFile('memory-bank/standards/tech-stack.md');

// List available skills
const skills = await listDirectory('.ai/skills');
```

### 2. Accessing Skills

**Operation:** Read and apply skill instructions

```typescript
// Read a specific skill
const skillContent = await readFile('.ai/skills/angular-ecommerce/SKILL.md');

// Parse skill frontmatter
const { frontmatter, content } = parseMarkdownWithFrontmatter(skillContent);

// Check if skill is installed
const isInstalled = aiFactory.installedSkills.includes('angular-ecommerce');
```

### 3. Following Development Patterns

**Operation:** Apply project-specific patterns from skills

```typescript
// Example: Creating a new Angular component following angular-ecommerce patterns
// 1. Read the angular-ecommerce skill
// 2. Extract component patterns
// 3. Apply signal-based state management
// 4. Use OnPush change detection
// 5. Follow testing patterns from angular-vitest skill
```

### 4. Executing Workflows

**Operation:** Run defined workflows

```typescript
// Read workflow definition
const workflow = await readFile('.agent/workflows/specsmd-construction-agent.md');

// Parse steps
const steps = parseWorkflowSteps(workflow);

// Execute steps (respecting turbo annotations)
for (const step of steps) {
  if (step.autoRun || step.hasTurboAnnotation) {
    await executeCommand(step.command, { SafeToAutoRun: true });
  } else {
    await executeCommand(step.command, { SafeToAutoRun: false });
  }
}
```

### 5. Validating Code Against Standards

**Operation:** Check code compliance with project standards

```typescript
// Read coding standards
const standards = await readFile('memory-bank/standards/coding-standards.md');

// Validate TypeScript code
await runCommand('npm run lint');

// Validate formatting
await runCommand('npm run format');

// Run tests
await runCommand('npm test');
```

---

## Integration Guidelines for Universal AI Agents

### 1. Initialization Sequence

When an AI agent starts working with this project, follow this sequence:

```
1. Read .ai-factory.json to understand project configuration
2. Read .ai-factory/DESCRIPTION.md for project context
3. Read memory-bank/standards/*.md for project standards
4. List .ai/skills/ to discover available skills
5. Read relevant skill files based on the task
6. Check .agent/workflows/ for applicable workflows
```

### 2. Task Execution Pattern

```
1. Identify task type (feature, fix, improve, etc.)
2. Load relevant skill (e.g., /feature, /fix, /improve)
3. Read skill instructions
4. Apply patterns from referenced skills (e.g., angular-ecommerce)
5. Follow coding standards from memory-bank/standards/
6. Execute task following skill workflow
7. Validate against standards (lint, test, format)
8. Generate commit message using /commit skill
```

### 3. Context Awareness

AI agents MUST be aware of:

- **Angular Version:** 21.0.0 (use modern standalone components, signals)
- **Change Detection:** OnPush strategy (required)
- **State Management:** Angular Signals (preferred over RxJS for state)
- **Testing Framework:** Vitest for unit tests, Cypress + Cucumber for E2E
- **Code Quality:** ESLint + Prettier enforced via Husky

### 4. MCP Server Integration

This project has MCP servers enabled:

```json
{
  "github": true,      // Use for repository operations
  "filesystem": true,  // Use for advanced file operations
  "postgres": false    // Not available (frontend-only)
}
```

**GitHub MCP Usage:**
- Create issues and PRs
- Manage branches
- Review code changes
- Access repository metadata

**Filesystem MCP Usage:**
- Advanced file search
- Batch file operations
- File watching
- Directory operations

---

## Error Handling and Validation

### 1. Configuration Validation

**Before executing any operation, validate:**

```typescript
// Validate .ai-factory.json exists and is valid JSON
if (!fileExists('.ai-factory.json')) {
  throw new Error('AI Factory not initialized. Run /ai-factory first.');
}

// Validate required skills are installed
const requiredSkills = ['angular-ecommerce', 'angular-vitest'];
const missingSkills = requiredSkills.filter(
  skill => !aiFactory.installedSkills.includes(skill)
);
if (missingSkills.length > 0) {
  throw new Error(`Missing required skills: ${missingSkills.join(', ')}`);
}
```

### 2. Code Validation

**Before committing code:**

```bash
# Run linter
npm run lint
# Exit code 0 = pass, non-zero = fail

# Run formatter check
npm run format
# Should auto-fix issues

# Run tests
npm test
# Exit code 0 = pass, non-zero = fail

# Run E2E tests (optional, slower)
npm run e2e
```

### 3. Skill Validation

**When using a skill:**

```typescript
// Check skill exists
const skillPath = `.ai/skills/${skillName}/SKILL.md`;
if (!fileExists(skillPath)) {
  throw new Error(`Skill '${skillName}' not found`);
}

// Validate skill frontmatter
const skill = parseSkill(skillPath);
if (!skill.frontmatter.name || !skill.frontmatter.description) {
  throw new Error(`Invalid skill definition: ${skillName}`);
}
```

### 4. Error Recovery

**Common errors and solutions:**

| Error | Cause | Solution |
|-------|-------|----------|
| Skill not found | Skill not installed | Run `/ai-factory` to install |
| Lint errors | Code doesn't meet standards | Run `npm run lint` and fix issues |
| Test failures | Breaking changes | Fix tests or update implementation |
| Build errors | TypeScript errors | Check `tsconfig.json` and fix types |
| MCP not available | Server not configured | Update `.ai-factory.json` mcp settings |

---

## Practical Examples

### Example 1: Creating a New E-commerce Feature

```markdown
**Task:** Add a product wishlist feature

**Steps:**

1. Read the angular-ecommerce skill for patterns
   ```bash
   cat .ai/skills/angular-ecommerce/SKILL.md
   ```

2. Create wishlist service following signal patterns
   ```typescript
   // src/app/core/services/wishlist.service.ts
   export class WishlistService {
     private items = signal<Product[]>([]);
     
     itemCount = computed(() => this.items().length);
     
     addItem(product: Product) {
       this.items.update(items => [...items, product]);
     }
     
     removeItem(productId: string) {
       this.items.update(items => items.filter(p => p.id !== productId));
     }
   }
   ```

3. Create wishlist component with OnPush
   ```typescript
   @Component({
     selector: 'app-wishlist',
     standalone: true,
     changeDetection: ChangeDetectionStrategy.OnPush,
     // ...
   })
   export class WishlistComponent {
     private wishlistService = inject(WishlistService);
     items = this.wishlistService.items;
   }
   ```

4. Write tests following angular-vitest patterns
   ```typescript
   describe('WishlistService', () => {
     it('should add items to wishlist', () => {
       const service = new WishlistService();
       service.addItem({ id: '1', name: 'Product' });
       expect(service.items().length).toBe(1);
     });
   });
   ```

5. Validate
   ```bash
   npm run lint
   npm test
   ```
```

### Example 2: Writing BDD E2E Tests

```markdown
**Task:** Add E2E test for wishlist feature

**Steps:**

1. Read cypress-cucumber-bdd skill
   ```bash
   cat .ai/skills/cypress-cucumber-bdd/SKILL.md
   ```

2. Create feature file
   ```gherkin
   # cypress/e2e/features/wishlist.feature
   Feature: Product Wishlist
     As a customer
     I want to save products to my wishlist
     So that I can purchase them later

     Scenario: Add product to wishlist
       Given I am on the products page
       When I click "Add to Wishlist" on "Product 1"
       Then the wishlist should contain 1 item
   ```

3. Create step definitions
   ```typescript
   // cypress/e2e/step_definitions/wishlist.steps.ts
   import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

   When('I click {string} on {string}', (button: string, product: string) => {
     cy.contains('.product-card', product)
       .find('button')
       .contains(button)
       .click();
   });

   Then('the wishlist should contain {int} item(s)', (count: number) => {
     cy.get('[data-testid="wishlist-count"]')
       .should('have.text', count.toString());
   });
   ```

4. Run E2E tests
   ```bash
   npm run e2e
   ```
```

### Example 3: Code Review Using AI Skills

```markdown
**Task:** Review a pull request

**Steps:**

1. Use the review skill
   ```bash
   /review src/app/wishlist/
   ```

2. Check against best-practices skill
   - Verify OnPush change detection
   - Verify signal usage
   - Check for proper TypeScript types
   - Validate test coverage

3. Check against coding standards
   ```bash
   cat memory-bank/standards/coding-standards.md
   ```

4. Run automated checks
   ```bash
   npm run lint
   npm test
   npm run e2e
   ```

5. Generate feedback report
   ```markdown
   ## Code Review: Wishlist Feature

   ### ✅ Strengths
   - Uses signals for reactive state
   - OnPush change detection implemented
   - Comprehensive test coverage (95%)

   ### ⚠️ Suggestions
   - Add error handling for API calls
   - Consider adding loading states
   - Add accessibility attributes

   ### 📋 Checklist
   - [x] Linting passes
   - [x] Tests pass
   - [x] Follows coding standards
   - [ ] E2E tests added
   ```
```

### Example 4: Generating a Commit Message

```markdown
**Task:** Commit the wishlist feature

**Steps:**

1. Stage changes
   ```bash
   git add src/app/wishlist/
   ```

2. Use commit skill
   ```bash
   /commit
   ```

3. AI generates conventional commit
   ```
   feat(wishlist): add product wishlist feature

   - Add WishlistService with signal-based state management
   - Create WishlistComponent with OnPush change detection
   - Implement add/remove wishlist operations
   - Add unit tests with 95% coverage
   - Add E2E tests for wishlist user flow

   BREAKING CHANGE: None
   ```

4. Commit
   ```bash
   git commit -m "feat(wishlist): add product wishlist feature..."
   ```
```

---

## Version Compatibility

### AI Antigravity Compatibility

- **Minimum Version:** 1.0.0
- **Recommended Version:** 1.4.0+
- **Tested With:** 1.4.0

### Angular Compatibility

- **Angular Version:** 21.0.0
- **TypeScript Version:** 5.9.2
- **Node Version:** 18.x or higher

### Skill Compatibility

All skills in this project are compatible with:
- AI Factory 1.4.0+
- Agent Skills Specification 1.0+
- Universal AI agents (Claude, GPT-4, etc.)

---

## Security and Access Considerations

### 1. Sensitive Data

**NEVER commit or expose:**
- API keys
- Authentication tokens
- Database credentials
- Private keys
- User data

**Storage locations for sensitive data:**
- Environment variables (`.env` - gitignored)
- Secure vaults (not in repository)
- CI/CD secrets

### 2. Skill Security

**Before using external skills:**
1. Run security scan: `/skill-generator scan <skill-path>`
2. Review skill instructions manually
3. Check for prompt injection attempts
4. Verify allowed-tools are appropriate

### 3. MCP Access Control

**GitHub MCP:**
- Requires `GITHUB_TOKEN` environment variable
- Token should have minimal required permissions
- Never commit tokens to repository

**Filesystem MCP:**
- Has access to project directory only
- Cannot access parent directories
- Cannot modify system files

### 4. Code Execution Safety

**Before auto-running commands:**
- Verify command is safe (no destructive operations)
- Check `SafeToAutoRun` flag
- Respect workflow turbo annotations
- Always show user commands that modify state

---

## Best Practices for AI Agents

### 1. Always Read Context First

```
✅ DO: Read .ai-factory/DESCRIPTION.md before starting
❌ DON'T: Make assumptions about project structure
```

### 2. Follow Established Patterns

```
✅ DO: Use patterns from angular-ecommerce skill
❌ DON'T: Invent new patterns without justification
```

### 3. Validate Before Committing

```
✅ DO: Run lint, test, and format before committing
❌ DON'T: Commit code that breaks builds or tests
```

### 4. Use Appropriate Skills

```
✅ DO: Use /feature for new features, /fix for bugs
❌ DON'T: Use generic approaches when skills exist
```

### 5. Maintain Documentation

```
✅ DO: Update DESCRIPTION.md when architecture changes
❌ DON'T: Let documentation drift from reality
```

### 6. Respect Standards

```
✅ DO: Follow memory-bank/standards/ guidelines
❌ DON'T: Violate established coding standards
```

---

## Troubleshooting

### Issue: Skill Not Found

**Symptom:** Error when invoking a skill  
**Solution:**
```bash
# Check installed skills
cat .ai-factory.json | grep installedSkills

# Reinstall if missing
/ai-factory
```

### Issue: Tests Failing

**Symptom:** `npm test` returns non-zero exit code  
**Solution:**
```bash
# Run tests in watch mode to debug
npm test -- --watch

# Check test output for specific failures
# Fix failing tests or update implementation
```

### Issue: Lint Errors

**Symptom:** `npm run lint` reports errors  
**Solution:**
```bash
# Auto-fix what can be fixed
npm run lint -- --fix

# Manually fix remaining issues
# Check memory-bank/standards/coding-standards.md
```

### Issue: MCP Server Not Available

**Symptom:** MCP operations fail  
**Solution:**
```bash
# Check MCP configuration
cat .ai-factory.json | grep mcp

# Ensure environment variables are set
echo $GITHUB_TOKEN

# Restart AI agent to reload MCP servers
```

---

## Appendix: Quick Reference

### File Locations

| File | Purpose |
|------|---------|
| `.ai-factory.json` | AI Factory configuration |
| `.ai-factory/DESCRIPTION.md` | Project documentation |
| `.ai-factory/SETUP-SUMMARY.md` | Setup summary |
| `.ai/skills/*/SKILL.md` | Skill definitions |
| `memory-bank/standards/*.md` | Project standards |
| `.agent/workflows/*.md` | Workflow definitions |
| `AGENTS.md` | This file |

### Command Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server |
| `npm test` | Run unit tests |
| `npm run e2e` | Run E2E tests |
| `npm run lint` | Lint code |
| `npm run format` | Format code |
| `npm run build` | Build for production |

### Skill Reference

| Skill | Slash Command |
|-------|---------------|
| AI Factory | `/ai-factory` |
| Feature | `/feature <description>` |
| Task | `/task <description>` |
| Implement | `/implement` |
| Fix | `/fix <description>` |
| Improve | `/improve <target>` |
| Review | `/review <target>` |
| Commit | `/commit` |
| Architecture | `/architecture` |
| Security | `/security-checklist` |

---

## Support and Contribution

### For AI Agents

If you encounter issues or ambiguities in this documentation:
1. Check `.ai-factory/SETUP-SUMMARY.md` for additional context
2. Read relevant skill files in `.ai/skills/`
3. Consult `memory-bank/standards/` for project-specific rules

### For Humans

This documentation is maintained as part of the AI Factory setup. To update:
1. Modify `AGENTS.md` directly
2. Update `.ai-factory/DESCRIPTION.md` if project context changes
3. Update skill files in `.ai/skills/` if patterns change
4. Run `/ai-factory` to regenerate setup if needed

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-02-12  
**Maintained By:** AI Factory Setup
