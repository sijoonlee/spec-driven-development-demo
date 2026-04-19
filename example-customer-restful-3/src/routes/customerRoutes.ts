import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { validate, createCustomerValidation, updateCustomerValidation } from '../middleware/validation';

export function createCustomerRoutes(controller: CustomerController): Router {
  const router = Router();

  router.post('/', createCustomerValidation, validate, controller.create.bind(controller));
  router.get('/', controller.findAll.bind(controller));
  router.get('/:id', controller.findById.bind(controller));
  router.put('/:id', updateCustomerValidation, validate, controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
