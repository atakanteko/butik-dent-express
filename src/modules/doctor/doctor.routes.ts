import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { requireRoles } from "../../middlewares/roles.middleware";
import { ROLES } from "../../constants/roles";
import { authMiddleware } from "../../middlewares/auth.middleware";

const doctorRouter = Router();

doctorRouter.post('/', authMiddleware, requireRoles(ROLES.ADMIN), doctorController.createDoctor);
doctorRouter.get('/', authMiddleware, requireRoles(ROLES.ADMIN, ROLES.DOCTOR, ROLES.ASSISTANT), doctorController.getAllDoctors);

export default doctorRouter;
