const {connection, salesModel} = require('../../../src/models')
const { expect } = require('chai')
const sinon = require('sinon')

const { items, mysqlResponse, findAllSales } = require('../mocks/mockData')


describe('Testa as requisiçôes de produtos', function () {

  afterEach(sinon.restore)

  it('Verifica se ao cadastrar uma venda retorna o valor esperado', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const result = await salesModel.create(items)
    const { id, itemsSold } = result
    
    expect(result).to.deep.equal({ id, itemsSold: items });
  })

  it('Verifica se todas as vendas sao listadas', async function () {
    sinon.stub(connection, 'execute').resolves([findAllSales])

    const result = await salesModel.findAll()

    expect(result).to.deep.equal(findAllSales);
  })

  it('Verifica se as vendas sao listadas por seu id', async function () {
    sinon.stub(connection, 'execute').resolves([findAllSales])

    const result = await salesModel.findById()

    expect(result).to.deep.equal(findAllSales);
  })

  it('Verifica é possivel fazer update de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const saleId = 1;

    const result = await salesModel.update({ saleId, items})

    expect(result).to.deep.equal({ saleId, itemsUpdated:items});
  })

  it('Verifica é possivel remover uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([mysqlResponse])

    const saleId = 1;

    const result = await salesModel.remove(saleId)

    expect(result).to.deep.equal({ message: 'The sale has been deleted' });
  })

})

