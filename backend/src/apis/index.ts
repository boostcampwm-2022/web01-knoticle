import { Router } from 'express';

import { catchAsync } from '../utils/catchAsync';
import authController from './auth/auth.controller';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

export default router;
