import { Router } from 'express';

import multer from 'multer';

import articleController from '@apis/article/article.controller';
import authController from '@apis/auth/auth.controller';
import bookController from '@apis/books/books.controller';
import imageController from '@apis/image/image.controller';
import { catchAsync } from '@utils/catch-async';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

router.post('/image', multer().single('image'), catchAsync(imageController.createImage));

router.post('/articles', catchAsync(articleController.publish));

router.get('/books/search');
router.get('/books/:bookId', catchAsync(bookController.bookTest));
export default router;
