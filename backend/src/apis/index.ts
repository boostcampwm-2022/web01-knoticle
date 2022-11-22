import { Router } from 'express';

import authController from '@apis/auth/auth.controller';
import bookController from '@apis/books/books.controller';
import { catchAsync } from '@utils/catch-async';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));
router.post('/auth/signup', catchAsync(authController.signUp));

router.get('/books/search');
router.get('/books/:bookId', catchAsync(bookController.bookTest));
export default router;
