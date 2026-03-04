import { Router } from "express";
import { createRoleValidation, updateRoleValidation } from "./role.validation";
import { validationHandler } from "../../middlewares/validation.middleware";
import { roleController } from "./role.controller";

const roleRouter = Router();

roleRouter.get('/', roleController.getAllRoles);
roleRouter.get('/:id', roleController.getRoleById);
roleRouter.post('/', createRoleValidation, validationHandler, roleController.createRole);
roleRouter.put('/:id', updateRoleValidation, validationHandler, roleController.updateRole);
roleRouter.delete('/:id', roleController.deleteRole);

export default roleRouter;