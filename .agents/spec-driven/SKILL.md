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

**Quality Check:**
✓ Coverage: [score]/10 - [brief assessment]
✓ Specificity: [score]/10 - [brief assessment]
✓ Completeness: [score]/10 - [brief assessment]
✓ Clarity: [score]/10 - [brief assessment]
✓ Edge Cases: [score]/10 - [brief assessment]

Overall: [sum]/50

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

**Quality Check:**
✓ Coverage: [score]/10 - [brief assessment]
✓ Specificity: [score]/10 - [brief assessment]
✓ Completeness: [score]/10 - [brief assessment]
✓ Clarity: [score]/10 - [brief assessment]
✓ Edge Cases: [score]/10 - [brief assessment]

Overall: [sum]/50

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

**Quality Check:**
✓ Requirements Coverage: [score]/10 - [brief assessment]
✓ Data Model: [score]/10 - [brief assessment]
✓ Error Handling: [score]/10 - [brief assessment]
✓ Security: [score]/10 - [brief assessment]
✓ Testability: [score]/10 - [brief assessment]

Overall: [sum]/50

Type "show spec/design-1.md" to see the full file.

What would you like to change?
```

**Subsequent iterations:**
```
I've updated to spec/design-2.md.

**Changes since v1:**
- Added: [component/domain/flow]
- Modified: [what changed]

**Quality Check:**
✓ Requirements Coverage: [score]/10 - [brief assessment]
✓ Data Model: [score]/10 - [brief assessment]
✓ Error Handling: [score]/10 - [brief assessment]
✓ Security: [score]/10 - [brief assessment]
✓ Testability: [score]/10 - [brief assessment]

Overall: [sum]/50

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

**Quality Check:**
✓ Requirements Traceability: [score]/10 - [brief assessment]
✓ Granularity: [score]/10 - [brief assessment]
✓ Sequencing: [score]/10 - [brief assessment]
✓ Actionability: [score]/10 - [brief assessment]
✓ Coverage: [score]/10 - [brief assessment]

Overall: [sum]/50

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

## Quality Evaluation

After generating each document (requirements, design, tasks), automatically run quality checks and report scores.

### Requirements Quality Checklist

Run these checks on requirements documents:

```
REQUIREMENTS QUALITY CHECK:

✓ Coverage: All user journeys identified? [score/10]
✓ Specificity: Acceptance criteria testable? [score/10]
✓ Completeness: Non-functional requirements included? [score/10]
✓ Clarity: No ambiguity in user stories? [score/10]
✓ Edge Cases: Error scenarios covered? [score/10]

Overall Score: X/50

Issues Found:
- [Any gaps or improvements needed]
```

**Key Checks:**
- Each user story has clear "As a/I want/So that" format
- Each user story has ≥3 acceptance criteria
- Acceptance criteria are measurable/testable
- Non-functional requirements (performance, security, scalability) present
- "Out of Scope" section explicitly defined

**Scoring Guidelines:**

**Coverage (0-10):**
- 10: All core features covered with clear user journeys
- 7-9: Most features covered, minor gaps
- 4-6: Significant gaps in feature coverage
- 0-3: Missing major user journeys

**Specificity (0-10):**
- 10: All acceptance criteria are measurable/testable
- 7-9: Most AC testable, 1-2 vague
- 4-6: Several AC lack clear testability
- 0-3: AC mostly vague or missing

**Completeness (0-10):**
- 10: Performance, security, scalability, availability all addressed
- 7-9: 3 of 4 non-functional areas covered
- 4-6: 1-2 non-functional areas covered
- 0-3: Non-functional requirements missing

**Clarity (0-10):**
- 10: All user stories follow "As a/I want/So that" format
- 7-9: Most follow format, 1-2 deviations
- 4-6: Several stories poorly structured
- 0-3: Inconsistent or unclear format

**Edge Cases (0-10):**
- 10: Error scenarios, invalid inputs, boundary conditions covered
- 7-9: Most error cases covered, 1-2 missing
- 4-6: Minimal error handling addressed
- 0-3: No error scenarios considered

### Design Quality Checklist

```
DESIGN QUALITY CHECK:

✓ Requirements Coverage: All US addressed? [score/10]
✓ Data Model: Entities/relationships defined? [score/10]
✓ Error Handling: Failure modes addressed? [score/10]
✓ Security: Auth/authz/data protection covered? [score/10]
✓ Testability: Testing strategy included? [score/10]

Overall Score: X/50

Issues Found:
- [Any gaps or improvements needed]
```

**Key Checks:**
- Requirements traceability table is complete (no orphaned US)
- Domain model identifies bounded contexts and entities
- Critical data flows documented (trigger → steps → outcome)
- Error categories defined with handling strategy
- Security considerations address auth, authz, and data protection

**Scoring Guidelines:**

**Requirements Coverage (0-10):**
- 10: All user stories traced to design components
- 7-9: Most traced, 1-2 orphaned stories
- 4-6: Several requirements lack design coverage
- 0-3: Design traceability missing

