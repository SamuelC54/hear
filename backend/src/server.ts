import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import * as expressSwaggerGenerator from 'express-swagger-generator';
import * as _ from 'lodash';

import * as routes from './routes';
import config from './config/config';


// Init app
const app = express();
const expressSwagger = expressSwaggerGenerator(app);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: '*' }));

// Initialize the Swagger middleware
const options = {
  basedir: __dirname, // app absolute path
  files: ['./routes/**/*.ts', './routes/**/*.js'], // Path to the API handle folder
  swaggerDefinition: {
    info: {
      title: 'Sombra Interactive Documentation',
      version: '0.0.1'
    },
    securityDefinitions: {
      AdminSecurity: {
        type: 'basic'
      }
    }
  }
};
expressSwagger(options);

// Set up the routes
routes.setup(app);

app.use((err: any, req: Request, res: any, next: NextFunction) => {
  console.error(err);

  if (err.message === 'Validation failed') {
    return res.status(400).json({
      data: err.mapped(),
      status: 'fail'
    });
  }

  return res.status(500).json({
    message: err.message || err,
    status: 'error'
  });
});

export default app;
