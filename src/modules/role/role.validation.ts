import { body, ValidationChain } from 'express-validator';

// Validation for creating a role (name is required)
export const createRoleValidation: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Role name is required')
        .isString()
        .withMessage('Role name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Role name must be between 2 and 50 characters')
];

export const updateRoleValidation: ValidationChain[] = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Role name cannot be empty')
        .isString()
        .withMessage('Role name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Role name must be between 2 and 50 characters')
];

// Backward compatibility - keep old export name
export const rolesValidation = createRoleValidation;
