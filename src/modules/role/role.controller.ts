import { Request, Response, NextFunction } from "express";
import { rolesService } from "./role.service";
import { HttpStatus } from "../../constants/httpStatus";

const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await rolesService.createRole(req.body);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Role created successfully',
            data: role
        });
    } catch (error) {
        next(error);
    }
};

const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await rolesService.getAllRoles();
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Roles retrieved successfully',
            data: roles,
            count: roles.length
        });
    } catch (error) {
        next(error);
    }
};

const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const role = await rolesService.getRoleById(id as string);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Role retrieved successfully',
            data: role
        });
    } catch (error) {
        next(error);
    }
};

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const role = await rolesService.updateRole(id as string, req.body);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Role updated successfully',
            data: role
        });
    } catch (error) {
        next(error);
    }
};

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await rolesService.deleteRole(id as string);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Role deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const rolesController = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};