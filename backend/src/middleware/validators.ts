import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateSession = [
  body('email').isEmail().normalizeEmail(),
  handleValidation
];

export const validateChatLog = [
  body('email').isEmail().normalizeEmail(),
  body('content').notEmpty(),
  body('sender').isIn(['user', 'assistant']),
  body('timestamp').isISO8601(),
  handleValidation
];

export const validateAlert = [
  body('email').isEmail().normalizeEmail(),
  body('coin').notEmpty(),
  body('targetPrice').isNumeric(),
  body('type').isIn(['above', 'below']),
  handleValidation
];

function handleValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}