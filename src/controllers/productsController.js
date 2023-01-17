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

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const id = await productsService.create({ name });
    return res.status(201).json({ id, name });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
try {
  const response = await productsService.update({ name, id });
  res.status(200).json(response);
} catch (error) {
  next(error);
}
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productsService.remove(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};