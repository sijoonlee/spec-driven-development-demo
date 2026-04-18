# Requirements: Customer CRUD API

## Overview
A Node.js Express REST API with MongoDB persistence providing CRUD operations for Customer management.

## User Stories

### US-1: Create Customer
**As a** API user
**I want** to create a new customer record
**So that** I can store customer information in the system

#### Acceptance Criteria
- [ ] POST /customers accepts JSON body with firstName, lastName, phoneNumber
- [ ] Returns 201 Created with the created customer object including id
- [ ] Returns 400 Bad Request if firstName is missing or empty
- [ ] Returns 400 Bad Request if lastName is missing or empty
- [ ] Returns 400 Bad Request if phoneNumber is missing or empty
- [ ] Generated id is a valid MongoDB ObjectId

### US-2: Get All Customers
**As a** API user
**I want** to retrieve all customers
**So that** I can view the complete list of customers

#### Acceptance Criteria
- [ ] GET /customers returns array of all customer objects
- [ ] Returns 200 OK with empty array when no customers exist
- [ ] Each customer object includes id, firstName, lastName, phoneNumber

### US-3: Get Customer by ID
**As a** API user
**I want** to retrieve a specific customer by ID
**So that** I can view individual customer details

#### Acceptance Criteria
- [ ] GET /customers/:id returns the customer object
- [ ] Returns 200 OK with customer data when found
- [ ] Returns 404 Not Found when customer ID does not exist
- [ ] Returns 400 Bad Request when ID is not a valid MongoDB ObjectId format

### US-4: Update Customer
**As a** API user
**I want** to update an existing customer's information
**So that** I can modify customer data when it changes

#### Acceptance Criteria
- [ ] PUT /customers/:id accepts JSON body with firstName, lastName, phoneNumber
- [ ] Returns 200 OK with updated customer object
- [ ] Returns 404 Not Found when customer ID does not exist
- [ ] Returns 400 Bad Request when ID is invalid format
- [ ] All fields are required (no partial updates)

### US-5: Delete Customer
**As a** API user
**I want** to delete a customer record
**So that** I can remove outdated or incorrect customer data

#### Acceptance Criteria
- [ ] DELETE /customers/:id removes the customer
- [ ] Returns 204 No Content on successful deletion
- [ ] Returns 404 Not Found when customer ID does not exist
- [ ] Returns 400 Bad Request when ID is not valid MongoDB ObjectId format

## Non-Functional Requirements

### Performance
- Response time under 200ms for all endpoints under normal load

### Security
- Validate and sanitize all input data
- Return proper HTTP status codes for error conditions

### Scalability
- Use MongoDB connection pooling

## Out of Scope
- User authentication and authorization
- Pagination for customer list
- Search/filter functionality
- Soft delete (use hard delete)
- Input field length validation beyond required/non-empty
