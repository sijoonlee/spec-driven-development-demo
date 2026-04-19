import express from 'express';
import { MongoClient, Db } from 'mongodb';
import { env } from './config/env';
import { CustomerRepository } from './repositories/CustomerRepository';
import { CustomerService } from './services/CustomerService';
import { CustomerController } from './controllers/CustomerController';
import { createCustomerRoutes } from './routes/customerRoutes';
import { errorHandler } from './middleware/errorHandler';

let mongoClient: MongoClient;
let db: Db;

const app = express();
const PORT = env.PORT;

app.use(express.json());

let server: ReturnType<typeof app.listen>;

async function initializeDatabase() {
  mongoClient = new MongoClient(env.MONGODB_URI);
  await mongoClient.connect();
  db = mongoClient.db();

  const customerRepository = new CustomerRepository(db);
  await customerRepository.createIndexes();
}

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed');
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

async function start() {
  try {
    await initializeDatabase();
    console.log('MongoDB connected');

    const repository = new CustomerRepository(db);
    const service = new CustomerService(repository);
    const controller = new CustomerController(service);

    app.use('/api/customers', createCustomerRoutes(controller));
    app.use(errorHandler);

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
    });

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
