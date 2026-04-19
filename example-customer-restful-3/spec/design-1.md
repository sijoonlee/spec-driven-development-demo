# Design: Customer RESTful API

## Overview

This design fulfills the requirements for a Node.js Express RESTful API for managing customer records. The application provides CRUD operations with MongoDB as the persistence layer, following RESTful conventions and addressing all acceptance criteria from the confirmed requirements.

## Domain Model (DDD)

### Bounded Contexts

**Customer Management Context**
- **Description**: Core domain for managing customer lifecycle (create, read, update, delete)
- **Entities**:
  - `Customer`: Domain entity representing a customer record
- **Value Objects**:
  - `CustomerId`: MongoDB ObjectId wrapper
  - `FirstName`: Non-empty string
  - `LastName`: Non-empty string
  - `PhoneNumber`: 10-15 digit string, unique constraint
- **Aggregates**:
  - `CustomerAggregate`: Root aggregate managing customer operations and uniqueness validation

### Domain Relationships

```
+------------------+     uses      +------------------+
| Customer         |  <--------->  | Customer         |
| Repository       |               | Service          |
+------------------+               +------------------+
       |                       ^
       |                       |
+------------------+     uses  |
| Customer         |  ---------+
| Controller       |
+------------------+
```

- Controllers handle HTTP requests/responses and delegate to Services
- Services contain business logic and validate domain constraints
- Repositories abstract MongoDB operations

## Architecture

### Components/Layers

- **Presentation Layer (Controller)**: Express routes handling HTTP requests, input validation, and response formatting
  - Technologies: Express.js, express-validator
- **Business Logic Layer (Service)**: Domain operations, validation rules, uniqueness checks
  - Technologies: Node.js custom services
- **Data Access Layer (Repository)**: MongoDB CRUD operations
  - Technologies: MongoDB Node.js driver
- **Persistence Layer (MongoDB)**: Document database for customer storage
  - Technologies: MongoDB with connection pooling

### Component Diagram

```
+-------------------+
|   HTTP Client     |
+-------------------+
        |
        | HTTP Requests
        v
+-------------------+
|   Express App     |
| +---------------+ |
| | Middleware    | | <-- Error handling, CORS, body parsing
| +---------------+ |
|        |          |
| +---------------+ |
| | Controllers   | | <-- Route handlers
| +---------------+ |
|        |          |
| +---------------+ |
| | Services      | | <-- Business logic
| +---------------+ |
|        |          |
| +---------------+ |
| | Repositories  | | <-- Data access
| +---------------+ |
+-------------------+
        |
        | Mongoose/MongoDB Driver
        v
+-------------------+
|   MongoDB         |
+-------------------+
```

### Request Flow Diagram

```
Client          Express App           Service          Repository        MongoDB
  |                  |                    |                |              |
  |-- POST /customers
  |                  |                    |                |              |
  |                  |-- Validate Request
  |                  |                    |                |              |
  |                  |-- Create Customer  |                |              |
  |                  |--------------------|                |              |
  |                  |                    |                |              |
  |                  |                    |-- Check Phone Uniqueness      |
  |                  |                    |----------------|--------------|
  |                  |                    |                |      |       |
  |                  |                    |                |<----- Query--|
  |                  |                    |                |              |
  |                  |                    |                |-- Insert ---->|
  |                  |                    |                |--------------|
  |                  |                    |                |              |
  |                  |                    |<-- Customer    |              |
  |                  |--------------------|                |              |
  |<-- 201 Created   |<--- Customer       |                |              |
  |------------------|--------------------|                |              |
```

## Data Flow

### Key Flows

#### 1. Create Customer Flow
- **Trigger**: POST `/customers` with customer data
- **Steps**:
  1. Validate request body contains required fields (firstName, lastName, phoneNumber)
  2. Validate field types and non-empty values
  3. Validate phone number format (10-15 digits only)
  4. Check phone number uniqueness in database
  5. Create Customer document with auto-generated ID
  6. Save to MongoDB
  7. Return 201 Created with customer object
- **Data**: Request body → Validated DTO → Customer Entity → MongoDB Document

#### 2. Get All Customers Flow
- **Trigger**: GET `/customers`
- **Steps**:
  1. Query all customer documents from MongoDB
  2. Format as array of customer objects
  3. Return 200 OK with array (empty array if none exist)
- **Data**: MongoDB Documents → Array of Customer Objects

#### 3. Get Single Customer Flow
- **Trigger**: GET `/customers/:id`
- **Steps**:
  1. Validate ID format (MongoDB ObjectId)
  2. Query customer by ID from MongoDB
  3. Return 200 OK if found, 404 if not found
