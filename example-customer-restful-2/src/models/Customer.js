const mongoose = require('mongoose');

const phoneValidator = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name must be at least 1 character'],
      maxlength: [100, 'First name cannot exceed 100 characters'],
      match: [/^[a-zA-Z\s]+$/, 'First name contains invalid characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [1, 'Last name must be at least 1 character'],
      maxlength: [100, 'Last name cannot exceed 100 characters'],
      match: [/^[a-zA-Z\s]+$/, 'Last name contains invalid characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        phoneValidator,
        'Invalid phone number format. Use format: +1 (555) 123-4567 or 555-123-4567',
      ],
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: 'customers',
  }
);

customerSchema.index({ phoneNumber: 1 }, { unique: true });
customerSchema.index({ _id: 1 });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
