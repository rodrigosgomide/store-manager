const salesModels = require('../models/salesModel');
const productsServices = require('./productsService');
const { saleScheema } = require('./Utils/schemas');
const { errorStatus, errorHandler } = require('./Utils/errorMessages');

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

  const response = await salesModels.create(sales);
  return response;
};

module.exports = {
  create,
};