- **Data**: Request ID → Customer Document → Customer Object

#### 4. Update Customer Flow
- **Trigger**: PUT `/customers/:id` with update data
- **Steps**:
  1. Validate ID format
  2. Validate provided field values
  3. Check if customer exists
  4. Update only provided fields (partial update)
  5. Return 200 OK with updated customer
- **Data**: Request ID + Partial Body → Updated Customer Document → Customer Object

#### 5. Delete Customer Flow
- **Trigger**: DELETE `/customers/:id`
- **Steps**:
  1. Validate ID format
  2. Query and delete customer by ID
  3. Return 204 No Content on success, 404 if not found
- **Data**: Request ID → Deletion Operation

### Data Models

```typescript
// Domain Entity
interface Customer {
  id: string;           // MongoDB ObjectId
  firstName: string;    // Required, non-empty
  lastName: string;     // Required, non-empty
  phoneNumber: string;  // Required, 10-15 digits, unique
}

// Request DTOs
interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface UpdateCustomerRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// Response DTOs
interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// MongoDB Schema
interface CustomerDocument {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Error Handling

### Error Categories

- **Validation Errors (400 Bad Request)**:
  - Missing required fields
  - Invalid field types
  - Empty string values
  - Invalid phone number format (not 10-15 digits)
  - Duplicate phone number
  - Invalid ID format (not valid ObjectId)

- **Not Found Errors (404 Not Found)**:
  - Customer ID does not exist
  - Resource not found on update/delete

- **Runtime Errors (500 Internal Server Error)**:
  - MongoDB connection failures
  - Unexpected server errors
  - Database operation failures

- **External Service Errors**:
  - MongoDB connection timeout
  - Connection pool exhausted

### Error Flow

```
Controller Level
     |
     |-- Validate Input
     |-- Invalid? -> Return 400 with error details
     |-- Valid -> Pass to Service
     |
Service Level
     |
     |-- Business Logic Validation
     |-- Constraint Violation? -> Return 400 with error details
     |-- Pass to Repository
     |
Repository Level
     |
     |-- Database Operation
     |-- Document Not Found? -> Return 404
     |-- DB Error? -> Return 500 with generic message
```

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;        // Error type/category
  message: string;      // Human-readable message
  details?: object;     // Optional field-level details
}

// Example responses:
// { "error": "VALIDATION_ERROR", "message": "Missing required field: firstName" }
// { "error": "NOT_FOUND", "message": "Customer not found" }
// { "error": "VALIDATION_ERROR", "message": "Phone number must be 10-15 digits" }
```

## Testing Strategy

### Unit Tests

- **Controller Tests**:
  - Request validation logic
  - HTTP status code responses
  - Response formatting

- **Service Tests**:
  - Business logic validation
  - Phone number uniqueness logic
  - Partial update logic

- **Repository Tests**:
  - MongoDB query construction
  - Data transformation

- **Coverage Goal**: Core business logic coverage (service layer)

### Integration Tests

- **API Endpoint Tests**:
  - Full request/response cycle for each endpoint
  - Error handling paths
  - MongoDB integration with test database

### E2E Tests

- **Critical User Journeys**:
  1. Create customer → Get customer → Update customer → Delete customer
  2. Create customer with duplicate phone number → Validate error
  3. Get non-existent customer → Validate 404
  4. Create customer with invalid data → Validate 400

## Security Considerations

### Authentication/Authorization
- Out of scope for this implementation (per requirements)
- API is publicly accessible (no auth required)

### Data Protection
- MongoDB connection string stored in environment variables
- No sensitive data (passwords, keys) logged
- Error messages do not expose internal system details

### Input Validation
- All input validated at controller level before processing
- Phone number format validation (regex for 10-15 digits)
- ID format validation (ObjectId validation)
- String field non-empty validation
- Type checking for all fields

### Threat Mitigation
- **Injection Attacks**: MongoDB driver handles parameterized queries
- **NoSQL Injection**: Input validation and MongoDB driver safety
- **Data Exposure**: Error messages sanitized, no stack traces in production

## Performance Considerations

### Expected Load
- Single API server instance
- MongoDB with connection pooling

### Bottlenecks to Address
- Phone number uniqueness check on create/update (requires index)
- MongoDB connection management (use connection pool)

### Caching Strategy
- No caching required (stateless design)
- Response times target: 200ms (reads), 500ms (writes)

### Database Indexes
```javascript
// Unique index on phoneNumber for O(1) lookup
db.customers.createIndex({ phoneNumber: 1 }, { unique: true });

// Default _id index on MongoDB ObjectId
```