**Data Model (0-10):**
- 10: Clear entities, relationships, and attributes defined
- 7-9: Core model complete, 1-2 details missing
- 4-6: Incomplete or vague data model
- 0-3: Data model missing or extremely basic

**Error Handling (0-10):**
- 10: Error categories, recovery strategies, and monitoring defined
- 7-9: Error handling present, 1-2 areas need detail
- 4-6: Basic error handling, no recovery strategy
- 0-3: Error handling not addressed

**Security (0-10):**
- 10: Authentication, authorization, data protection, and threats addressed
- 7-9: 3 of 4 security areas covered
- 4-6: Basic auth mentioned, incomplete coverage
- 0-3: Security not considered

**Testability (0-10):**
- 10: Unit, integration, and E2E testing strategies defined
- 7-9: Testing approach clear, 1-2 levels missing detail
- 4-6: Minimal testing strategy
- 0-3: No testing strategy

### Tasks Quality Checklist

```
TASKS QUALITY CHECK:

✓ Requirements Traceability: All tasks link to US? [score/10]
✓ Granularity: Tasks 1-4 hours each? [score/10]
✓ Sequencing: Dependencies respected? [score/10]
✓ Actionability: Steps are concrete? [score/10]
✓ Coverage: All requirements have tasks? [score/10]

Overall Score: X/50

Issues Found:
- [Any gaps or improvements needed]
```

**Key Checks:**
- Every task has "Relevant Requirements" with US-* references
- No task is vague (e.g., "Implement X" without specifics)
- Task ordering allows sequential implementation
- No requirement is left without corresponding tasks
- Each task has concrete checkbox steps (not subtask headers)

**Scoring Guidelines:**

**Requirements Traceability (0-10):**
- 10: Every task has "Relevant Requirements" with US-* references
- 7-9: Most tasks traced, 1-2 missing links
- 4-6: Several tasks lack requirement links
- 0-3: Traceability largely missing

**Granularity (0-10):**
- 10: All tasks are 1-4 hours, clearly scoped
- 7-9: Most tasks appropriate size, 1-2 too broad
- 4-6: Several tasks unclear scope or too large
- 0-3: Tasks are vague or monolithic

**Sequencing (0-10):**
- 10: Tasks ordered logically, dependencies clear
- 7-9: Most sequencing correct, 1-2 issues
- 4-6: Some dependency issues or rework needed
- 0-3: Task order doesn't make sense

**Actionability (0-10):**
- 10: Concrete checkbox steps, not vague headers
- 7-9: Steps mostly concrete, 1-2 vague
- 4-6: Several tasks lack concrete steps
- 0-3: Tasks are just descriptions without steps

**Coverage (0-10):**
- 10: All user stories have corresponding tasks
- 7-9: Most stories covered, 1-2 missing tasks
- 4-6: Several requirements lack implementation tasks
- 0-3: Large gaps between requirements and tasks

### Reporting Quality Scores

After writing each document, include quality evaluation:

**Example (after requirements):**
```
I've created spec/requirements-1.md.

**Summary:**
- 6 user stories covering auth and book CRUD
- Performance, security, and scalability requirements included

**Quality Check:**
✓ Coverage: 10/10 - All core features identified
✓ Specificity: 8/10 - Most AC testable, US-3 needs more detail
✓ Completeness: 10/10 - Non-functional requirements present
✓ Clarity: 9/10 - Clear user story format throughout
✓ Edge Cases: 6/10 - Missing error handling scenarios

Overall: 43/50

Type "show spec/requirements-1.md" to see the full file.

What would you like to change?
```

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

### Memory & Evolution

After confirming each phase, save patterns to memory for future reuse:

```
After requirements-confirmed.md:
- Save user story templates that got high quality scores
- Store acceptance criteria patterns that were approved
- Track which non-functional requirements were most relevant

After design-confirmed.md:
- Save architecture patterns and domain models
- Store data flow templates
- Track error handling strategies

After tasks-confirmed.md:
- Save task granularity that worked well
- Store sequencing patterns
- Track which requirements-to-task mappings were effective
```

**Memory File Location:** `spec/.memory/` (auto-created)

```
spec/.memory/
  requirements-patterns.md
  design-patterns.md
  task-patterns.md
  quality-trends.md
```

**When starting a new spec:**
1. Check if memory patterns exist
2. Suggest relevant templates from memory
3. Adapt patterns to current project context
4. After confirmation, update memory with new learnings

**Example Memory Usage:**
```
Found 3 relevant patterns from previous projects:

1. User Auth Stories (from e-commerce project)
   - 9/10 average quality score
   - Want to use this pattern?

2. RESTful CRUD Tasks (from API project)
   - 47/50 average quality score
   - Want to adapt this?

3. Layered Architecture Design (from microservices project)
   - 45/50 average quality score
   - Want to reference this?

Type "use 1", "use 2", "use all", or "skip" to continue.
```

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
