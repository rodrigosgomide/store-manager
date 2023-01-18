const { salesModel } = require('../models');
const { productsModel } = require('../models');
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

const update = async ({ saleId, items }) => {
  await validateById(salesModel, saleId, errorMessages.SLAE_NOT_FOUND);
   items.forEach((iten) => {
     validateByScheema(saleScheema, iten);
   });

  await Promise.all(
    items.map(async (iten) => {
      await validateById(productsModel, iten.productId, errorMessages.PRODUCT_NOT_FOUND);
    }),
);

  const response = await salesModel.update({ saleId, items });

  return response;
};

const remove = async (id) => {
  await validateById(salesModel, id, errorMessages.SLAE_NOT_FOUND);

  const result = await salesModel.remove(id);
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};