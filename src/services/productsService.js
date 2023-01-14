const productsModel = require('../models/productsModel');
const { errorStatus, errorMessages, errorHandler } = require('./Utils/errorMessages');
const { productScheema } = require('./Utils/schemas');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  
  if (!product) throw errorHandler(errorMessages.PRODUCT_NOT_FOUND, errorStatus.NOT_FOUND);
  
  return product;
};

const create = async (name) => {
  const { error } = productScheema.validate(name);
  if (error) {
    const { type } = error.details[0];
    if (type === 'any.required') {
      throw errorHandler(error.message, errorStatus.IS_REQUIRED); 
    }
      throw errorHandler(error.message, errorStatus.INVALID_VALUE);
  }
  const id = await productsModel.create(name);
  return id;
};

module.exports = {
  findAll,
  findById,
  create,
};