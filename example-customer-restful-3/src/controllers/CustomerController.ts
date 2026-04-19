import { Request, Response, NextFunction } from 'express';
import { CustomerService, AppError } from '../services/CustomerService';
import { CreateCustomerInput, UpdateCustomerInput } from '../models/Customer';

export class CustomerController {
  constructor(private service: CustomerService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: CreateCustomerInput = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      };
      const customer = await this.service.create(input);
      res.status(201).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customers = await this.service.findAll();
      res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customer = await this.service.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input: UpdateCustomerInput = req.body;
      const customer = await this.service.update(req.params.id, input);
      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.service.delete(req.params.id);
      res.status(200).json({
        success: true,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
