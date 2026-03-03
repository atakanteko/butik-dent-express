import Role from "./role.model";
import { ICreateRole, IUpdateRole } from "./role.types";
import { HttpStatus } from "../../constants/httpStatus";

const createRole = async (data: ICreateRole) => {
    const existingRole = await Role.findOne({ name: data.name.trim() });
    if (existingRole) {
        const error: Error = new Error('Role with this name already exists');
        (error as any).status = HttpStatus.CONFLICT;
        throw error;
    }
    
    const role = await Role.create(data);
    return role;
};

const getAllRoles = async () => {
    const roles = await Role.find().select('-__v').sort({ createdAt: -1 });
    return roles;
};

const getRoleById = async (id: string) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const error: Error = new Error('Invalid role ID format');
        (error as any).status = HttpStatus.BAD_REQUEST;
        throw error;
    }
    
    const role = await Role.findById(id).select('-__v');
    if (!role) {
        const error: Error = new Error('Role not found');
        (error as any).status = HttpStatus.NOT_FOUND;
        throw error;
    }
    
    return role;
};

const updateRole = async (id: string, data: IUpdateRole) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const error: Error = new Error('Invalid role ID format');
        (error as any).status = HttpStatus.BAD_REQUEST;
        throw error;
    }
    
    const existingRole = await Role.findById(id);
    if (!existingRole) {
        const error: Error = new Error('Role not found');
        (error as any).status = HttpStatus.NOT_FOUND;
        throw error;
    }
    
    if (data.name && data.name.trim() !== existingRole.name) {
        const duplicateRole = await Role.findOne({ name: data.name.trim() });
        if (duplicateRole) {
            const error: Error = new Error('Role with this name already exists');
            (error as any).status = HttpStatus.CONFLICT;
            throw error;
        }
    }
    
    const role = await Role.findByIdAndUpdate(
        id,
        { ...data, name: data.name?.trim() },
        { new: true, runValidators: true }
    ).select('-__v');
    
    return role;
};

const deleteRole = async (id: string) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const error: Error = new Error('Invalid role ID format');
        (error as any).status = HttpStatus.BAD_REQUEST;
        throw error;
    }
    
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
        const error: Error = new Error('Role not found');
        (error as any).status = HttpStatus.NOT_FOUND;
        throw error;
    }
    
    return role;
};

export const rolesService = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};