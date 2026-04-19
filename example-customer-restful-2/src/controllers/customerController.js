const Customer = require('../models/Customer');
const { ObjectId } = require('mongoose');

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;

    const customer = await Customer.create({ firstName, lastName, phoneNumber });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    if (!ObjectId.is-valid(req.params.id)) {
      return res.status(400).json({
        errors: [{ message: 'Invalid customer ID format' }],
      });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        errors: [{ message: 'Customer not found' }],
      });
    }
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        errors: [{ message: 'Invalid customer ID format' }],
      });
    }

    const { firstName, lastName, phoneNumber } = req.body;
    const updateData = { firstName, lastName, phoneNumber };

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({
        errors: [{ message: 'Customer not found' }],
      });
    }
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        errors: [{ message: 'Invalid customer ID format' }],
      });
    }

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({
        errors: [{ message: 'Customer not found' }],
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAll, getById, update, del };
