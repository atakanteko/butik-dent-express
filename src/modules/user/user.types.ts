export interface IUser {
    _id?: string;
    name: string;
    email: string;
    passwordHash: string;
    roles: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    roles: string[];
}