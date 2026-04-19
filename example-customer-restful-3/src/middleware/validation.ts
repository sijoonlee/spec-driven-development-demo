import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createCustomerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('phoneNumber').matches(/^\d{10,15}$/).withMessage('Phone number must be 10-15 digits'),
];

export const updateCustomerValidation = [
  body('firstName').optional({ checkFalsy: true }).trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional({ checkFalsy: true }).trim().notEmpty().withMessage('Last name cannot be empty'),
  body('phoneNumber').optional({ checkFalsy: true }).matches(/^\d{10,15}$/).withMessage('Phone number must be 10-15 digits'),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      })),
    });
    return;
  }
  next();
};

function validationResult(req: Request) {
  const { validationResult: validationResultMiddleware } = require('express-validator');
  return validationResultMiddleware(req);
}
