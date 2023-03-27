import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/config/mongoDb';
import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import apiMiddleware from './src/middleware/apiAuth';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
db.connect();
const app = express();

app.use(cors({
  origin: ["http://localhost:3300"]
}));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use('/pub', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use(errorHandler);

module.exports = app;
