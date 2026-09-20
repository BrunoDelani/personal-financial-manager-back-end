import { ConflictError } from "../errors/conflict-error.js";
import { NotFoundError } from "../errors/not-found-error.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";
import { IUser, IUserAutenticate, IUserInput, IUserOutput } from "../models/interfaces/user-interface.js";
import userRepository from "../repositories/user-repository.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";

class UserService {
    async authenticateUser(payload: IUserAutenticate): Promise<IUserOutput> {
        const user = await userRepository.login(payload.email);

        if (!user) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        const passwordValid = await verifyPassword(
            user.passwordHash,
            payload.password,
        );

        if (!passwordValid) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        return {
            email: user.email,
            name: user.name,
        };
    }

    async createUser(payload: IUserInput): Promise<IUserOutput> {
        const response = await userRepository.findByEmail(payload.email);

        if (response !== null) {
            throw new ConflictError('Email is already in use.');
        }

        const passwordHash = await hashPassword(payload.password);

        const userCreated: IUser = await userRepository.create(({
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