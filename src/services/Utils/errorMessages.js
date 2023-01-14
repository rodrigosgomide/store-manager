const errorMessages = {
  type: {
    PRODUCT_NOT_FOUND: {
      status: 404,
      message: 'Product not found',
    },
    NAME_IS_REQUIRED:
    {
      status: 400,
      message: '"name" is required',
    },
    NAME_LENGTH: {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    },
  },
};

module.exports = errorMessages;