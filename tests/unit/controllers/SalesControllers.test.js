const chai = require('chai');
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { expect } = require('chai')
chai.use(sinonChai)

const {salesController} = require('../../../src/controllers')
const {salesService} = require('../../../src/services')

const { findAllSales, newSale } = require('../mocks/mockData')

describe('Testa os serviços de vendas', function () {

  afterEach(sinon.restore)

  it('Verifica se retorna status 200 e lista as vendas', async function () {

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAll').resolves(findAllSales);

    await salesController.findAll(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findAllSales);
  })

  it('Verifica se retorna status 200 e uma venda referente ao seu id', async function () {

    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findById').resolves(findAllSales[0]);

    await salesController.findById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(findAllSales[0]);
  })

  it('Verifica se retorna status 201 e a venda que foi criada', async function () {

    const res = {};
    const req = {
      body: newSale,
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const newSaleId = 1;

    sinon.stub(salesService, 'create').resolves(newSaleId)

    await salesController.create(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleId);
  })

  it('Verifica se retorna status 200 e o produto que foi atualizado', async function () {

    const res = {};
    const req = {
      body: newSale,
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const { id } = req.params

    sinon.stub(salesService, 'update').resolves({ saleId: id, itemsUpdated: newSale })

    await salesController.update(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: id, itemsUpdated: newSale });
  })

  it('Verifica se retorna status 204 quando um produto é removido', async function () {

    const res = {};
    const req = {
      params: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'remove').resolves()

    await salesController.remove(req, res)

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  })
})

