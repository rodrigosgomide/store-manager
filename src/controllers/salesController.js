const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  const sales = req.body;
try {
  const sale = await salesService.create(sales);
  return res.status(201).json(sale);
} catch (error) {
  next(error);
}
};

module.exports = {
  create,
};