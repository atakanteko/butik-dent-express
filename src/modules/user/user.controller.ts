import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { HttpStatus } from "../../constants/httpStatus";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();
    res.status(HttpStatus.OK).json({
            success: true,
            message: 'users retrieved successfully',
            data: users,
            count: users.length
        });
}


export const userController = {
    createUser,
    getAllUsers
};