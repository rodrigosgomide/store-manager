const { productsModel } = require('../models');
const errorMessages = require('./Utils/errorMessages');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  console.log(product);
  
  if (!product) throw errorMessages.PRODUCT_NOT_FOUND;
  
  return product;
};

module.exports = {
  findAll,
  findById,
};