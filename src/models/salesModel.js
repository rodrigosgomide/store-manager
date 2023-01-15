const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT sales_products.sale_id as saleId, sales.date, '
    + 'sales_products.product_id as productId, '
    + 'sales_products.quantity FROM StoreManager.sales_products '
    + 'LEFT JOIN StoreManager.sales ON sales_products.sale_id = sales.id '
    + 'ORDER BY sale_id, product_id;';
  const [sales] = await connection.execute(query);
  return sales;
};

const findById = async (saleId) => {
  const query = 'SELECT sales.date, '
    + 'sales_products.product_id as productId, '
    + 'sales_products.quantity FROM StoreManager.sales_products '
    + 'LEFT JOIN StoreManager.sales ON sales_products.sale_id = sales.id '
    + 'WHERE sales_products.sale_id = ? '
    + 'ORDER BY product_id;';
  const [sale] = await connection.execute(query, [saleId]);
  return sale;
};

const create = async (sales) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO StoreManager.sales (date) VALUES (default);');

  const query = 'INSERT INTO StoreManager.sales_products'
    + '(sale_id, product_id, quantity) VALUES (?,?,?)';
  await sales.map((sale) => connection.execute(query, [insertId, sale.productId, sale.quantity]));

  return { id: 3, itemsSold: sales };
};

module.exports = {
  findAll,
  findById,
  create,
};