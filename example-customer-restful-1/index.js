const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customers');

const app = express();

app.use(express.json());

app.use('/api/customers', customerRoutes);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/customers')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
