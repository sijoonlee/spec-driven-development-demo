const mongoose = require('mongoose');

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid customer ID' });
  }
  next();
}

function validateCustomer(req, res, next) {
  if (req.body.firstName === undefined || req.body.firstName === null || req.body.firstName === '') {
    return res.status(400).json({ error: 'First name is required' });
  }
  next();
}

module.exports = { validateObjectId, validateCustomer };
