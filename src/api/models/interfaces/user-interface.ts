export interface IUser {
    id?: string;
    email: string;
    name: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserInput {
    email: string;
    name: string;
    password: string;
}

export interface IUserOutput {
    email: string;
    name: string;
}

export interface IUserAutenticate {
    email: string;
    password: string;
}