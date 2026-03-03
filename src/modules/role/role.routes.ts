import { Router } from "express";
import { createRoleValidation, updateRoleValidation } from "./role.validation";
import { validationHandler } from "../../middlewares/validation.middleware";
import { rolesController } from "./role.controller";

const roleRouter = Router();

roleRouter.get('/', rolesController.getAllRoles);
roleRouter.get('/:id', rolesController.getRoleById);
roleRouter.post('/', createRoleValidation, validationHandler, rolesController.createRole);
roleRouter.put('/:id', updateRoleValidation, validationHandler, rolesController.updateRole);
roleRouter.delete('/:id', rolesController.deleteRole);

export default roleRouter;