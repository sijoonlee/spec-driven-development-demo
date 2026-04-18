# Customer CRUD API

A simple REST API for managing customers built with Express and MongoDB.

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/customers
PORT=3000
```

## Run

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/customers | Create customer |
| GET | /api/customers | Get all customers |
| GET | /api/customers/:id | Get customer by ID |
| PUT | /api/customers/:id | Update customer |
| DELETE | /api/customers/:id | Delete customer |

## Tests

```bash
npm test
```

## Requirements

- Node.js >= 18
- MongoDB running on `mongodb://localhost:27017`
