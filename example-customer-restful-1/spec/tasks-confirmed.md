# Tasks: Customer CRUD API (Confirmed)

## Phase 1: Project Setup

### Task 1.1: Initialize Node.js Project
**Goal**: Set up project structure and dependencies
- [ ] Run `npm init -y`
- [ ] Install dependencies: express, mongoose
- [ ] Install dev dependencies: nodemon, jest, supertest
- [ ] Configure nodemon in package.json
- [ ] Create `.gitignore`

## Phase 2: Core Implementation

### Task 2.1: Create Customer Model
**Goal**: Define Mongoose schema for Customer entity
**Files**: `models/Customer.js`
- [ ] Create customerSchema with firstName (required), lastName, phoneNumber
- [ ] Export Customer model
**Traces**: US-1, US-2, US-3, US-4, US-5

### Task 2.2: Create Customer Routes
**Goal**: Define REST API endpoints
**Files**: `routes/customers.js`
- [ ] POST /customers
- [ ] GET /customers
- [ ] GET /customers/:id
- [ ] PUT /customers/:id
- [ ] DELETE /customers/:id
**Traces**: US-1, US-2, US-3, US-4, US-5

### Task 2.3: Create Customer Controller
**Goal**: Implement CRUD business logic
**Files**: `controllers/customerController.js`
- [ ] createCustomer() - validate firstName, save to DB, return 201
- [ ] getAllCustomers() - find all, return 200
- [ ] getCustomerById() - findById, handle 404, 400
- [ ] updateCustomer() - updateById, validate firstName, handle 404
- [ ] deleteCustomer() - deleteById, return 204 or 404
**Traces**: US-1, US-2, US-3, US-4, US-5

### Task 2.4: Create App Entry Point
**Goal**: Set up Express server with middleware
**Files**: `app.js` or `index.js`
- [ ] Initialize Express app
- [ ] Add JSON middleware
- [ ] Mount customer routes
- [ ] Configure MongoDB connection
- [ ] Add error handling middleware
- [ ] Define PORT and start server
**Traces**: All

## Phase 3: Validation & Error Handling

### Task 3.1: Add Request Validation
**Goal**: Validate incoming requests
- [ ] Validate firstName required on POST /customers
- [ ] Validate firstName required on PUT /customers/:id
- [ ] Validate MongoDB ObjectId format on :id parameter
**Traces**: US-1, US-3, US-4, US-5

### Task 3.2: Add Error Handling Middleware
**Goal**: Handle errors gracefully
- [ ] CastError handler for invalid ObjectId (400)
- [ ] NotFoundError handler (404)
- [ ] Generic error handler (500)
**Traces**: All

## Phase 4: Testing

### Task 4.1: Write Unit Tests
**Goal**: Test model and controller logic
**Files**: `tests/unit/`
- [ ] Customer model validation tests
- [ ] Controller function tests
**Traces**: All

### Task 4.2: Write Integration Tests
**Goal**: Test API endpoints
**Files**: `tests/integration/`
- [ ] POST /customers tests (happy path + validation)
- [ ] GET /customers tests
- [ ] GET /customers/:id tests (found + not found)
- [ ] PUT /customers/:id tests (update + not found)
- [ ] DELETE /customers/:id tests (success + not found)
**Traces**: All

## Phase 5: Documentation & Configuration

### Task 5.1: Add README
**Goal**: Document the API
**Files**: `README.md`
- [ ] Project description
- [ ] Setup instructions
- [ ] API endpoint documentation
- [ ] MongoDB connection setup

### Task 5.2: Add Environment Configuration
**Goal**: Configure environment variables
**Files**: `.env.example`
- [ ] MONGODB_URI
- [ ] PORT

## Task Summary

| Phase | Task | Status |
|-------|------|-|-|
| 1 | 1.1: Project Setup | ⬜ |
| 2 | 2.1: Customer Model | ⬜ |
| 2 | 2.2: Customer Routes | ⬜ |
| 2 | 2.3: Customer Controller | ⬜ |
| 2 | 2.4: App Entry Point | ⬜ |
| 3 | 3.1: Request Validation | ⬜ |
| 3 | 3.2: Error Handling | ⬜ |
| 4 | 4.1: Unit Tests | ⬜ |
| 4 | 4.2: Integration Tests | ⬜ |
| 5 | 5.1: README | ⬜ |
| 5 | 5.2: Environment Config | ⬜ |
