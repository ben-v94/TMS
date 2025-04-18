import express from 'express';
import { register, login, logout, changepassword } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {registerValidator} from '../validator/auth/registerValidator.js';
import {loginValidator} from '../validator/auth/loginValidator.js';
import {changePasswordValidator} from '../validator/auth/changePasswordValidator.js';

const router = express.Router();

router.post('/register',registerValidator, register);

router.post('/login', loginValidator, login);

router.post('/logout', authMiddleware, logout);

router.post('/changepassword', changePasswordValidator, authMiddleware, changepassword);

export default router;
