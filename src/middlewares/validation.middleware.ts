import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatus } from '../constants/httpStatus';

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Validation error',
            errors: errors.array()
        });
    }
    
    next();
};