const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { saleScheema } = require('./Utils/schemas');
const { errorMessages } = require('./Utils/errors');
const { validateByScheema, validateById } = require('./Utils/validations');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async (id) => {
  const sale = validateById(salesModel, id, errorMessages.SLAE_NOT_FOUND);
  return sale;
};

const create = async (sales) => {
  sales.map((sale) => {
    validateByScheema(saleScheema, sale);
    return null;
  });

  await Promise.all(
    sales.map(async (data) => {
      await validateById(productsModel, data.productId, errorMessages.PRODUCT_NOT_FOUND);
    }),
  );

  const response = await salesModel.create(sales);
  return response;
};

module.exports = {
  findAll,
  findById,
  create,
};