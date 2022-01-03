import * as express from 'express';
import books_router from './books';
import users_router from './users';
import categories_router from './categories';

const router = express.Router();

router.use('/books', books_router);
router.use('/users', users_router);
router.use('/categories', categories_router);

export default router;