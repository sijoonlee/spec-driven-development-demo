const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const Customer = require('../../models/Customer');

describe('Customer API', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_customers');
    server = app.listen(3001);
  });

  afterAll(async () => {
    await Customer.deleteMany({});
    await mongoose.disconnect();
    server.close();
  });

  beforeEach(async () => {
    await Customer.deleteMany({});
  });

  describe('POST /api/customers', () => {
    it('should create a customer with firstName', async () => {
      const res = await request(server)
        .post('/api/customers')
        .send({ firstName: 'John' });
      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe('John');
    });

    it('should reject without firstName', async () => {
      const res = await request(server)
        .post('/api/customers')
        .send({ lastName: 'Doe' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/customers', () => {
    it('should return all customers', async () => {
      await Customer.create([{ firstName: 'John' }, { firstName: 'Jane' }]);
      const res = await request(server).get('/api/customers');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/customers/:id', () => {
    it('should return a customer by id', async () => {
      const customer = await Customer.create({ firstName: 'John' });
      const res = await request(server).get(`/api/customers/${customer._id}`);
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('John');
    });

    it('should return 404 for non-existent customer', async () => {
      const invalidId = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/customers/${invalidId}`);
      expect(res.status).toBe(404);
    });

    it('should return 400 for invalid id format', async () => {
      const res = await request(server).get('/api/customers/invalid');
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/customers/:id', () => {
    it('should update a customer', async () => {
      const customer = await Customer.create({ firstName: 'John' });
      const res = await request(server)
        .put(`/api/customers/${customer._id}`)
        .send({ firstName: 'Jane' });
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Jane');
    });

    it('should return 404 for non-existent customer', async () => {
      const invalidId = new mongoose.Types.ObjectId();
      const res = await request(server)
        .put(`/api/customers/${invalidId}`)
        .send({ firstName: 'Jane' });
      expect(res.status).toBe(404);
    });

    it('should reject update without firstName', async () => {
      const customer = await Customer.create({ firstName: 'John' });
      const res = await request(server)
        .put(`/api/customers/${customer._id}`)
        .send({ lastName: 'Doe' });
      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/customers/:id', () => {
    it('should delete a customer', async () => {
      const customer = await Customer.create({ firstName: 'John' });
      const res = await request(server).delete(`/api/customers/${customer._id}`);
      expect(res.status).toBe(204);
    });

    it('should return 404 for non-existent customer', async () => {
      const invalidId = new mongoose.Types.ObjectId();
      const res = await request(server).delete(`/api/customers/${invalidId}`);
      expect(res.status).toBe(404);
    });
  });
});
