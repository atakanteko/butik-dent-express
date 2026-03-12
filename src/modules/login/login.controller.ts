import { Request, Response, NextFunction } from "express";
import { loginService } from "./login.service";
import { HttpStatus } from "../../constants/httpStatus";

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('req.body', req.body);
        const loggedUser = await loginService.login(req.body);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'user logged successfully',
            data: loggedUser
        });
    } catch (error) {
        next(error);
    }
};

export const loginController = {
    login
}