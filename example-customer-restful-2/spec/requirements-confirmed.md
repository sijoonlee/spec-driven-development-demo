# Requirements: Customer RESTful API (Confirmed)

## Overview
A Node.js Express application providing RESTful CRUD endpoints for managing customer records. The application uses MongoDB as the persistence layer and exposes four endpoints for Create, Read, Update, and Delete operations on Customer entities.

## User Stories

### US-1: Create Customer
**As a** API consumer
**I want** to create a new customer record
**So that** customer information can be stored in the system

#### Acceptance Criteria
- [x] POST /customers endpoint accepts a JSON body with customer data
- [x] Customer record is created with firstName, lastName, and phoneNumber fields
- [x] API returns HTTP 201 Created status on success
- [x] API returns the created customer object in the response body with _id field
- [x] API returns HTTP 400 Bad Request if required fields are missing
- [x] API returns HTTP 400 Bad Request if phone number format is invalid (regex: ^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$)
- [x] Duplicate phone numbers are rejected with HTTP 409 Conflict
- [x] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-2: Get All Customers
**As a** API consumer
**I want** to retrieve all customer records
**So that** I can view the complete list of customers

#### Acceptance Criteria
- [x] GET /customers endpoint returns all customer records
- [x] Response includes an array of customer objects
- [x] Each customer object includes _id, firstName, lastName, and phoneNumber
- [x] API returns HTTP 200 OK status on success
- [x] API returns empty array when no customers exist

### US-3: Get Single Customer
**As a** API consumer
**I want** to retrieve a specific customer by ID
**So that** I can view details of a particular customer

#### Acceptance Criteria
- [x] GET /customers/:id endpoint accepts a customer ID parameter
- [x] API returns the customer object if found
- [x] API returns HTTP 200 OK status on success
- [x] API returns HTTP 404 Not Found if customer does not exist
- [x] Invalid MongoDB ObjectId format returns HTTP 400 Bad Request
- [x] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-4: Update Customer
**As a** API consumer
**I want** to update an existing customer record
**So that** I can modify customer information when it changes

#### Acceptance Criteria
- [x] PUT /customers/:id endpoint accepts a customer ID and updated data
- [x] Customer record is updated with provided fields
- [x] API returns HTTP 200 OK status on success
- [x] API returns the updated customer object in the response
- [x] API returns HTTP 404 Not Found if customer does not exist
- [x] Partial updates are supported (only provided fields are changed)
- [x] Phone number validation applies to updates as well
- [x] Error response format: `{ "errors": [ { "message": "error description" } ] }`

### US-5: Delete Customer
**As a** API consumer
**I want** to delete a customer record
**So that** I can remove obsolete customer data from the system

#### Acceptance Criteria
- [x] DELETE /customers/:id endpoint accepts a customer ID parameter
- [x] Customer record is permanently deleted from the database
- [x] API returns HTTP 204 No Content status on success
- [x] API returns HTTP 404 Not Found if customer does not exist
- [x] Deleted records cannot be recovered (permanent deletion)

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
