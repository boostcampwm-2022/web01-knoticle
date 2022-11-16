import { Application } from 'express';

import expressLoader from './express.loader';

export default async (app: Application) => {
  expressLoader(app);
};
