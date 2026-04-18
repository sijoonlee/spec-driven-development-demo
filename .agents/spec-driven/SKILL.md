---
name: spec-driven
description: Generate comprehensive software specifications including requirements (user stories, acceptance criteria), design (domains, components, data flow, error handling, testing), and actionable task breakdowns. Use this skill whenever the user wants to create software specs, write requirements, design system architecture, break down implementation tasks, or needs help planning a software project from rough ideas to detailed specifications. Trigger on phrases like "create spec", "write requirements", "design the system", "break down tasks", "plan this project", "spec for [project]", or when user provides code repos and wants to understand/document the structure.
---

# Software Specification Generator

This skill helps users create comprehensive software specifications by analyzing their inputs (rough ideas, code repos, or existing requirements) and iteratively collaborating with them to produce detailed requirements, design documents, and task breakdowns.

## Working Directory

**All spec files are created in a `spec/` subdirectory under the current working directory.**

- Example: `spec/requirements-1.md`, `spec/design-1.md`, `spec/tasks-1.md`
- If `spec/` directory doesn't exist, create it before writing files

## Workflow Overview

1. **Analyze** → Review user's idea, code repository, or existing requirements.md
2. **Iterate on Requirements** → Collaborate with user, writing versioned files (spec/requirements-1.md, spec/requirements-2.md, etc.)
3. **Confirm Requirements** → When user approves, create spec/requirements-confirmed.md
4. **Ask to Proceed** → User decides whether to continue to Design phase
5. **Generate Design** → Create spec/design-1.md with domains, components, data flow, etc.
6. **Iterate on Design** → Similar versioned iteration (spec/design-1.md, spec/design-2.md, etc.)
7. **Confirm Design** → Create spec/design-confirmed.md
8. **Generate Tasks** → Create task breakdown with iterative implementation steps
9. **Iterate on Tasks** → Refine task breakdown as needed

## Step 1: Analyze Inputs

First, understand what the user has provided:

- **Rough idea**: User describes what they want to build in natural language
- **Code repository**: User provides existing code to analyze and spec
- **requirements.md**: User has existing requirements to refine

**Action**: Read and analyze all provided inputs. Summarize your understanding back to the user before proceeding.

```
Based on my analysis, I understand you want to build:
- [Summary of purpose]
- [Key features identified]
- [Constraints or requirements mentioned]

Is this correct, or should I adjust my understanding?
```

## Step 2: Requirements Phase

Requirements documents should capture **what** the software should do, not **how**.

### Requirements Structure

Write requirements using this exact format:

```markdown
# Requirements: [Project Name]

## Overview
[Brief description of the software purpose]

## User Stories

### US-1: [Story title]
**As a** [role]
**I want** [action]
**So that** [benefit]

#### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### US-2: [Next story]
...

## Non-Functional Requirements

### Performance
- [Requirements]

### Security
- [Requirements]

### Scalability
- [Requirements]

## Out of Scope
- [What is explicitly NOT included]
```

### Requirements Guidelines

- Number user stories sequentially (US-1, US-2, etc.) for cross-reference
- Make acceptance criteria testable and specific
- Include edge cases in acceptance criteria
- Separate functional from non-functional requirements

### Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

1. Write initial requirements based on analysis → `spec/requirements-1.md`
2. Present **summary of changes** to user (not full file)
3. User can ask to see full file if needed
4. **When user requests changes: create `spec/requirements-2.md` as a NEW file**
5. **Next changes: create `spec/requirements-3.md`, and so on**
6. **NEVER update `spec/requirements-1.md` in place** - always create a new versioned file
7. Repeat until user confirms

**First iteration, show:**
```
I've created spec/requirements-1.md.

**Summary:**
- [Key point 1]
- [Key point 2]
- [Key point 3]

Type "show spec/requirements-1.md" to see the full file.

What would you like to change? Examples:
- Add user stories for [feature]
- Clarify acceptance criteria for US-3
- Add performance requirements
- Remove or modify [item]
```

**Subsequent iterations, show:**
```
I've updated to spec/requirements-2.md.

**Changes since v1:**
- Added: US-4 - [brief description]
- Modified: US-2 acceptance criteria - [what changed]
- Removed: [what was removed, if any]

Type "show spec/requirements-2.md" to see the full file.

Any other changes needed?
```

