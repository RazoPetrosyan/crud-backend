import { Router } from 'express';
import user from './user.js';
import blog from './blog.js';

const router = Router();

router.use('/user', user);
router.use('/blog', blog);

export default router;
