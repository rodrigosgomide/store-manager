const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const create = async (name) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name) VALUE (?)', [name]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  create,
};