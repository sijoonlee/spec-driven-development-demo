const express = require('express');
const mongoose = require('mongoose');
const customersRouter = require('./routes/customers');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/v1/customers', customersRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/customers');
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    return server;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

// Only start server if run directly
if (require.main === module) {
  start();
}

module.exports = { app, start };
