const connection = require('./connection');

const create = async (sales) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.sales (date) VALUES (default);');

  const query = 'INSERT INTO StoreManager.sales_products'
    + '(sale_id, product_id, quantity) VALUES (?,?,?)';
  await sales.map((sale) => connection.execute(query, [insertId, sale.productId, sale.quantity]));

  return { id: 3, itemsSold: sales };
};

module.exports = {
  create,
};