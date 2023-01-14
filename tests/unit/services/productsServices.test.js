const productsModel = require('../../../src/models/productsModel')
const productsService = require('../../../src/services/productsService')
const { expect } = require('chai')
const sinon = require('sinon')

const { allProducts } = require('../mocks/products.mock')


describe('Testa os serviços de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se todos os produtos são retornados', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const products = await productsService.findAll()

    expect(products).to.equal(allProducts);
  })

  it('Verifica se somente um produto é retornado', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

    const product = await productsService.findById()

    expect(product).to.deep.equal(allProducts[0]);
  })
})

