const { productsModel } = require('../models');
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

const findBySearch = async (searchParam) => {
    const products = await productsModel.findBySearch(searchParam);
    return products;
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

  const response = await productsModel.remove(id);

  return response;
};

module.exports = {
  findAll,
  findById,
  findBySearch,
  create,
  update,
  remove,
};