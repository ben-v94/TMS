import { body, validationResult } from 'express-validator';

export const changePasswordValidator = [
  body('current_password')
    .notEmpty().withMessage('Current password is required'),

  body('new_password')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),

    body('new_password_confirmation')
    .notEmpty().withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.new_password)
    .withMessage('Password confirmation must match the new password'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
