const api = require('./api.bcb');
const axios = require('axios');

jest.mock('axios');

const res = {
  data: {
    value: [
      { cotacaoVenda: 4.224 }
    ]
  }
}

test('getQuotationAPI', () => {
  axios.get.mockResolvedValue(res);
  api.getQuotationAPI('url').then(response => {
    expect(response).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractQuotation', () => {
  const quotation = api.extractQuotation(res)
  
  expect(quotation).toBe(4.224)
})

describe('getToday', () => {
  const RealDate = Date

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date)
      }
    }
  }

  afterEach(() => {
    global.Date = RealDate
  })

  test('getToday', () => {
    mockDate('2019-01-01T12:00:00z')
    const today = api.getToday()
    expect(today).toBe('1-1-2019')
  })
})

test('getURL', () => {
  const url = api.getUrl('MY-DATE')
  expect(url).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MY-DATE'&$top=100&$format=json&$select=cotacaoVenda`)
})

test('getQuotation', () => {
  const getToday = jest.fn();
  getToday.mockReturnValue('01-01-2019');

  const getUrl = jest.fn();
  getUrl.mockReturnValue('url');

  const getQuotationAPI = jest.fn();
  getQuotationAPI.mockResolvedValue(res);

  const extractQuotation = jest.fn();
  extractQuotation.mockReturnValue(4.224)

  api.pure
    .getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation })()
    .then(res => {
      expect(res).toBe(4.224)
    })
})

test('getQuotation', () => {
  const getToday = jest.fn();
  getToday.mockReturnValue('01-01-2019');

  const getUrl = jest.fn();
  getUrl.mockReturnValue('url');

  const getQuotationAPI = jest.fn();
  getQuotationAPI.mockReturnValue(Promise.reject('err'));

  const extractQuotation = jest.fn();
  extractQuotation.mockReturnValue(4.224)

  api.pure
    .getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation })()
    .then(res => {
      expect(res).toBe('')
    })
})