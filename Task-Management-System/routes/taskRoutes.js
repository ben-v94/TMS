import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTaskStatus, deleteTask } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', authMiddleware, updateTaskStatus);
router.delete('/tasks/:id', authMiddleware, deleteTask);

export default router;
