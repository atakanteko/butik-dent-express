import { Request, Response, NextFunction } from 'express';
import { HttpStatus, StatusMessages } from '../constants/httpStatus';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const statusCode = (err.status || HttpStatus.INTERNAL_SERVER_ERROR) as typeof HttpStatus[keyof typeof HttpStatus];
  const message = err.message || StatusMessages[statusCode] || StatusMessages[HttpStatus.INTERNAL_SERVER_ERROR];
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};