const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.findAll);
router.get('/:id', salesController.findById);
router.delete('/:id', salesController.remove);

module.exports = router;