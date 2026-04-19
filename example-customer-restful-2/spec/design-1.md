# Design: Customer RESTful API

## Overview
This design implements a Node.js Express RESTful API for managing customer records. The architecture uses the Model-View-Controller (MVC) pattern with Express.js as the web framework, Mongoose as the ODM for MongoDB, and MongoDB as the persistence layer. This design addresses all five user stories (US-1 through US-5) from the confirmed requirements.

## Domain Model (DDD)

### Bounded Contexts

**Customer Management Context**
- **Purpose**: Manages customer entity lifecycle operations (CRUD)
- **Entities**:
  - Customer: Core entity representing a customer record with identity and contact information
- **Value Objects**:
  - PhoneNumber: Validated phone number string (regex: `^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$`)
  - Name: Composite of firstName and lastName
- **Aggregates**:
  - CustomerAggregate: Root aggregate containing customer data and validation logic

### Domain Relationships
```
Customer (Aggregate Root)
├── Name (Value Object)
│   ├── firstName: string (required, 1-100 chars)
│   └── lastName: string (required, 1-100 chars)
├── PhoneNumber (Value Object)
│   └── phoneNumber: string (required, unique, regex validated)
└── id: ObjectId (MongoDB identifier)
```

## Architecture

### Components/Layers

**1. Presentation Layer (Routes)**
- Express route handlers for HTTP endpoints
- Request parameter extraction
- Response formatting

**2. Application Layer (Controllers)**
- Business logic orchestration
- Request validation
- Error handling and transformation
- Response construction

**3. Domain Layer (Models)**
- Mongoose schemas with validation
- Domain entity definitions
- Business rule enforcement

**4. Infrastructure Layer (Database)**
- MongoDB connection management
- Mongoose ODM operations
- Index definitions

### Component Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                      Client (HTTP)                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │   Express     │
                    │   Middleware  │
                    │  (body-parser)│
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Routes      │  /customers
                    │  (routes.js)  │  /customers/:id
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │  Controllers  │  customerController
                    │               │  - create()
                    │               │  - getAll()
                    │               │  - getById()
                    │               │  - update()
                    │               │  - delete()
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   Models      │  Customer Schema
                    │  (Mongoose)   │  - Validation
                    │               │  - Indexes
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
                    │   MongoDB     │  customers collection
                    └───────────────┘
```

## API Endpoint Specifications

### Base Configuration
- **Base URL**: `/api/v1`
- **Content-Type**: `application/json`
- **Authentication**: None (public API)

### Endpoint: POST /customers

**Purpose**: Create a new customer record (US-1)

**Request:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string"
}
```

**Request Schema:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| firstName | string | Yes | 1-100 characters, alphanumeric + spaces |
| lastName | string | Yes | 1-100 characters, alphanumeric + spaces |
| phoneNumber | string | Yes | Regex: `^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$` |

**Response Success (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1 (555) 123-4567"
}
```

**Response Errors:**
| Status Code | Error Message | Condition |
|-------------|---------------|-----------|
| 400 | "Missing required field: firstName" | Missing firstName |
| 400 | "Missing required field: lastName" | Missing lastName |
| 400 | "Missing required field: phoneNumber" | Missing phoneNumber |
| 400 | "Invalid phone number format" | Phone number regex mismatch |
| 400 | "Invalid field format: firstName" | firstName validation failed |
| 409 | "Phone number already exists" | Duplicate phone number |

---

### Endpoint: GET /customers

**Purpose**: Retrieve all customer records (US-2)

**Request:** None (no query parameters)

**Response Success (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1 (555) 123-4567"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "firstName": "Jane",
    "lastName": "Smith",
    "phoneNumber": "555-987-6543"
  }
]
```

**Response Empty (200 OK):**
```json
[]
```

---

### Endpoint: GET /customers/:id

**Purpose**: Retrieve a single customer by ID (US-3)

**Request Parameters:**
| Parameter | Type | Required | Constraints |
|-----------|------|----------|-------------|
| id | string | Yes | Valid MongoDB ObjectId (24 hex characters) |

**Response Success (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1 (555) 123-4567"
}
```

**Response Errors:**
| Status Code | Error Message | Condition |
|-------------|---------------|-----------|
| 400 | "Invalid customer ID format" | ID is not valid ObjectId |
| 404 | "Customer not found" | Customer with ID does not exist |

---

### Endpoint: PUT /customers/:id

**Purpose**: Update an existing customer record (US-4)

**Request Parameters:**
| Parameter | Type | Required | Constraints |
|-----------|------|----------|-------------|
| id | string | Yes | Valid MongoDB ObjectId (24 hex characters) |

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "phoneNumber": "string (optional)"
}
```

