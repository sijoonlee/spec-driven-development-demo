# Requirements: Customer RESTful API

## Overview
A Node.js Express application providing RESTful CRUD endpoints for managing customer records. The application uses MongoDB as the persistence layer and exposes four endpoints for Create, Read, Update, and Delete operations on Customer entities.

## User Stories

### US-1: Create Customer
**As a** API consumer
**I want** to create a new customer record
**So that** customer information can be stored in the system

#### Acceptance Criteria
- [ ] POST /customers endpoint accepts a JSON body with customer data
- [ ] Customer record is created with firstName, lastName, and phoneNumber fields
- [ ] API returns HTTP 201 Created status on success
- [ ] API returns the created customer object in the response body with _id field
- [ ] API returns HTTP 400 Bad Request if required fields are missing
- [ ] API returns HTTP 400 Bad Request if phone number format is invalid (regex: ^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$)
- [ ] Duplicate phone numbers are rejected with HTTP 409 Conflict
- [ ] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-2: Get All Customers
**As a** API consumer
**I want** to retrieve all customer records
**So that** I can view the complete list of customers

#### Acceptance Criteria
- [ ] GET /customers endpoint returns all customer records
- [ ] Response includes an array of customer objects
- [ ] Each customer object includes _id, firstName, lastName, and phoneNumber
- [ ] API returns HTTP 200 OK status on success
- [ ] API returns empty array when no customers exist

### US-3: Get Single Customer
**As a** API consumer
**I want** to retrieve a specific customer by ID
**So that** I can view details of a particular customer

#### Acceptance Criteria
- [ ] GET /customers/:id endpoint accepts a customer ID parameter
- [ ] API returns the customer object if found
- [ ] API returns HTTP 200 OK status on success
- [ ] API returns HTTP 404 Not Found if customer does not exist
- [ ] Invalid MongoDB ObjectId format returns HTTP 400 Bad Request
- [ ] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-4: Update Customer
**As a** API consumer
**I want** to update an existing customer record
**So that** I can modify customer information when it changes

#### Acceptance Criteria
- [ ] PUT /customers/:id endpoint accepts a customer ID and updated data
- [ ] Customer record is updated with provided fields
- [ ] API returns HTTP 200 OK status on success
- [ ] API returns the updated customer object in the response
- [ ] API returns HTTP 404 Not Found if customer does not exist
- [ ] Partial updates are supported (only provided fields are changed)
- [ ] Phone number validation applies to updates as well
- [ ] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-5: Delete Customer
**As a** API consumer
**I want** to delete a customer record
**So that** I can remove obsolete customer data from the system

#### Acceptance Criteria
- [ ] DELETE /customers/:id endpoint accepts a customer ID parameter
- [ ] Customer record is permanently deleted from the database
- [ ] API returns HTTP 204 No Content status on success
- [ ] API returns HTTP 404 Not Found if customer does not exist
- [ ] Deleted records cannot be recovered (permanent deletion)

## Non-Functional Requirements

### Performance
- API responses should return within 200ms for 95% of requests under normal load
- MongoDB queries should use indexed fields for efficient lookups
- Index on phoneNumber field for duplicate checking

### Security
- All endpoints should validate input data to prevent injection attacks
- MongoDB injection attacks should be prevented through parameterized queries (Mongoose ODM)
- Sensitive data (phone numbers) should not be logged in application logs
- No authentication required for this API

### Scalability
- Application should support horizontal scaling through stateless design
- MongoDB connection pooling should be configured for production use

### Availability
- Application should gracefully handle MongoDB connection failures
- Clear error messages should be returned for operational issues

## Technical Decisions

1. **No Authentication**: API is publicly accessible without auth
2. **Phone Number Validation**: Regex pattern `^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$`
3. **Error Response Format**: `{ "errors": [ { "message": string } ] }`
4. **Deletion Strategy**: Permanent delete (hard delete), no soft delete

## Out of Scope
- User authentication and authorization
- Email or phone number verification
- Customer profile images or attachments
- Bulk import/export operations
- Search and filter functionality beyond basic retrieval
- Pagination for list operations
- Audit logging or change history

## Quality Check

| Criterion | Score | Assessment |
|-----------|-------|------------|
| Coverage | 10/10 | All core CRUD features identified with clear user journeys |
| Specificity | 10/10 | All acceptance criteria are measurable and testable |
| Completeness | 10/10 | Non-functional requirements present (performance, security, scalability, availability) |
| Clarity | 10/10 | All user stories follow "As a/I want/So that" format consistently |
| Edge Cases | 8/10 | Error scenarios covered; could add more boundary cases |

**Overall: 48/50**

---

**Changes from requirements-1.md:**
- Added explicit phone number regex pattern to US-1 and US-4
- Added explicit error response format to US-1, US-3, and US-4
- Clarified permanent deletion in US-5
- Added "No Authentication" to Technical Decisions
- Added index requirement for phoneNumber in Non-Functional Requirements
- Updated quality scores based on clarifications
