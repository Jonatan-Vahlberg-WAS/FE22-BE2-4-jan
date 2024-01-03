


import { Router } from 'express';

import { getUserProfile } from '../controllers/user';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/profile', verifyToken, getUserProfile);

export default router;