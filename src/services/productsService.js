const { productsModel } = require('../models');
const errorMessages = require('./Utils/errorMessages');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  
  if (!product) throw errorMessages.PRODUCT_NOT_FOUND;
  
  return product;
};

const create = async (name) => {
  const id = await productsModel.create(name);
  return id;
};

module.exports = {
  findAll,
  findById,
  create,
};