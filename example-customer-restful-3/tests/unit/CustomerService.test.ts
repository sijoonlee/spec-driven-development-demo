import { CustomerService, ValidationError, NotFoundError } from '../../src/services/CustomerService';
import { CustomerRepository } from '../../src/repositories/CustomerRepository';
import { Customer, CustomerResponse } from '../../src/models/Customer';

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByPhoneNumber: jest.fn(),
} as unknown as CustomerRepository;

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CustomerService(mockRepository);
  });

  describe('create', () => {
    it('should create a customer with valid data', async () => {
      const input = { firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' };
      const response: CustomerResponse = { id: '507f1f77bcf86cd799439011', ...input };
      mockRepository.create.mockResolvedValue(response);
      mockRepository.findByPhoneNumber.mockResolvedValue(null);

      const result = await service.create(input);
      expect(result).toEqual(response);
      expect(mockRepository.create).toHaveBeenCalledWith(input);
    });

    it('should throw ValidationError for missing first name', async () => {
      await expect(service.create({ firstName: '', lastName: 'Doe', phoneNumber: '1234567890' }))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid phone number', async () => {
      await expect(service.create({ firstName: 'John', lastName: 'Doe', phoneNumber: '123' }))
        .rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for duplicate phone number', async () => {
      const existingCustomer = { _id: '507f1f77bcf86cd799439011', phoneNumber: '1234567890' } as Customer;
      mockRepository.findByPhoneNumber.mockResolvedValue(existingCustomer);

      await expect(service.create({ firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' }))
        .rejects.toThrow('Phone number already exists');
    });
  });

  describe('findById', () => {
    it('should return customer by valid id', async () => {
      const customer: CustomerResponse = { id: '507f1f77bcf86cd799439011', firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' };
      mockRepository.findById.mockResolvedValue(customer);

      const result = await service.findById('507f1f77bcf86cd799439011');
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundError for non-existent customer', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.findById('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError for invalid id format', async () => {
      await expect(service.findById('invalid-id')).rejects.toThrow(ValidationError);
    });
  });

  describe('update', () => {
    it('should update customer successfully', async () => {
      const customer: CustomerResponse = { id: '507f1f77bcf86cd799439011', firstName: 'Jane', lastName: 'Doe', phoneNumber: '1234567890' };
      mockRepository.update.mockResolvedValue(customer);

      const result = await service.update('507f1f77bcf86cd799439011', { firstName: 'Jane' });
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundError when updating non-existent customer', async () => {
      mockRepository.update.mockResolvedValue(null);
      await expect(service.update('507f1f77bcf86cd799439011', { firstName: 'Jane' })).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete customer successfully', async () => {
      mockRepository.delete.mockResolvedValue(true);
      await expect(service.delete('507f1f77bcf86cd799439011')).resolves.not.toThrow();
    });

    it('should throw NotFoundError when deleting non-existent customer', async () => {
      mockRepository.delete.mockResolvedValue(false);
      await expect(service.delete('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundError);
    });
  });
});
