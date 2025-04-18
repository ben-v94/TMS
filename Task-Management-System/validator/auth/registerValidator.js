import { body, validationResult } from 'express-validator';
import User from '../../models/User.js';


export const registerValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ max: 255 }).withMessage('Name must be less than 255 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('password_confirmation')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    }),

  async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(422).json({ errors: [{ msg: 'Email already in use', param: 'email' }] });
    }
    next();
  },

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
