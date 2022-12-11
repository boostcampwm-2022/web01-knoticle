import express from 'express';

import '@config/env.config';
import loader from './loaders';

const startServer = async () => {
  const app = express();

  await loader(app);

  const server = app.listen(+process.env.PORT, process.env.HOST, () => {
    if (process.send) process.send('ready');

    console.log(`Server listening on port: ${process.env.PORT}`);
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
};

startServer();
