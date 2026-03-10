import bcrypty from "bcrypt-ts"
import jwt from "jsonwebtoken"
import { ILoginBody } from "./login.types";
import { HttpStatus } from "../../constants/httpStatus";
import User from "../user/user.model";
import Role from "../role/role.model";

const login = async (data: ILoginBody) => {
    const user = await User.findOne({ email: data.email.trim() });
    if (!user) {
        const error: Error = new Error('user does not exist');
        (error as any).status = HttpStatus.NOT_FOUND;
        throw error;
    }

    const passwordCorrect = await bcrypty.compare(data.password, user.passwordHash)

    if (!passwordCorrect) {
        const error: Error = new Error('invalid password');
        (error as any).status = HttpStatus.BAD_REQUEST;
        throw error;
    }

    const userRoles = await Role.find( { _id: { $in: user.roles } }, {_id: 0, __v: 0, createdAt: 0, updatedAt: 0} )
    
    const userForToken = {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: userRoles,
    }

   const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: 60 * 60 })


    return { token, name: user.name, email: user.email }

};

export const loginService = {
    login
}