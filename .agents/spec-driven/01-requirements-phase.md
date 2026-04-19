# Requirements Phase

Requirements documents capture **what** the software should do, not **how**.

## Execution

**This phase is executed by a subagent.**

From SKILL.md context, launch:
```
Agent({
  description: "Write requirements",
  subagent_type: "general-purpose",
  prompt: "Read .agents/spec-driven/01-requirements-phase.md and execute the Requirements Phase. Output to spec/requirements-1.md"
})
```

## Requirements Structure

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

## Requirements Guidelines

- Number user stories sequentially (US-1, US-2, etc.) for cross-reference
- Make acceptance criteria testable and specific
- Include edge cases in acceptance criteria
- Separate functional from non-functional requirements

## Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

1. Write initial requirements based on analysis → `spec/requirements-1.md`
2. Present **summary of changes** to user (not full file)
3. User can ask to see full file if needed
4. **When user requests changes: create `spec/requirements-2.md` as a NEW file**
5. **Next changes: create `spec/requirements-3.md`, and so on**
6. **NEVER update `spec/requirements-1.md` in place** - always create a new versioned file
7. Repeat until user confirms

### First Iteration Output

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

### Subsequent Iterations Output

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

## Confirming Requirements

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

## Requirements Quality Checklist

Run these checks on requirements documents:

```
REQUIREMENTS QUALITY CHECK:

✓ Coverage: All user journeys identified? [score/10]
✓ Specificity: Acceptance criteria testable? [score/10]
✓ Completeness: Non-functional requirements included? [score/10]
✓ Clarity: No ambiguity in user stories? [score/10]
✓ Edge Cases: Error scenarios covered? [score/10]

Overall Score: X/50
```

### Key Checks

- Each user story has clear "As a/I want/So that" format
- Each user story has ≥3 acceptance criteria
- Acceptance criteria are measurable/testable
- Non-functional requirements (performance, security, scalability) present
- "Out of Scope" section explicitly defined

### Scoring Guidelines

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