**Response Success (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1 (555) 123-4567"
}
```

**Response Errors:**
| Status Code | Error Message | Condition |
|-------------|---------------|-----------|
| 400 | "Invalid customer ID format" | ID is not valid ObjectId |
| 400 | "Invalid phone number format" | Phone number regex mismatch |
| 404 | "Customer not found" | Customer with ID does not exist |
| 409 | "Phone number already exists" | Duplicate phone number |

---

### Endpoint: DELETE /customers/:id

**Purpose**: Permanently delete a customer record (US-5)

**Request Parameters:**
| Parameter | Type | Required | Constraints |
|-----------|------|----------|-------------|
| id | string | Yes | Valid MongoDB ObjectId (24 hex characters) |

**Response Success (204 No Content):**
```
(Empty response body)
```

**Response Errors:**
| Status Code | Error Message | Condition |
|-------------|---------------|-----------|
| 400 | "Invalid customer ID format" | ID is not valid ObjectId |
| 404 | "Customer not found" | Customer with ID does not exist |

---

## Data Model

### Customer Mongoose Schema

```typescript
// models/Customer.js

const mongoose = require('mongoose');

const phoneValidator = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name must be at least 1 character'],
      maxlength: [100, 'First name cannot exceed 100 characters'],
      match: [/^[a-zA-Z\s]+$/, 'First name contains invalid characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [1, 'Last name must be at least 1 character'],
      maxlength: [100, 'Last name cannot exceed 100 characters'],
      match: [/^[a-zA-Z\s]+$/, 'Last name contains invalid characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        phoneValidator,
        'Invalid phone number format. Use format: +1 (555) 123-4567 or 555-123-4567',
      ],
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: 'customers',
  }
);

// Index for efficient duplicate checking
customerSchema.index({ phoneNumber: 1 }, { unique: true });

// Index for efficient lookups by ID
customerSchema.index({ _id: 1 });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
```

### Data Model Summary
| Field | Type | Constraints | Index |
|-------|------|-------------|-------|
| _id | ObjectId | Auto-generated | Primary Key |
| firstName | String | Required, 1-100 chars, alphanumeric+spaces | - |
| lastName | String | Required, 1-100 chars, alphanumeric+spaces | - |
| phoneNumber | String | Required, regex validated | Unique |
| createdAt | Date | Auto-generated | - |
| updatedAt | Date | Auto-generated | - |

## Data Flow

### Flow 1: Create Customer (US-1)
```
1. Client sends POST /customers with JSON body
2. Express body-parser middleware parses request
3. Routes dispatch to customerController.create()
4. Controller validates input (required fields)
5. Controller calls Customer.create() with validated data
6. Mongoose performs schema validation
   - Field type checking
   - Required field validation
   - Regex validation (phoneNumber)
   - Unique constraint check (phoneNumber)
7. MongoDB inserts document
8. Mongoose returns saved document with _id
9. Controller returns 201 Created with customer object
```

### Flow 2: Get All Customers (US-2)
```
1. Client sends GET /customers
2. Routes dispatch to customerController.getAll()
3. Controller calls Customer.find()
4. MongoDB returns all documents
5. Mongoose converts to model instances
6. Controller returns 200 OK with array
```

### Flow 3: Get Single Customer (US-3)
```
1. Client sends GET /customers/:id
2. Express extracts :id parameter
3. Routes dispatch to customerController.getById(id)
4. Controller validates ObjectId format
   - If invalid: return 400 Bad Request
5. Controller calls Customer.findById(id)
6. MongoDB queries by _id
7. If not found: return 404 Not Found
8. If found: return 200 OK with customer object
```

### Flow 4: Update Customer (US-4)
```
1. Client sends PUT /customers/:id with JSON body
2. Express extracts :id parameter and parses body
3. Routes dispatch to customerController.update(id, data)
4. Controller validates ObjectId format
   - If invalid: return 400 Bad Request
5. Controller validates phone number if provided
   - If invalid: return 400 Bad Request
6. Controller calls Customer.findByIdAndUpdate(id, data)
7. Mongoose performs schema validation on updated fields
8. MongoDB updates document
9. If not found: return 404 Not Found
10. If duplicate phone: return 409 Conflict
11. If successful: return 200 OK with updated customer
```

### Flow 5: Delete Customer (US-5)
```
1. Client sends DELETE /customers/:id
2. Express extracts :id parameter
3. Routes dispatch to customerController.delete(id)
4. Controller validates ObjectId format
   - If invalid: return 400 Bad Request
5. Controller calls Customer.findByIdAndDelete(id)
6. MongoDB deletes document (permanent/hard delete)
7. If not found: return 404 Not Found
8. If successful: return 204 No Content (no body)
```

## Error Handling

### Error Categories

**1. Validation Errors (400 Bad Request)**
- Missing required fields
- Invalid field format (name validation)
- Invalid phone number format
- Invalid ObjectId format

**2. Business Logic Errors (409 Conflict)**
- Duplicate phone number

**3. Resource Errors (404 Not Found)**
- Customer not found

**4. System Errors (500 Internal Server Error)**
- MongoDB connection failures
- Unhandled exceptions

### Error Response Format
All errors return JSON with this structure:
```json
{
  "errors": [
    {
      "message": "Error description here"
    }
  ]
}
```

### Error Handling Middleware
```javascript
// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }

  // Mongoose duplicate key error (phone number)
  if (err.code === 11000) {
    return res.status(409).json({
      errors: [{ message: 'Phone number already exists' }],
    });
  }

  // Cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      errors: [{ message: 'Invalid customer ID format' }],
    });
  }

  // Mongoose not found
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({
      errors: [{ message: 'Customer not found' }],
    });
  }

  // Default to 500 for unexpected errors
  res.status(500).json({
    errors: [{ message: 'Internal server error' }],
  });
};

