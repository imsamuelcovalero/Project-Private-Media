/* app.js */
const express = require('express');
const cookieParser = require('cookie-parser');
require('express-async-errors');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');

const routes = require('./routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // substitua com o URL do seu frontend
  credentials: true,
}));
app.use(express.json());

app.use(cookieParser());
app.use(routes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;

