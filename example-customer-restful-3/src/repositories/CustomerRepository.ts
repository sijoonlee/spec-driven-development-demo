import { Db, Filter, ObjectId } from 'mongodb';
import { Customer, CreateCustomerInput, UpdateCustomerInput, CustomerResponse, toCustomerResponse } from '../models/Customer';

export class CustomerRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async create(customer: CreateCustomerInput): Promise<CustomerResponse> {
    const collection = this.db.collection<Customer>('customers');
    const result = await collection.insertOne(customer);
    const created = await collection.findOne({ _id: result.insertedId });
    return toCustomerResponse(created!);
  }

  async findAll(): Promise<CustomerResponse[]> {
    const collection = this.db.collection<Customer>('customers');
    const customers = await collection.find({}).toArray();
    return customers.map(toCustomerResponse);
  }

  async findById(id: string): Promise<CustomerResponse | null> {
    try {
      const collection = this.db.collection<Customer>('customers');
      const customer = await collection.findOne({ _id: new ObjectId(id) });
      return customer ? toCustomerResponse(customer) : null;
    } catch {
      return null;
    }
  }

  async update(id: string, updates: UpdateCustomerInput): Promise<CustomerResponse | null> {
    try {
      const collection = this.db.collection<Customer>('customers');
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );
      if (result.matchedCount === 0) {
        return null;
      }
      const updated = await collection.findOne({ _id: new ObjectId(id) });
      return updated ? toCustomerResponse(updated) : null;
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const collection = this.db.collection<Customer>('customers');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    const collection = this.db.collection<Customer>('customers');
    return collection.findOne({ phoneNumber });
  }

  async createIndexes(): Promise<void> {
    const collection = this.db.collection<Customer>('customers');
    await collection.createIndex({ phoneNumber: 1 }, { unique: true });
  }
}
