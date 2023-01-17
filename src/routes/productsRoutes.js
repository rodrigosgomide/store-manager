const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/search', productsController.findBySearch);
router.get('/:id', productsController.findById);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;