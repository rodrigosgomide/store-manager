const productsModel = require('../models/productsModel');
const errorMessages = require('./Utils/errorMessages');
const { productScheema } = require('./Utils/schemas');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  
  if (!product) throw errorMessages.type.PRODUCT_NOT_FOUND;
  
  return product;
};

const create = async (name) => {
  const { error } = productScheema.validate(name);
  if (error) {
    const { type } = error.details[0];
    if (type === 'any.required') {
      throw errorMessages.type.NAME_IS_REQUIRED;
    }
    if (type === 'string.min') {
      throw errorMessages.type.NAME_LENGTH;
    }
  }
  const id = await productsModel.create(name);
  return id;
};

module.exports = {
  findAll,
  findById,
  create,
};