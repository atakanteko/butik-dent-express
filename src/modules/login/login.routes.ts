import { Router } from "express";
import { loginController } from "./login.controller";
import { signInValidation } from "./login.validation";
import { validationHandler } from "../../middlewares/validation.middleware";

const loginRouter = Router();

loginRouter.post('/login', signInValidation, validationHandler, loginController.login);

export default loginRouter;