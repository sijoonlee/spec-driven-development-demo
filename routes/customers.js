const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const { validateObjectId, validateCustomer } = require('../middleware/validation');

router.post('/', validateCustomer, createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', validateObjectId, getCustomerById);
router.put('/:id', validateObjectId, validateCustomer, updateCustomer);
router.delete('/:id', validateObjectId, deleteCustomer);

module.exports = router;
