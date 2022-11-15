import path from 'path';

import dotenv from 'dotenv';

const __dirname = path.resolve();

let envPath;

switch (process.env.NODE_ENV) {
  case 'prod':
    envPath = path.join(__dirname, 'env/.env.production');
    break;
  case 'dev':
  default:
    envPath = path.join(__dirname, 'env/.env.development');
}

dotenv.config({ path: envPath });
