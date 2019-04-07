import * as dotenv from 'dotenv';

dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 3006,
  swaggerBasePath: process.env.BASE_PATH || '/'
};
