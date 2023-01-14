const { connection, productsModel } = require('../../../src/models')
const { expect } = require('chai')
const sinon = require('sinon')

const {allProducts} = require('../mocks/products.mock')


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
})
  
