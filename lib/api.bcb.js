const axios = require('axios');

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$top=100&$format=json&$select=cotacaoVenda`

const getQuotationAPI = url => axios.get(url);
const extractQuotation = res => res.data.value[0].cotacaoVenda;
const getToday = () => {
  const today = new Date();
  return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}

const getQuotation = ({ getToday, getUrl,getQuotationAPI, extractQuotation }) => async () => {
  try {
    const today = getToday();
    const url = getUrl(today);
    const res = await getQuotationAPI(url);
    const quotation = extractQuotation(res);
    return quotation; 
  } catch (error) {
    return ''
  }
}

module.exports = {
  getQuotation: getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation }),
  getQuotationAPI,
  extractQuotation,
  getUrl,
  getToday,
  pure: {
    getQuotation
  }
}