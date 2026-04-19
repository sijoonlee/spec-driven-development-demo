# Tasks Phase

Tasks are actionable implementation steps that reference requirements and design.

## Input

**Must have `spec/design-confirmed.md` before starting.**

Read the confirmed design to ensure all components and data flows are translated into tasks.

## Execution

**This phase is executed by a subagent.**

From SKILL.md context, launch:
```
Agent({
  description: "Write tasks",
  subagent_type: "general-purpose",
  prompt: "Read .agents/spec-driven/03-tasks-phase.md and spec/design-confirmed.md. Execute the Tasks Phase. Output to spec/tasks-1.md"
})
```

## Task Structure

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
|------|--|
| US-1 | Task 1, Task 3 |
| US-2 | Task 2 |
```

## Simplified Task Format (recommended)

- Use simple numbered tasks with checkbox lists
- No nested subtasks or "Iterations" grouping
- Each task should be 1-4 hours of work
- Include relevant requirements reference after each task

## Task Guidelines

- **Order matters**: Tasks should be implementable in sequence
- **Granularity**: Each task should be 1-4 hours of work
- **No subtasks**: Use simple flat list instead of nested subtasks
- **Cross-reference**: Always link to requirements (US-*) after each task
- **Early corrections**: If task breakdown reveals design issues, note them clearly
- **Checklist format**: Use `- [ ]` markdown checkboxes for actionable steps

## Task Format Example

```markdown
## Task 3: Customer Model (US-1, US-2, US-3)
- [ ] Create models/Customer.js with Mongoose schema
- [ ] Define fields: firstName (required, 1-100 chars), lastName (optional)
- [ ] Add phoneNumber validation regex
- [ ] Add index on phoneNumber for optimization
- [ ] Export Customer model
```

## Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

**Versioning Rule:**
- Initial: `spec/tasks-1.md`
- After changes: `spec/tasks-2.md`, `spec/tasks-3.md`, etc.
- **NEVER update spec/tasks-1.md in place** - always create a new versioned file

### First Iteration Output

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

### Steps

1. Write `spec/tasks-1.md`
2. Get user feedback
3. Iterate as needed
4. On confirmation, create `spec/tasks-confirmed.md`

## Confirming Tasks

When user says tasks are complete:

1. Create `spec/tasks-confirmed.md`
2. **STOP and explicitly ask:** "Tasks are confirmed. Ready to begin implementation?"
3. **Wait for explicit user confirmation** before any implementation

**Example response:**
```
Tasks are confirmed (spec/tasks-confirmed.md).

Summary: [number] tasks covering [key areas]

Ready to implement when you are. Would you like to:
- Start implementation (I can work through tasks)
- Review spec/tasks-confirmed.md first
- Adjust task ordering or granularity
```

## Tasks Quality Checklist

```
TASKS QUALITY CHECK:

✓ Requirements Traceability: All tasks link to US? [score/10]
✓ Granularity: Tasks 1-4 hours each? [score/10]
✓ Sequencing: Dependencies respected? [score/10]
✓ Actionability: Steps are concrete? [score/10]
✓ Coverage: All requirements have tasks? [score/10]

Overall Score: X/50
```

### Key Checks

- Every task has "Relevant Requirements" with US-* references
- No task is vague (e.g., "Implement X" without specifics)
- Task ordering allows sequential implementation
- No requirement is left without corresponding tasks
- Each task has concrete checkbox steps (not subtask headers)

### Scoring Guidelines

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
