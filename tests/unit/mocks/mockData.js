const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
]

const productToUpdate = {
  id: 999,
  name: 'Camisa do Cruzeiro',
}

const newProduct = [
  {
    name: 'Camisa do Cruzeiro',
  },
]

const items = [
  {
    productId: 100,
    quantity: 100
  },
]

const findAllSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const mysqlResponse = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 5,
  serverStatus: 34,
  warningCount: 0,
  message: '(Rows matched: 1 Changed: 1 Warnings: 0',
  protocol41: true,
  changedRows: 1
}

module.exports = {
  allProducts,
  newProduct,
  items,
  findAllSales,
  mysqlResponse,
  productToUpdate
}