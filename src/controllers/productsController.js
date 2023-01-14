const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const products = await productsService.findAll();
  return res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
try {
  const product = await productsService.findById(id);
  return res.status(200).json(product);
} catch (error) {
  next(error);
}
};

const create = async (req, res) => {
  const { name } = req.body;
  const id = await productsService.create(name);
  return res.status(201).json({ id, name });
};

module.exports = {
  findAll,
  findById,
  create,
};