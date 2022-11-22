import { Router } from 'express';

import articleController from '@apis/article/article.controller';
import authController from '@apis/auth/auth.controller';
import { catchAsync } from '@utils/catch-async';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

router.post('/articles', catchAsync(articleController.publish));

export default router;
