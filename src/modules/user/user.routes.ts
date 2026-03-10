import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ROLES } from "../../constants/roles";
import { requireRoles } from "../../middlewares/roles.middleware";

const userRouter = Router()

userRouter.get('/', authMiddleware, requireRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT), userController.getAllUsers);
userRouter.post('/', authMiddleware, requireRoles(ROLES.ADMIN), userController.createUser);

export default userRouter
