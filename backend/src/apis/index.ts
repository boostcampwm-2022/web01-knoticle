import { Router } from 'express';

import authController from '@apis/auth/auth.controller';
import imageController from '@apis/image/image.controller';
import { catchAsync } from '@utils/catch-async';
import multer from 'multer';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

router.post('/image', multer().single('image'), catchAsync(imageController.createImage));

export default router;
