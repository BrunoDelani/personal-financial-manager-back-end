import { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
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

export interface IUserAutenticateInput {
  email: string;
  password: string;
}

export interface IUserAutenticateOutput {
  accessToken: string;
  refreshToken: string;
}
