const {salesModel} = require('../../../src/models/')
const {salesService} = require('../../../src/services')
const validatios = require('../../../src/services/Utils/validations')
const { expect } = require('chai')
const sinon = require('sinon')

const { findAllSales, newSale } = require('../mocks/mockData')


describe('Testa os serviços de vendas', function () {

  afterEach(sinon.restore)

  it('Verifica se todas as vendas são listadas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(findAllSales);

    const sales = await salesService.findAll()

    expect(sales).to.equal(findAllSales);
  })

  it('Verifica se somente uma venda é retornado de acordo com o id', async function () {
    sinon.stub(salesModel, 'findById').resolves(findAllSales[0]);

    const sale = await salesService.findById()

    expect(sale).to.deep.equal(findAllSales[0]);
  })

  it('Verifica se é possivel cirar um venda', async function () {
    const isertId = 1

    sinon.stub(salesModel, 'create').resolves({ id:isertId, itemsSold: newSale });

    const sale = await salesService.create(newSale)

    expect(sale).to.deep.equal({ id: isertId, itemsSold: newSale });
  })

  it('Verifica se é possivel atualizar um venda', async function () {
    const saleId = 1;
    sinon.stub(salesModel, 'update').resolves({ saleId, itemsUpdated: newSale });
    sinon.stub(salesModel, 'findById').resolves('ok')
    sinon.stub(validatios, 'validateById').resolves()

    const sale = await salesService.update({saleId, items: newSale})

    expect(sale).to.deep.equal({ saleId, itemsUpdated: newSale });
  })

  it('Verifica se é possivel remover um venda', async function () {
    sinon.stub(salesModel, 'remove').resolves({ message: 'The sale has been deleted' });
    sinon.stub(salesModel, 'findById').resolves('ok')
    sinon.stub(validatios, 'validateById').resolves()

    const result = await salesService.remove(newSale.id)

    expect(result).to.deep.equal({ message: 'The sale has been deleted' });
  })
})

