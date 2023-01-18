const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  
  return product;
};

const findBySearch = async (searchParam) => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name LIKE ?', [`%${searchParam}%`]);
  
  return products;
};

const create = async (name) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUE (?)', [name]);

  return insertId;
};

const update = async ({ name, id }) => {
  const [result] = await connection
    .execute('UPDATE StoreManager.products SET products.name = ? WHERE id = ?; ', [name, id]);
  
  if (result.affectedRows > 0) return { id, name };
};

const remove = async (id) => {
  const [{ affectedRows }] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?; ', [id]);
  
  if (affectedRows > 0) return { message: 'The product has been deleted' };
};

module.exports = {
  findAll,
  findById,
  findBySearch,
  create,
  update,
  remove,
};