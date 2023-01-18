const productsModel = require('../../../src/models/productsModel')
const productsService = require('../../../src/services/productsService')
const validatios = require('../../../src/services/Utils/validations')
const { expect } = require('chai')
const sinon = require('sinon')

const { allProducts, newProduct, productToUpdate } = require('../mocks/mockData')


describe('Testa os serviços de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se todos os produtos são retornados', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const products = await productsService.findAll()

    expect(products).to.equal(allProducts);
  })

  it('Verifica se somente um produto é retornado de acordo com o id', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

    const product = await productsService.findById()

    expect(product).to.deep.equal(allProducts[0]);
  })

  it('Verifica se somente um produto é retornado de acordo com a pesquisa', async function () {
    sinon.stub(productsModel, 'findBySearch').resolves(allProducts[0]);

    const product = await productsService.findBySearch()

    expect(product).to.deep.equal(allProducts[0]);
  })

  it('Verifica se é possivel cirar um produto', async function () {
    const isertId = 1

    sinon.stub(productsModel, 'create').resolves(isertId);

    const id = await productsService.create(newProduct.name)

    expect(id).to.equal(isertId);
  })

  it('Verifica se é possivel atualizar um produto', async function () {
    sinon.stub(productsModel, 'update').resolves({ id: productToUpdate.id, name: productToUpdate.name });
    sinon.stub(productsModel, 'findById').resolves(productToUpdate)
    sinon.stub(validatios, 'validateById').resolves()

    const product = await productsService.update(productToUpdate)

    expect(product).to.deep.equal({ id: product.id, name: product.name });
  })

  it('Verifica se é possivel remover um produto', async function () {
    sinon.stub(productsModel, 'remove').resolves({ message: 'The product has been deleted' });
    sinon.stub(productsModel, 'findById').resolves('ok')
    sinon.stub(validatios, 'validateById').resolves()

    const result = await productsService.remove(newProduct.id)

    expect(result).to.deep.equal({ message: 'The product has been deleted' });
  })
})

