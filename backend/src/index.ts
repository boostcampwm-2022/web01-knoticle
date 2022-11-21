import express from 'express';

import '@config/env.config';
import loader from './loaders';

const startServer = async () => {
  const app = express();

  await loader(app);

  app.listen(+process.env.PORT, process.env.HOST, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
  });
};

startServer();
