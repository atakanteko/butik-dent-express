import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/httpStatus';
import { RoleName } from '../constants/roles';

export const requireRoles =
  (...requiredRoles: RoleName[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized attempt to access this resource',
      });
    }

    const userRoleNames = (req.user.roles || []).map((r) => r.name);
    const hasAnyRequiredRole = requiredRoles.some((role) =>
      userRoleNames.includes(role),
    );

    if (!hasAnyRequiredRole) {
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  };

