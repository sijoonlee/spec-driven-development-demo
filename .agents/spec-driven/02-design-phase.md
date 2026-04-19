# Design Phase

Design documents capture **how** the software will be built.

## Input

**Must have `spec/requirements-confirmed.md` before starting.**

Read the confirmed requirements to ensure all user stories are addressed in the design.

## Execution

**This phase is executed by a subagent.**

From SKILL.md context, launch:
```
Agent({
  description: "Write design",
  subagent_type: "general-purpose",
  prompt: "Read .agents/spec-driven/02-design-phase.md and spec/requirements-confirmed.md. Execute the Design Phase. Output to spec/design-1.md"
})
```

## Design Structure

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
|------|-----------|
| US-1 | Component X, Flow Y |
| US-2 | Component Z |
```

## Iteration Process

**CRITICAL: Always create new versioned files - never overwrite existing ones**

**Versioning Rule:**
- Initial: `spec/design-1.md`
- After changes: `spec/design-2.md`, `spec/design-3.md`, etc.
- **NEVER update spec/design-1.md in place** - always create a new versioned file

### First Iteration Output

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

### Subsequent Iterations Output

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

### Steps

1. Write `spec/design-1.md`
2. Get user feedback
3. Iterate to `spec/design-2.md`, etc.
4. On confirmation, create `spec/design-confirmed.md`
5. **Ask:** "Design is confirmed. Would you like to proceed to Tasks?"

## Design Quality Checklist

```
DESIGN QUALITY CHECK:

✓ Requirements Coverage: All US addressed? [score/10]
✓ Data Model: Entities/relationships defined? [score/10]
✓ Error Handling: Failure modes addressed? [score/10]
✓ Security: Auth/authz/data protection covered? [score/10]
✓ Testability: Testing strategy included? [score/10]

Overall Score: X/50
```

### Key Checks

- Requirements traceability table is complete (no orphaned US)
- Domain model identifies bounded contexts and entities
- Critical data flows documented (trigger → steps → outcome)
- Error categories defined with handling strategy
- Security considerations address auth, authz, and data protection

### Scoring Guidelines

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
