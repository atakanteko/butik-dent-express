import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router()

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);

export default userRouter
