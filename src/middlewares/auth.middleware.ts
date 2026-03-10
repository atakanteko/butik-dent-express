import JWT from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User from '../modules/user/user.model';
import { HttpStatus } from '../constants/httpStatus';

export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : undefined;

        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Authorization token is missing'
            });
        }

        const decodedToken = JWT.verify(token, process.env.SECRET as string)

        if (!decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid token payload'
            });
        }

        // İsteğe bağlı: Kullanıcı DB'de hâlâ var mı kontrolü
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'User not found'
            });
        }

        // Token'daki user bilgisini isteğe ekle
        req.user = decodedToken as Express.UserJwtPayload;

        next();
    } catch (error) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'Error in auth api',
            error
        })
    }
}