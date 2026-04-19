const express = require('express');
const router = express.Router();
const { create, getAll, getById, update, del } = require('../controllers/customerController');

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;
