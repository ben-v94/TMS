import express from 'express';
import { listUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/accountController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, listUsers);
router.post('/', authMiddleware, adminMiddleware, createUser);
router.get('/:id', authMiddleware,adminMiddleware, getUser);
router.put('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
