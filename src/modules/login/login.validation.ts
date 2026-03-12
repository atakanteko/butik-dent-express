import { body, ValidationChain } from 'express-validator';

// Validation for creating a role (name is required)
export const signInValidation: ValidationChain[] = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6, max: 12 })
        .withMessage('Password must be between 6 and 12 characters')
];

export const loginValidation = signInValidation;