# Requirements: Customer RESTful API

## Overview
A Node.js Express RESTful API application for managing customer records. The application provides CRUD (Create, Read, Update, Delete) operations for customers, with MongoDB as the persistence layer. Each customer has a first name, last name, and phone number.

## User Stories

### US-1: Create a new customer
**As a** API consumer (e.g., frontend developer or mobile app)
**I want** to create a new customer record
**So that** I can store customer information in the system

#### Acceptance Criteria
- [ ] AC-1.1: POST request to `/customers` endpoint creates a new customer
- [ ] AC-1.2: Request body must contain `firstName`, `lastName`, and `phoneNumber` fields
- [ ] AC-1.3: Returns HTTP 201 Created status with the created customer object
- [ ] AC-1.4: Returns HTTP 400 Bad Request if any required field is missing
- [ ] AC-1.5: Returns HTTP 400 Bad Request if any field is empty or invalid type
- [ ] AC-1.6: Returns HTTP 400 Bad Request if phone number already exists (uniqueness constraint)
- [ ] AC-1.7: Phone number must be 10-15 digits only
- [ ] AC-1.8: Generated customer object includes a unique identifier (id) in MongoDB ObjectId format

### US-2: Retrieve all customers
**As a** API consumer
**I want** to retrieve a list of all customers
**So that** I can display or process customer data

#### Acceptance Criteria
- [ ] AC-2.1: GET request to `/customers` endpoint returns all customers
- [ ] AC-2.2: Returns HTTP 200 OK with an array of customer objects
- [ ] AC-2.3: Returns empty array `[]` when no customers exist
- [ ] AC-2.4: Each customer object includes `id`, `firstName`, `lastName`, and `phoneNumber`

### US-3: Retrieve a single customer by ID
**As a** API consumer
**I want** to retrieve a specific customer by their ID
**So that** I can view or work with individual customer details

#### Acceptance Criteria
- [ ] AC-3.1: GET request to `/customers/:id` endpoint returns a single customer
- [ ] AC-3.2: Returns HTTP 200 OK with the customer object if found
- [ ] AC-3.3: Returns HTTP 404 Not Found if customer with given ID does not exist
- [ ] AC-3.4: Returns HTTP 400 Bad Request if ID format is invalid

### US-4: Update an existing customer
**As a** API consumer
**I want** to update an existing customer's information
**So that** I can modify customer data when it changes

#### Acceptance Criteria
- [ ] AC-4.1: PUT request to `/customers/:id` endpoint updates an existing customer
- [ ] AC-4.2: Request body can contain any combination of `firstName`, `lastName`, `phoneNumber` fields
- [ ] AC-4.3: Returns HTTP 200 OK with the updated customer object
- [ ] AC-4.4: Returns HTTP 404 Not Found if customer with given ID does not exist
- [ ] AC-4.5: Returns HTTP 400 Bad Request if ID format is invalid
- [ ] AC-4.6: Only provided fields are updated; missing fields remain unchanged

### US-5: Delete a customer
**As a** API consumer
**I want** to delete a customer from the system
**So that** I can remove obsolete or unwanted customer records

#### Acceptance Criteria
- [ ] AC-5.1: DELETE request to `/customers/:id` endpoint removes the customer
- [ ] AC-5.2: Returns HTTP 204 No Content on successful deletion
- [ ] AC-5.3: Returns HTTP 404 Not Found if customer with given ID does not exist
- [ ] AC-5.4: Returns HTTP 400 Bad Request if ID format is invalid

## Non-Functional Requirements

### Performance
- API responses should return within 200ms for read operations under normal load
- API responses should return within 500ms for write operations under normal load

### Security
- API should validate all input data to prevent injection attacks
- MongoDB connection string should be configurable via environment variables
- No sensitive data (passwords, keys) should be logged

### Scalability
- Application should support horizontal scaling (stateless design)
- MongoDB connection should use connection pooling

### Availability
- Application should handle graceful shutdown
- Application should return appropriate error messages for all failure scenarios

## Out of Scope
- User authentication and authorization
- Pagination for customer list
- Filtering or sorting of customers
- Phone number format validation (digits only, 10-15 characters)
- Email or notification features
- API documentation (Swagger/OpenAPI)
- Unit tests and integration tests

## Technical Specifications

### Entity Structure
```
Customer:
  - id: string (unique identifier, auto-generated)
  - firstName: string (required)
  - lastName: string (required)
  - phoneNumber: string (required)
```

### API Endpoints
| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| POST   | /customers    | Create customer      |
| GET    | /customers    | Get all customers    |
| GET    | /customers/:id| Get single customer  |
| PUT    | /customers/:id| Update customer      |
| DELETE | /customers/:id| Delete customer      |
