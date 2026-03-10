import { Router } from "express";
import { loginController } from "./login.controller";

const loginRouter = Router();

loginRouter.post('/login', loginController.login);

export default loginRouter;