import { Router } from 'express';

import articleController from '@apis/article/article.controller';
import authController from '@apis/auth/auth.controller';
import bookController from '@apis/books/books.controller';
import { catchAsync } from '@utils/catch-async';

const router = Router();

router.post('/auth/signin/local', catchAsync(authController.signIn));
router.post('/auth/signin/github', catchAsync(authController.signInGithub));

router.get('/articles/temporary/:userId', catchAsync(articleController.getTemporaryArticle));
router.post('/articles/temporary', catchAsync(articleController.saveTemporaryArticle));
router.post('/articles', catchAsync(articleController.publish));

router.get('/books/search');
router.get('/books/:bookId', catchAsync(bookController.bookTest));
export default router;
