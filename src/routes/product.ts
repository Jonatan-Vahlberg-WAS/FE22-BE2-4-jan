import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';

import {
    getCategories,
    createCategory,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', verifyToken, createCategory);

router.get('/', getProducts);
router.post('/', verifyToken, createProduct);

router.get('/:id', getProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;