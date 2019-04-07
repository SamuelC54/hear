import config from './config/config';
import app from './server';

const startExpress = () => {
  app.listen(config.port, async () => {
    console.info(`Server started on port ${config.port}`);
  });
};

startExpress();