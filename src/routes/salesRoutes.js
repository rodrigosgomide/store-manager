const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.findAll);
router.get('/:id', salesController.findById);

module.exports = router;