const salesModel = require('../models/salesModel');
const productsServices = require('./productsService');
const { saleScheema } = require('./Utils/schemas');
const { errorStatus, errorMessages, errorHandler } = require('./Utils/errorMessages');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (sale.length === 0) throw errorHandler(errorMessages.SLAE_NOT_FOUND, errorStatus.NOT_FOUND);

  return sale;
};

const create = async (sales) => {
  sales.map((sale) => {
    const { error } = saleScheema.validate(sale);
    if (error) {
      const { type } = error.details[0];
      if (type === 'any.required') {
        throw errorHandler(error.message, errorStatus.IS_REQUIRED);
      }
      throw errorHandler(error.message, errorStatus.INVALID_VALUE);
    }
    return null;
  });

  await Promise.all(
    sales.map(async (data) => {
      await productsServices.findById(data.productId);
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