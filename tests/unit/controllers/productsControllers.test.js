const chai = require('chai');
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { expect } = require('chai')
chai.use(sinonChai)

const {productsController} = require('../../../src/controllers')
const {productsService} = require('../../../src/services')

const { allProducts, newProduct } = require('../mocks/mockData')

describe('Testa os serviços de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se retorna status 200 e lista de produtos', async function () {

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll').resolves(allProducts);

    await productsController.findAll(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  })

  it('Verifica se retorna status 200 e um produto referente ao seu id', async function () {

    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves(allProducts[0]);

    await productsController.findById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  })

  it('Verifica se retorna status 200 e um produto referente a perquisa', async function () {

    const res = {};
    const req = {
      query: { q: 'Martelo' },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon.stub(productsService, 'findBySearch').resolves(allProducts[0])
    
    await productsController.findBySearch(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  })


  it('Verifica se retorna status 201 e o produto que foi criado', async function () {

    const res = {};
    const req = {
      body: newProduct,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const newProductId = 1;

    sinon.stub(productsService, 'create').resolves(newProductId)

    await productsController.create(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({id: newProductId, name: newProduct.name});
  })

  it('Verifica se retorna status 200 e o produto que foi atualizado', async function () {

    const res = {};
    const req = {
      body: newProduct,
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const productId = 1;

    sinon.stub(productsService, 'update').resolves({ id: productId, name: newProduct.name })

    await productsController.update(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: productId, name: newProduct.name });
  })

  it('Verifica se retorna status 204 quando um produto é removido', async function () {

    const res = {};
    const req = {
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const productId = 1;

    sinon.stub(productsService, 'remove').resolves()

    await productsController.remove(req, res)

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  })
})

