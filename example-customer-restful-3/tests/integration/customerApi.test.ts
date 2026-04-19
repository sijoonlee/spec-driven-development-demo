import request from 'supertest';
import express from 'express';
import { MongoClient, Db } from 'mongodb';
import { CustomerRepository } from '../../src/repositories/CustomerRepository';
import { CustomerService } from '../../src/services/CustomerService';
import { CustomerController } from '../../src/controllers/CustomerController';
import { createCustomerRoutes } from '../../src/routes/customerRoutes';
import { errorHandler } from '../../src/middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/api/customers', createCustomerRoutes(new CustomerController(new CustomerService(new CustomerRepository(null!)))));
app.use(errorHandler);

let mongoClient: MongoClient;
let db: Db;

beforeAll(async () => {
  mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/test_customers_db');
  await mongoClient.connect();
  db = mongoClient.db();

  const customerController = new CustomerController(new CustomerService(new CustomerRepository(db)));
  app.use('/api/customers', createCustomerRoutes(customerController));
});

afterAll(async () => {
  await db.collection('customers').deleteMany({});
  await mongoClient.close();
});

beforeEach(async () => {
  await db.collection('customers').deleteMany({});
});

describe('Customer API', () => {
  describe('POST /api/customers', () => {
    it('should create a customer with valid data', async () => {
      const response = await request(app)
        .post('/api/customers')
        .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.firstName).toBe('John');
      expect(response.body.data.lastName).toBe('Doe');
    });

    it('should return 400 for missing first name', async () => {
      const response = await request(app)
        .post('/api/customers')
        .send({ lastName: 'Doe', phoneNumber: '1234567890' });

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid phone number', async () => {
      const response = await request(app)
        .post('/api/customers')
        .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '123' });

      expect(response.status).toBe(400);
    });

    it('should return 400 for duplicate phone number', async () => {
      await request(app).post('/api/customers').send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

      const response = await request(app)
        .post('/api/customers')
        .send({ firstName: 'Jane', lastName: 'Smith', phoneNumber: '1234567890' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Phone number already exists');
    });
  });

  describe('GET /api/customers', () => {
    it('should return all customers', async () => {
      await request(app).post('/api/customers').send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });
      await request(app).post('/api/customers').send({ firstName: 'Jane', lastName: 'Smith', phoneNumber: '0987654321' });

      const response = await request(app).get('/api/customers');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return empty array when no customers exist', async () => {
      const response = await request(app).get('/api/customers');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('GET /api/customers/:id', () => {
    it('should return a customer by id', async () => {
      const createResponse = await request(app)
        .post('/api/customers')
        .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

      const customerId = createResponse.body.data.id;
      const response = await request(app).get(`/api/customers/${customerId}`);

      expect(response.status).toBe(200);
      expect(response.body.data.firstName).toBe('John');
    });

    it('should return 404 for non-existent customer', async () => {
      const response = await request(app).get('/api/customers/507f1f77bcf86cd799439011');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should update a customer', async () => {
      const createResponse = await request(app)
        .post('/api/customers')
        .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

      const customerId = createResponse.body.data.id;
      const response = await request(app)
        .put(`/api/customers/${customerId}`)
        .send({ firstName: 'Johnny' });

      expect(response.status).toBe(200);
      expect(response.body.data.firstName).toBe('Johnny');
      expect(response.body.data.lastName).toBe('Doe');
    });

    it('should return 404 for non-existent customer', async () => {
      const response = await request(app)
        .put('/api/customers/507f1f77bcf86cd799439011')
        .send({ firstName: 'Johnny' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should delete a customer', async () => {
      const createResponse = await request(app)
        .post('/api/customers')
        .send({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' });

      const customerId = createResponse.body.data.id;
      const response = await request(app).delete(`/api/customers/${customerId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const getResponse = await request(app).get(`/api/customers/${customerId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent customer', async () => {
      const response = await request(app).delete('/api/customers/507f1f77bcf86cd799439011');
      expect(response.status).toBe(404);
    });
  });
});