### Graceful Shutdown
```
SIGTERM/SIGINT received
     |
     |-- Stop accepting new requests
     |-- Complete in-flight requests (with timeout)
     |-- Close MongoDB connection
     |-- Exit process
```

## Requirements Traceability

| Requirement | Design Element |
|--------|----------------|
| US-1: Create Customer | CustomerController POST, CustomerService.create(), Phone uniqueness validation |
| US-1 AC-1.1 | POST /customers endpoint |
| US-1 AC-1.2 | CreateCustomerRequest DTO |
| US-1 AC-1.3 | Returns 201 with customer object |
| US-1 AC-1.4 | Validation middleware, error handling |
| US-1 AC-1.5 | Input validation logic |
| US-1 AC-1.6 | Phone uniqueness check in service |
| US-1 AC-1.7 | Phone regex validation |
| US-1 AC-1.8 | MongoDB auto-generated ObjectId |
| US-2: Get All Customers | CustomerController GET /customers, Repository.find() |
| US-2 AC-2.1 | GET /customers endpoint |
| US-2 AC-2.2 | Returns 200 with array |
| US-2 AC-2.3 | Empty array when no results |
| US-2 AC-2.4 | CustomerResponse format |
| US-3: Get Single Customer | CustomerController GET /customers/:id, Repository.findById() |
| US-3 AC-3.1 | GET /customers/:id endpoint |
| US-3 AC-3.2 | Returns 200 with customer |
| US-3 AC-3.3 | Returns 404 when not found |
| US-3 AC-3.4 | ObjectId validation |
| US-4: Update Customer | CustomerController PUT, CustomerService.update() |
| US-4 AC-4.1 | PUT /customers/:id endpoint |
| US-4 AC-4.2 | UpdateCustomerRequest with optional fields |
| US-4 AC-4.3 | Returns 200 with updated customer |
| US-4 AC-4.4 | Returns 404 when not found |
| US-4 AC-4.5 | ObjectId validation |
| US-4 AC-4.6 | Partial update logic in service |
| US-5: Delete Customer | CustomerController DELETE, Repository.deleteById() |
| US-5 AC-5.1 | DELETE /customers/:id endpoint |
| US-5 AC-5.2 | Returns 204 No Content |
| US-5 AC-5.3 | Returns 404 when not found |
| US-5 AC-5.4 | ObjectId validation |
| NFR: Performance | Connection pooling, database indexes |
| NFR: Security | Input validation, env vars for connection |
| NFR: Scalability | Stateless design |
| NFR: Availability | Graceful shutdown handling |

## Environment Configuration

```typescript
interface Config {
  PORT: number;
  MONGODB_URI: string;
  NODE_ENV: 'development' | 'production';
}

// Environment variables:
// PORT=3000
// MONGODB_URI=mongodb://localhost:27017/customers_db
// NODE_ENV=development
```

## API Specification Summary

| Method | Endpoint | Request Body | Success Response | Error Responses |
|--------|----------|--------------|------------------|-----------------|
| POST | /customers | CreateCustomerRequest | 201 CustomerResponse | 400 Validation |
| GET | /customers | None | 200 CustomerResponse[] | 500 Server Error |
| GET | /customers/:id | None | 200 CustomerResponse | 400 Invalid ID, 404 Not Found |
| PUT | /customers/:id | UpdateCustomerRequest | 200 CustomerResponse | 400 Invalid, 404 Not Found |
| DELETE | /customers/:id | None | 204 No Content | 400 Invalid ID, 404 Not Found |

---

## Quality Check

**Requirements Coverage:** 9/10
- All 5 user stories traced to design components
- All acceptance criteria addressed
- Minor: Non-functional requirements could have more detailed implementation specs

**Data Model:** 8/10
- Clear entity structure defined
- Request/Response DTOs specified
- MongoDB schema documented
- Missing: Timestamps for createdAt/updatedAt handling details

**Error Handling:** 9/10
- Error categories well defined
- Error response format specified
- Error flow documented
- Validation rules for each error type

**Security:** 7/10
- Input validation covered
- Environment variable configuration mentioned
- Auth/authz out of scope (acknowledged)
- Missing: Detailed threat modeling, rate limiting considerations

**Testability:** 7/10
- Unit, integration, and E2E strategies defined
- Test scope specified
- Missing: Testing framework choices, mocking strategy

**Overall Score: 40/50**

---

**Design Notes:**
- Stateless architecture supports horizontal scaling
- MongoDB connection pooling configured for performance
- Error responses do not leak internal details
- Phone number uniqueness enforced at database level
```
