/* app.js */
const express = require('express');
const cookieParser = require('cookie-parser');
require('express-async-errors');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');

const routes = require('./routes');

const app = express();

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
console.log(`FRONTEND_URL: ${frontendURL}`);

app.use(cors({
  origin: frontendURL,
  credentials: true,
}));
app.use(express.json());

app.use(cookieParser());
app.use(routes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;

