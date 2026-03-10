import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface UserRolePayload {
      name: string;
    }

    interface UserJwtPayload extends JwtPayload {
      id: string;
      name: string;
      email: string;
      roles: UserRolePayload[];
    }

    interface Request {
      user?: UserJwtPayload;
    }
  }
}
