const productsModel = require('../models/productsModel');
const { errorMessages } = require('./Utils/errors');
const { validateByScheema, validateById } = require('./Utils/validations');
const { productScheema } = require('./Utils/schemas');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await validateById(productsModel, id, errorMessages.PRODUCT_NOT_FOUND);
  
  return product;
};

const create = async (name) => {
  validateByScheema(productScheema, name);

  const id = await productsModel.create(name);
  return id;
};

const update = async (product) => {
  await validateById(productsModel, product.id, errorMessages.PRODUCT_NOT_FOUND);
  validateByScheema(productScheema, product);
  
  const response = await productsModel.update(product);
  
  return response;
};

const remove = async (id) => {
  await validateById(productsModel, id, errorMessages.PRODUCT_NOT_FOUND);

  await productsModel.remove(id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};