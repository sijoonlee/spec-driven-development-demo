# Phase 4: Implementation

This phase executes the confirmed tasks from `spec/tasks-confirmed.md` using a sub-agent that has full access to the requirements, design, and task specifications.

## Implementation Approach

### 1. Launch Implementation Sub-Agent

Create a dedicated implementation agent with access to all confirmed specs:

```
Agent({
  description: "Implementation agent",
  prompt: "Implement the tasks from spec/tasks-confirmed.md. You have access to:
  - spec/requirements-confirmed.md - User stories and acceptance criteria
  - spec/design-confirmed.md - Architecture, data models, data flows
  - spec/tasks-confirmed.md - Actionable task breakdown

  Work through tasks sequentially. After completing each task:
  1. Verify it meets the acceptance criteria from requirements-confirmed.md
  2. Follow the design specifications from design-confirmed.md
  3. Report completion and wait for user confirmation before proceeding
  4. If you discover design issues, note them and ask whether to update design-confirmed.md"
})
```

### 2. Sequential Task Execution

The implementation agent should:

**Before Starting:**
- Read all three confirmed files (`requirements-confirmed.md`, `design-confirmed.md`, `tasks-confirmed.md`)
- Verify the spec files exist and are accessible
- Report to user: "Ready to implement. Starting with Task 1: [title]"

**For Each Task:**
1. **Read the task** - Get the current task from tasks-confirmed.md
2. **Reference design** - Check design-confirmed.md for relevant components/data flows
3. **Implement** - Execute the checkbox steps
4. **Verify** - Check against acceptance criteria in requirements-confirmed.md
5. **Report** - Show user what was implemented and ask to proceed

**Example Task Execution:**

```
---
Implementing Task 3: Customer Model (US-1, US-2, US-3)
---

Reading design-confirmed.md for domain model...
✓ Customer entity defined in "User" bounded context
✓ Fields: firstName, lastName, phoneNumber

Reading requirements-confirmed.md for US-1, US-2, US-3 acceptance criteria...
✓ US-1: Customer registration with validation
✓ US-2: Customer profile management
✓ US-3: Phone number uniqueness

Executing steps:
✓ Create models/Customer.js with Mongoose schema
✓ Define fields: firstName (required, 1-100 chars), lastName (optional)
✓ Add phoneNumber validation regex
✓ Add index on phoneNumber for optimization
✓ Export Customer model

Task 3 complete. Ready for Task 4.

What would you like to do?
- Proceed to next task
- Review what was implemented
- Adjust design before continuing
```

### 3. Iteration Points

**When to stop and ask for input:**

After each task, the implementation agent should pause and allow:

1. **User review** - User can check the implementation
2. **Design corrections** - If tasks reveal design flaws, update design-confirmed.md
3. **Task adjustments** - If new tasks are needed, update tasks-confirmed.md
4. **Continue** - Proceed to next task

**Handling Design Issues:**

If implementation reveals design problems:

```
⚠️ Design Issue Detected

While implementing Task X, I found:
- [Issue description]
- [Impact on requirements]

Options:
1. Update design-confirmed.md and continue
2. Adjust current implementation to work around it
3. Revisit task breakdown

What would you like to do?
```

### 4. Completion Checklist

After all tasks are complete:

```
✅ Implementation Complete

Summary:
- Tasks completed: [number]/[number]
- Files created/modified: [list]
- Design corrections made: [if any]

Next steps:
1. Run tests
2. Review implementation against requirements
3. Deploy or handoff
```

## Memory Updates

After implementation phase, save patterns:

```
After implementation completes:
- Which design patterns worked well in practice
- Which task granularities were appropriate
- Common corrections needed between design and implementation
- Time estimates for similar task types
```

Store in `spec/.memory/implementation-patterns.md`.

## Error Handling

**If implementation agent encounters blockers:**

1. **Missing requirements** - Ask user to clarify which US-acceptance criteria applies
2. **Ambiguous design** - Propose solution, ask user to update design-confirmed.md
3. **Task too large** - Break into smaller tasks, add to tasks-confirmed.md
4. **External dependency** - Note the dependency, ask user if they want to mock or implement

**Always preserve spec integrity:**
- Never modify confirmed specs without explicit user approval
- Create `spec/corrections.md` to track design/task changes during implementation
- Maintain traceability: each change links back to original requirement

## Testing Strategy

The implementation agent should:

1. **Write tests alongside code** - Each checkbox step should include test updates
2. **Run tests after each task** - Verify nothing broke
3. **Report test results** - Show user passing/failing tests
4. **Fix failures before proceeding** - Don't leave broken tests behind

**Example:**

```
Running tests after Task 3...
✓ Customer model tests: 12 passed
✓ Integration tests: 8 passed

All tests passing. Proceeding to Task 4.
```

## Example Usage

**User:** "Create a spec for a RESTful book library API"

**Agent:** Follows phases 1-4 (requirements → design → tasks → confirm)

**User:** "Start implementation"

**Implementation Agent (spawned):**

```
Reading spec files...
✓ requirements-confirmed.md (6 user stories)
✓ design-confirmed.md (3 bounded contexts, 2 layers)
✓ tasks-confirmed.md (15 tasks)

Starting Task 1: Project Setup
- [ ] Initialize Node.js project
- [ ] Install dependencies (Express, Mongoose, etc.)
- [ ] Configure TypeScript
- [ ] Set up ESLint and Prettier

[Agent executes steps]

Task 1 complete. Tests passing.
Proceed to Task 2?
```

**User:** "yes"

**Implementation Agent:**

```
Starting Task 2: User Authentication Models
- [ ] Create User schema with email, password hash, timestamps
- [ ] Add email uniqueness validation
- [ ] Add password hashing middleware
- [ ] Export User model

[Agent executes steps]

Task 2 complete. Tests passing.
Proceed to Task 3?
```

[Continues until all tasks complete]
