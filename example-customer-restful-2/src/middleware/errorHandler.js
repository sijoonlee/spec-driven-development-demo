const { ObjectId } = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      errors: [{ message: 'Phone number already exists' }],
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      errors: [{ message: 'Invalid customer ID format' }],
    });
  }

  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({
      errors: [{ message: 'Customer not found' }],
    });
  }

  res.status(500).json({
    errors: [{ message: 'Internal server error' }],
  });
};

module.exports = errorHandler;
