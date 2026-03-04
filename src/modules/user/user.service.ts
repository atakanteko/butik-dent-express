import { HttpStatus } from "../../constants/httpStatus";
import Role from "../role/role.model";
import User from "./user.model";
import { ICreateUser } from "./user.types";
import bcrypt from "bcrypt-ts";

const createUser = async (data: ICreateUser) => {
    const existingUser = await User.findOne({ email: data.email.trim() });
    if (existingUser) {
        const error: Error = new Error('User with this email already exists');
        (error as any).status = HttpStatus.CONFLICT;
        throw error;
    }

    // check if roles are valid
    const roles = await Role.find({ _id: { $in: data.roles } });
    if (roles.length !== data.roles.length) {
        const error: Error = new Error('Invalid role Ids');
        (error as any).status = HttpStatus.BAD_REQUEST;
        throw error;
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)

    const userData = {
        ...data,
        passwordHash
    }
    const user = await User.create(userData);
    return user;
};

const getAllUsers = async () => {
    const users = await User.find().select('-__v').populate('roles').sort({createdAt: -1});
    return users;
};


export const userService = {
    createUser,
    getAllUsers
};