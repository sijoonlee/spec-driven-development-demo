# Design: Customer CRUD API (Confirmed)

## Overview
This design implements a RESTful CRUD API for Customer management using Node.js, Express, and MongoDB.

## Domain Model (DDD)

### Bounded Context: Customer Management

**Entity: Customer**
- id: ObjectId (generated)
- firstName: String (required)
- lastName: String (optional)
- phoneNumber: String (optional)

## Architecture

### Components/Layers

**Layer 1: Route Handler** (`routes/customers.js`)
- Receives HTTP requests
- Validates request parameters
- Delegates to controller

**Layer 2: Controller** (`controllers/customerController.js`)
- Business logic orchestration
- Request/response formatting
- Error handling

**Layer 3: Model** (`models/Customer.js`)
- Mongoose schema definition
- Database operations (CRUD)

**Layer 4: Database**
- MongoDB with Mongoose ODM

### Component Diagram

```
HTTP Request -> routes/customers.js
                  |
                  v
         controllers/customerController.js
                  |
                  v
            models/Customer.js
                  |
                  v
              MongoDB
```

## Data Flow

### Key Flows

1. **Create Customer (POST /customers)**
   - Trigger: POST request to /customers
   - Steps:
     1. Route handler receives request
     2. Controller validates firstName is present
     3. Controller creates Customer model instance
     4. Model saves to MongoDB
     5. Controller returns 201 with created customer
   - Data: request body -> Customer document -> JSON response

2. **Get All Customers (GET /customers)**
   - Trigger: GET request to /customers
   - Steps:
     1. Route handler receives request
     2. Controller calls model.find()
     3. Model queries MongoDB
     4. Controller returns 200 with array

3. **Get Customer by ID (GET /customers/:id)**
   - Trigger: GET request with ID parameter
   - Steps:
     1. Route handler validates ID format
     2. Controller calls model.findById()
     3. Returns 404 if not found

4. **Update Customer (PUT /customers/:id)**
   - Trigger: PUT request with ID and body
   - Steps:
     1. Route handler validates ID format
     2. Controller validates firstName in body
     3. Controller updates document
     4. Returns 404 if not found

5. **Delete Customer (DELETE /customers/:id)**
   - Trigger: DELETE request with ID
   - Steps:
     1. Route handler validates ID format
     2. Controller deletes document
     3. Returns 204 or 404

### Data Models

```javascript
// models/Customer.js
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String
  }
});
```

## Error Handling

### Error Categories

- **Validation Errors (400)**: Missing firstName, invalid ID format
- **Not Found Errors (404)**: Customer ID doesn't exist
- **Server Errors (500)**: Database connection failures

### Error Flow

```
try {
  // operation
} catch (error) {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Server error' });
}
```

## Testing Strategy

### Unit Tests
- Customer model schema validation
- Controller logic for each endpoint

### Integration Tests
- All 4 CRUD endpoints
- Error handling paths

### E2E Tests
- Happy path for each operation
- Edge cases (empty collections, missing fields)

## Security Considerations

- Input validation on all endpoints
- MongoDB ObjectId validation for ID parameters
- No authentication (out of scope)

## Performance Considerations

- MongoDB connection pooling via Mongoose
- No caching (simple CRUD)
- Index on _id (default)

## Requirements Traceability

| Requirement | Design Element |
|------|---------|
| US-1 | routes/customers.js POST, controllers/customerController.js create(), models/Customer.js schema validation |
| US-2 | routes/customers.js GET, controllers/customerController.js getAll(), models/Customer.js find() |
| US-3 | routes/customers.js GET/:id, controllers/customerController.js getById(), error handling |
| US-4 | routes/customers.js PUT, controllers/customerController.js update(), validation |
| US-5 | routes/customers.js DELETE, controllers/customerController.js delete() |
