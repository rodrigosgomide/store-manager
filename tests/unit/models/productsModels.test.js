const connection = require('../../../src/models/connection')
const productsModel = require('../../../src/models/productsModel')
const { expect } = require('chai')
const sinon = require('sinon')

const { allProducts, newProduct, mysqlResponse  } = require('../mocks/mockData')


describe('Testa as requisiçôes de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se todos os produtos da lista são retornados', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const products = await productsModel.findAll()

    expect(products).to.equal(allProducts);
  })

  it('Verifica se um produto é retornado pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const product = await productsModel.findById()

    expect(product).to.deep.equal(allProducts[0]);
  })

  it('Verifica se um produto é retornado de acordo com a pesquisa', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const product = await productsModel.findBySearch()

    expect(product).to.deep.equal([allProducts[0]]);
  })

  it('Verifica se ao cadastrar um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const result = await productsModel.create(newProduct)
    const { insertId } = mysqlResponse

    expect(result).to.deep.equal(insertId);
  })

  it('Verifica é possivel fazer update de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const result = await productsModel.update({ name: newProduct.name, id: mysqlResponse.insertId })

    expect(result).to.deep.equal({ name: newProduct.name, id: mysqlResponse.insertId });
  })

  it('Verifica é possivel remover um produto', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const id = 1;

    const result = await productsModel.remove(id)

    expect(result).to.deep.equal({ message: 'The product has been deleted' });
  })

})
  