### Confirming Requirements

When user says requirements are complete:

1. Create `spec/requirements-confirmed.md` with the final version
2. **STOP and explicitly ask:** "Requirements are confirmed. Would you like to proceed to the Design phase now?"
3. **Wait for explicit user confirmation** before continuing to Design phase
4. Do not auto-generate design documents without user approval

**Example response:**
```
Requirements are confirmed (spec/requirements-confirmed.md).

Ready for Design phase when you are. Would you like to:
- Proceed to design (I'll create spec/design-1.md)
- Review spec/requirements-confirmed.md first
- Make changes to requirements
```

## Step 3: Design Phase

Design documents capture **how** the software will be built.

### Design Structure

```markdown
# Design: [Project Name]

## Overview
[How this design fulfills the requirements]

## Domain Model (DDD)

### Bounded Contexts
- **[Context Name]**: [Description]
  - Entities: [List]
  - Value Objects: [List]
  - Aggregates: [List]

### Domain Relationships
[Description of how bounded contexts interact]

## Architecture

### Components/Layers
- **Layer 1**: [Purpose, technologies]
- **Layer 2**: [Purpose, technologies]

### Component Diagram
```
[ASCII architecture diagram]
```

## Data Flow

### Key Flows
1. **[Flow Name]**
   - Trigger: [What starts this flow]
   - Steps: [Step-by-step]
   - Data: [What data moves where]

### Data Models
```typescript
// Key data structures
interface Entity {
  // fields
}
```

## Error Handling

### Error Categories
- **Validation Errors**: [How handled]
- **Runtime Errors**: [How handled]
- **External Service Errors**: [How handled]

### Error Flow
[How errors propagate and are reported]

## Testing Strategy

### Unit Tests
- [What to unit test]
- [Coverage goals]

### Integration Tests
- [What to integration test]

### E2E Tests
- [Critical user journeys to test]

## Security Considerations
- [Authentication/Authorization]
- [Data protection]
- [Input validation]

## Performance Considerations
- [Expected load]
- [Bottlenecks to address]
- [Caching strategy]

## Requirements Traceability
| Requirement | Design Element |
|-------------|----------------|
| US-1 | Component X, Flow Y |
| US-2 | Component Z |
```

### Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

Same as requirements:

**Versioning Rule:**
- Initial: `spec/design-1.md`
- After changes: `spec/design-2.md`, `spec/design-3.md`, etc.
- **NEVER update spec/design-1.md in place** - always create a new versioned file

**First iteration:**
```
I've created spec/design-1.md.

**Summary:**
- Domains: [brief]
- Architecture: [brief]
- Key data flows: [brief]

Type "show spec/design-1.md" to see the full file.

What would you like to change?
```

**Subsequent iterations:**
```
I've updated to spec/design-2.md.

**Changes since v1:**
- Added: [component/domain/flow]
- Modified: [what changed]

Type "show spec/design-2.md" to see the full file.

Any other changes needed?
```

1. Write `spec/design-1.md`
2. Get user feedback
3. Iterate to `spec/design-2.md`, etc.
4. On confirmation, create `spec/design-confirmed.md`
5. **Ask:** "Design is confirmed. Would you like to proceed to Tasks?"

## Step 4: Tasks Phase

Tasks are actionable implementation steps that reference requirements and design.

### Task Structure

```markdown
# Tasks: [Project Name]

## Task 1: [Short descriptive title]
- [ ] [Actionable step 1]
- [ ] [Actionable step 2]
- [ ] [Actionable step 3]

**Relevant Requirements**: US-1, US-3

## Task 2: [Next task]
- [ ] [Actionable step 1]
- [ ] [Actionable step 2]

**Relevant Requirements**: US-2

## Requirements Traceability
| Requirement | Tasks |
|-------------|-------|
| US-1 | Task 1, Task 3 |
| US-2 | Task 2 |
```

### Simplified Task Format (recommended)
- Use simple numbered tasks with checkbox lists
- No nested subtasks or "Iterations" grouping
- Each task should be 1-4 hours of work
- Include relevant requirements reference after each task

### Task Guidelines

