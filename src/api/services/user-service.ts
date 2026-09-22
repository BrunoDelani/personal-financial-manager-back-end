import { ConflictError } from "../../errors/conflict-error.js";
import { NotFoundError } from "../../errors/not-found-error.js";
import { IUser, IUserInput, IUserOutput } from "../models/interfaces/user-interface.js";
import userRepository from "../repositories/user-repository.js";
import { hashPassword } from "../../utils/password.js";
import { Types } from "mongoose";

class UserService {

    async createUser(payload: IUserInput): Promise<IUserOutput> {
        const response = await userRepository.findByEmail(payload.email);

        if (response !== null) {
            throw new ConflictError('Email is already in use.');
        }

        const passwordHash = await hashPassword(payload.password);

        const userCreated: IUser = await userRepository.create(({
            "id": new Types.ObjectId(),
            "email": payload.email,
            "name": payload.name,
            "passwordHash": passwordHash
        }));

        return {
            "email": userCreated.email,
            "name": userCreated.name
        }
    }

    async findUserByEmail(email: string): Promise<IUserOutput> {
        const response = await userRepository.findByEmail(email);

        if (response == null) {
            throw new NotFoundError('User not found.');
        }

        return {
            "email": response.email,
            "name": response.name
        }
    }
}

export default new UserService();