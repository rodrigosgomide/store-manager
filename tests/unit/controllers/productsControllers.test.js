const chai = require('chai');
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { expect } = require('chai')
chai.use(sinonChai)

const productsController = require('../../../src/controllers/productsController')
const productsService = require('../../../src/services/productsService')

const { allProducts } = require('../mocks/products.mock')

describe('Testa os serviços de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se retorna status 200 e alista de produtos', async function () {

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

  // it('Verifica se retorna status 404 e a menssagem "Product not found", no caso de um produto inexistente', async function () {

  //   const res = {};
  //   const req = {
  //     params: { id: 999 },
  //   };
  //   const next = () => { };
    
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
    
  //   sinon.stub(productsService, 'findById').throws(errorMessages.PRODUCT_NOT_FOUND)
    
    
  //   await productsController.findById(req, res, next)

  //   expect(next).to.have.been.called()

  //   // expect(res.status).to.have.been.calledWith(404);
  //   // expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  // })
})