- **Order matters**: Tasks should be implementable in sequence
- **Granularity**: Each task should be 1-4 hours of work
- **No subtasks**: Use simple flat list instead of nested subtasks
- **Cross-reference**: Always link to requirements (US-*) after each task
- **Early corrections**: If task breakdown reveals design issues, note them clearly
- **Checklist format**: Use `- [ ]` markdown checkboxes for actionable steps

### Task Format Example

```markdown
## Task 3: Customer Model (US-1, US-2, US-3)
- [ ] Create models/Customer.js with Mongoose schema
- [ ] Define fields: firstName (required, 1-100 chars), lastName (optional)
- [ ] Add phoneNumber validation regex
- [ ] Add index on phoneNumber for optimization
- [ ] Export Customer model
```

### Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

**Versioning Rule:**
- Initial: `spec/tasks-1.md`
- After changes: `spec/tasks-2.md`, `spec/tasks-3.md`, etc.
- **NEVER update spec/tasks-1.md in place** - always create a new versioned file

Same pattern:

**First iteration:**
```
I've created spec/tasks-1.md.

**Summary:**
- [Number] tasks across [number] iterations
- First iteration focuses on: [brief]

Type "show spec/tasks-1.md" to see the full file.

What would you like to change?
```

1. Write `spec/tasks-1.md`
2. Get user feedback
3. Iterate as needed
4. On confirmation, create `spec/tasks-confirmed.md`

### Confirming Tasks

When user says tasks are complete:

1. Create `spec/tasks-confirmed.md`
2. **STOP and explicitly ask:** "Tasks are confirmed. Ready to begin implementation?"
3. **Wait for explicit user confirmation** before any implementation

**Example response:**
```
Tasks are confirmed (spec/tasks.md).

Summary: [number] tasks covering [key areas]

Ready to implement when you are. Would you like to:
- Start implementation (I can work through tasks)
- Review spec/tasks.md first
- Adjust task ordering or granularity
```

## Key Principles

### Be Interactive
Don't dump a 100-line spec without checking in. After each section, show summary and ask if the user wants to:
- See the full file
- Make changes
- Proceed to next phase

### Reference Everything
Tasks should link back to requirements and design. This creates traceability and helps users understand why each task exists.

### Allow Design Evolution
Task breakdown often reveals design flaws. Encourage users to update design-confirmed.md if tasks reveal issues. Note these corrections explicitly.

### Version Everything

**CRITICAL: Each change creates a new versioned file - never overwrite**

All files are in `spec/` directory:
- `spec/requirements-1.md`, `spec/requirements-2.md`, `spec/requirements-3.md`, ... → `spec/requirements-confirmed.md`
- `spec/design-1.md`, `spec/design-2.md`, `spec/design-3.md`, ... → `spec/design-confirmed.md`
- `spec/tasks-1.md`, `spec/tasks-2.md`, `spec/tasks-3.md`, ... → `spec/tasks-confirmed.md`

**When user requests changes:**
1. Read the current versioned file (e.g., `spec/requirements-1.md`)
2. Apply changes
3. **Write to the NEXT version number** (e.g., `spec/requirements-2.md`)
4. **Never overwrite the existing file**

### Show Changes, Not Full Files
By default, show only summaries and changes. Let users request full files with "show [filename]".

## Test Cases

Use these prompts to verify the skill works correctly:

### Test Case 1: Simple API Spec
```
Create a spec for a RESTful book library API with the following features:
- Users can register and login
- Users can add, update, delete, and search books
- Books have title, author, ISBN, and publication year
- Only authenticated users can modify books
```

**Expected**: Skill should generate user stories for auth and CRUD operations, design with proper layers and data flow, and tasks ordered to build auth first.

### Test Case 2: Code Repository Analysis
```
Create a spec for the code in ./my-repo (or provide an actual code path)
```

**Expected**: Skill should analyze existing code, extract requirements from it, and create specs that match or improve the existing structure.

### Test Case 3: Refine Existing Requirements
```
I have requirements.md, please refine it and create a spec
```

**Expected**: Skill should read existing requirements, iterate with user to improve them, then proceed to design and tasks phases.

## Starting

When the user triggers this skill:

1. Ask what they want to spec (idea, repo, or existing requirements)
2. Analyze what they provide
3. Summarize your understanding
4. Begin requirements phase
5. Follow the iterative workflow above

Remember: The goal is **collaboration**, not just document generation. Work with the user at each step.
