const express = require('express');
const path = require('path');

const convert = require('./lib/covert');

const app = express();
const port = process.env.PORT || 3333;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/cotacao', (req, res) => {
  const { quotation, amount } = req.query;
  if (quotation && amount) {
    const conversion = convert.convert(quotation, amount);
    res.render('cotacao', {
      error: false,
      quotation: convert.toMoney(quotation),
      amount: convert.toMoney(amount),
      conversion: convert.toMoney(conversion)
    });
  } else {
    res.render('cotacao', {
      error: 'Valores inválidos'
    })
  }
})

app.listen(port, error => {
  if(error) {
    console.log('Error starting server');
  } else {
    console.log('Server start on port 3333')
  }
})