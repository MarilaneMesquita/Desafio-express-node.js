/* eslint-env node */

const express = require('express');
const cookieParser = require('cookie-parser');
const debug = require('debug')('app');
const dotenv = require('dotenv');
const httpErrors = require('http-errors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(debug('app'));
app.use(dotenv.config());
app.use(morgan('dev'));

// Endpoint para a rota padrão "/"
app.get('/', (req, res) => {
res.send('Olá, mundo!');
});

// Importar as rotas para clientes e produtos
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');

// Usar as rotas
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// Iniciar o servidor
app.listen(PORT, () => {
console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
