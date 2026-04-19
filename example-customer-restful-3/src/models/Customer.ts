import { ObjectId, Document } from 'mongodb';

export interface Customer extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateCustomerInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface CustomerResponse {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export function toCustomerResponse(doc: Customer): CustomerResponse {
  return {
    id: doc._id.toString(),
    firstName: doc.firstName,
    lastName: doc.lastName,
    phoneNumber: doc.phoneNumber,
  };
}
