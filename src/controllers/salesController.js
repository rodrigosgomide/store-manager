const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const sales = await salesService.findAll();
  return res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
try {
  const sale = await salesService.findById(id);
  return res.status(200).json(sale);
} catch (error) {
  next(error);
}
};

const create = async (req, res, next) => {
  const sales = req.body;
try {
  const sale = await salesService.create(sales);
  return res.status(201).json(sale);
} catch (error) {
  next(error);
}
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await salesService.remove(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  remove,
};