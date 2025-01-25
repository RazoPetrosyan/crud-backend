import express from 'express';
import morgan from 'morgan';
import corsM from './middlewares/corsM.js';
import routes from './routers/index.js';
import HttpError from 'http-errors';
import http from 'http';
import path from "path";
import authorizationM from "./middlewares/authorizationM.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions.js';

const { PORT } = process.env;


const app = express();

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(corsM);

app.use(express.static(path.resolve('public')));

app.use(authorizationM);

app.use(morgan('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

app.use((req, res, next) => next(HttpError(404)));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(+err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

