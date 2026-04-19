import { CustomerRepository } from '../repositories/CustomerRepository';
import { CreateCustomerInput, UpdateCustomerInput, CustomerResponse } from '../models/Customer';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

const PHONE_REGEX = /^\d{10,15}$/;

export class CustomerService {
  constructor(private repository: CustomerRepository) {}

  async create(input: CreateCustomerInput): Promise<CustomerResponse> {
    this.validateCreateInput(input);
    await this.checkPhoneUniqueness(input.phoneNumber);
    return this.repository.create(input);
  }

  async findAll(): Promise<CustomerResponse[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<CustomerResponse> {
    this.validateId(id);
    const customer = await this.repository.findById(id);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    return customer;
  }

  async update(id: string, input: UpdateCustomerInput): Promise<CustomerResponse> {
    this.validateId(id);
    this.validateUpdateInput(input);
    if (input.phoneNumber) {
      await this.checkPhoneUniqueness(input.phoneNumber, id);
    }
    const customer = await this.repository.update(id, input);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    return customer;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundError('Customer not found');
    }
  }

  private validateCreateInput(input: CreateCustomerInput): void {
    if (!input.firstName || input.firstName.trim() === '') {
      throw new ValidationError('First name is required');
    }
    if (!input.lastName || input.lastName.trim() === '') {
      throw new ValidationError('Last name is required');
    }
    if (!input.phoneNumber) {
      throw new ValidationError('Phone number is required');
    }
    if (!PHONE_REGEX.test(input.phoneNumber)) {
      throw new ValidationError('Phone number must be 10-15 digits');
    }
  }

  private validateUpdateInput(input: UpdateCustomerInput): void {
    if (input.firstName !== undefined && input.firstName.trim() === '') {
      throw new ValidationError('First name cannot be empty');
    }
    if (input.lastName !== undefined && input.lastName.trim() === '') {
      throw new ValidationError('Last name cannot be empty');
    }
    if (input.phoneNumber && !PHONE_REGEX.test(input.phoneNumber)) {
      throw new ValidationError('Phone number must be 10-15 digits');
    }
  }

  private validateId(id: string): void {
    if (!ObjectId.isValid(id)) {
      throw new ValidationError('Invalid customer ID format');
    }
  }

  private async checkPhoneUniqueness(phoneNumber: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findByPhoneNumber(phoneNumber);
    if (existing && (!excludeId || existing._id.toString() !== excludeId)) {
      throw new ValidationError('Phone number already exists');
    }
  }
}