module.exports = errorHandler;
```

### Error Handling Flow
```
1. Error occurs (validation, database, etc.)
2. Express error middleware catches error
3. Error handler categorizes and formats error
4. Appropriate HTTP status code assigned
5. JSON response with errors array sent
6. Sensitive data (phone numbers) excluded from logs
```

## Testing Strategy

### Unit Tests
- **Controller Tests**: Mock Mongoose models, test request/response handling
- **Validation Tests**: Test phone regex, name validation
- **Schema Tests**: Test Mongoose schema validation rules

**Coverage Goal**: 80%+ line coverage

### Integration Tests
- **API Endpoint Tests**: Full request/response cycle with test MongoDB
- **Error Handling Tests**: Verify all error categories return correct responses
- **Database Operations**: Test CRUD operations with real MongoDB instance

**Test Scenarios**:
- Create customer with valid/invalid data
- Retrieve existing/non-existing customers
- Update customer fields
- Delete customer
- Duplicate phone number conflict
- Invalid ObjectId format

### E2E Tests
**Critical User Journeys**:
1. Create → Read → Update → Delete a customer
2. Create duplicate phone number → Verify 409
3. Query non-existing customer → Verify 404
4. Invalid ID format → Verify 400

## Security Considerations

### Authentication
- **None required** per requirements (public API)
- No session management or JWT tokens

### Authorization
- **None required** per requirements
- All endpoints publicly accessible

### Input Validation
- **Mongoose schema validation** prevents injection attacks
- **Regex validation** on phone numbers
- **Parameter sanitization** via Express body-parser
- **MongoDB injection** prevented by Mongoose ODM parameterization

### Data Protection
- **No sensitive data logging** - phone numbers excluded from logs
- **HTTPS recommended** for production (outside application scope)

### Security Threats Addressed
| Threat | Mitigation |
|--------|------------|
| SQL/NoSQL Injection | Mongoose parameterized queries |
| XSS | JSON-only responses, no HTML rendering |
| Invalid Input | Mongoose schema validation |
| Denial of Service | MongoDB connection pooling (infrastructure level) |

## Performance Considerations

### Expected Load
- **Target**: <200ms response time for 95% of requests
- **Concurrency**: Stateless design supports horizontal scaling

### Optimization Strategies

**1. Indexing**
- Unique index on `phoneNumber` for O(log n) duplicate checks
- Default `_id` index for O(1) lookups

**2. MongoDB Configuration**
- Connection pooling: 10-20 connections (default)
- Max cursor size limits for list operations

**3. Query Optimization**
- Use `findById()` for single customer (indexed)
- Use `find()` without pagination (no filter requirement)
- Consider pagination in future iterations for large datasets

### Potential Bottlenecks
- **Large customer lists**: No pagination currently (out of scope)
- **MongoDB connection**: Single instance, no sharding (future scalability)

## Requirements Traceability

| Requirement | Design Element |
|-------------|----------------|
| US-1: Create Customer | POST /customers endpoint, Customer.create(), Validation middleware |
| US-2: Get All Customers | GET /customers endpoint, Customer.find() |
| US-3: Get Single Customer | GET /customers/:id endpoint, Customer.findById(), ObjectId validation |
| US-4: Update Customer | PUT /customers/:id endpoint, Customer.findByIdAndUpdate() |
| US-5: Delete Customer | DELETE /customers/:id endpoint, Customer.findByIdAndDelete() |
| Phone number regex | Mongoose schema match validator |
| Error response format | errorHandler middleware, consistent errors array |
| No authentication | No auth middleware, public routes |
| Permanent delete | findByIdAndDelete (hard delete) |
| ObjectId validation | CastError handling, isValidObjectId check |
| Performance <200ms | Indexed queries, connection pooling |
| MongoDB injection prevention | Mongoose ODM parameterization |

---

## Quality Check

**DESIGN QUALITY CHECK:**

✓ **Requirements Coverage**: 10/10 - All user stories (US-1 through US-5) traced to specific design components including endpoints, data flows, and model operations.

✓ **Data Model**: 10/10 - Customer schema fully defined with all required fields (firstName, lastName, phoneNumber), validation rules, indexes, and constraints matching requirements.

✓ **Error Handling**: 10/10 - Comprehensive error categories (validation, business logic, resource, system) with specific handling strategies and consistent response format.

✓ **Security**: 8/10 - Input validation via Mongoose, injection prevention via ODM, no auth per requirements. Deducted for no explicit auth discussion (though explicitly out of scope).

✓ **Testability**: 9/10 - Unit, integration, and E2E strategies defined with coverage goals and test scenarios. Minor deduction for not specifying test framework.

**Overall: 47/50**

**Issues Found:**
- None critical - design fully addresses all requirements
- Test framework (Jest/Mocha) not explicitly specified
- Performance monitoring/logging not detailed (out of scope per requirements)
