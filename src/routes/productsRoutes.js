const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.findAll);
router.post('/', productsController.create);
router.get('/:id', productsController.findById);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;