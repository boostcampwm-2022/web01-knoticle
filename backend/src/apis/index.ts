import { Router } from 'express';

import authController from '@apis/auth/auth.controller';
import bookController from '@apis/books/books.controller';
import { catchAsync } from '@utils/catch-async';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

router.get('/search?type=book');

router.get('/books/:bookId([0-9]{1,})', catchAsync(bookController.bookTest));
export default router;
