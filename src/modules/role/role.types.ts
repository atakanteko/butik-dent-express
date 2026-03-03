export interface IRole {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateRole {
    name: string;
}

export interface IUpdateRole {
    name?: string;
}