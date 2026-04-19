# Spec-Driven Development Guide

**Name:** spec-driven-development
**Version:** 1.0
**Purpose:** Build software from specifications, not live code

This guide defines the **spec-first development workflow**: build from specifications, not live code.

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│           Step 1: Analyze (via Explore subagent)               │
│  • Input: existing codebase                                     │
│  • Output: analysis summary                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│       Step 2: Requirements Phase (via subagent)                │
│  • Input: analysis summary                                      │
│  • See: 01-requirements-phase.md                                │
│  • Output: spec/requirements-{version}.md                       │
│  • Final: spec/requirements-confirmed.md                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│          Step 3: Design Phase (via subagent)                   │
│  • Input: spec/requirements-confirmed.md                        │
│  • See: 02-design-phase.md                                      │
│  • Output: spec/design-{version}.md                             │
│  • Final: spec/design-confirmed.md                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           Step 4: Tasks Phase (via subagent)                   │
│  • Input: spec/design-confirmed.md and spec/requirements-confirmed.md |
│  • See: 03-tasks-phase.md                                       │
│  • Output: spec/tasks-{version}.md                              │
│  • Final: spec/tasks-confirmed.md                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│          Step 5: Implementation (via subagent)                │
│  • Input: requirements-confirmed.md, design-confirmed.md,      │
│           tasks-confirmed.md                                    │
│  • See: 04-implementation-phase.md                              │
│  • Execute tasks sequentially with user review points          │
│  • Validate against acceptance criteria                        │
└─────────────────────────────────────────────────────────────────┘
```

## Phase Guides

Each phase has detailed documentation and is **executed by a subagent**:

| Phase | Guide File | Input | Output |
|-------|------------|-------|--------|
| Requirements | 01-requirements-phase.md | Analysis summary | spec/requirements-confirmed.md |
| Design | 02-design-phase.md | spec/requirements-confirmed.md | spec/design-confirmed.md |
| Tasks | 03-tasks-phase.md | spec/design-confirmed.md | spec/tasks-confirmed.md |
| Implementation | 04-implementation-phase.md | All confirmed specs | Working implementation |

## Executing a Phase

To execute any phase, launch a subagent with the phase guide:

```
Agent({
  description: "[Phase] subagent",
  subagent_type: "general-purpose",
  prompt: "Read .agents/spec-driven/[phase-guide].md and its input file. Execute the [Phase]. Output to spec/[phase]-1.md"
})
```

**Examples:**
- Requirements: Launch subagent with `01-requirements-phase.md`
- Design: Launch subagent with `02-design-phase.md` + `spec/requirements-confirmed.md`
- Tasks: Launch subagent with `03-tasks-phase.md` + `spec/design-confirmed.md`

## Golden Rule

**Write specifications in `spec/` - implement from `spec/`, never from memory or live code.**

### Versioning Rule

**CRITICAL: Always create new versioned files - never overwrite existing ones**

- Requirements: `spec/requirements-1.md` → `spec/requirements-2.md` → ... → `spec/requirements-confirmed.md`
- Design: `spec/design-1.md` → `spec/design-2.md` → ... → `spec/design-confirmed.md`
- Tasks: `spec/tasks-1.md` → `spec/tasks-2.md` → ... → `spec/tasks-confirmed.md`

Each `{version}.md` is a COMPLETE document. Do not modify earlier versions.

### Phase Transitions

**Each phase ends with an explicit confirmation gate:**

1. Requirements complete? → Ask user before proceeding to Design
2. Design complete? → Ask user before proceeding to Tasks
3. Tasks complete? → Ask user before starting Implementation

**Do not auto-generate the next phase** - wait for explicit user approval.

## Step 1: Codebase Analysis

When starting with an existing codebase:

1. Launch Explore subagent with thoroughness="very thorough"
2. Present findings with:
   - Key patterns found
   - Potential issues
   - Missing elements
3. Ask user: "What would you like to focus on?"

**Only proceed to Requirements after user confirms focus area**

## Implementation Strategy

When executing tasks from confirmed spec:

1. Work through tasks in order
2. For each task:
   - Read relevant requirements (US-*) and design sections
   - Implement the concrete steps
   - Write tests that validate acceptance criteria
   - Update docs if needed
3. Mark task complete only when:
   - All checklist items done
   - Tests pass
   - Acceptance criteria met

## File Locations

```
spec/
├── requirements-1.md (first draft)
├── requirements-2.md (revisions)
├── ...
├── requirements-confirmed.md (final)
├── design-1.md (first draft)
├── design-2.md (revisions)
├── ...
├── design-confirmed.md (final)
├── tasks-1.md (first draft)
├── tasks-2.md (revisions)
├── ...
└── tasks-confirmed.md (final)
```

## Quick Reference

**Quality Checks (0-50 score, ≥40 to proceed):**

- Requirements: Coverage, Specificity, Completeness, Clarity, Edge Cases
- Design: Requirements Coverage, Data Model, Error Handling, Security, Testability
- Tasks: Requirements Traceability, Granularity, Sequencing, Actionability, Coverage

**Iteration Pattern:**
1. Write `spec/{phase}-1.md`
2. Show summary + quality check
3. Get user feedback
4. Write `spec/{phase}-2.md` (NEW FILE)
5. Repeat until confirmed
6. Create `spec/{phase}-confirmed.md`
7. Ask for permission to proceed to next phase
