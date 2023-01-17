const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.get('/products', productsController.findAll);
app.post('/products', productsController.create);
app.get('/products/:id', productsController.findById);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.remove);

app.post('/sales', salesController.create);
app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);

// app.use('/products', productsRoutes);
// app.use('/sales', salesRoutes);

app.use((error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: 'internal server error' });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;