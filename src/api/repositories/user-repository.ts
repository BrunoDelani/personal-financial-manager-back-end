import { IUser } from "../models/interfaces/user-interface.js";
import userSchema from "../models/schemas/user-schema.js";

class UserRepository {
    async create(payload: IUser): Promise<IUser> {
        return userSchema.create(payload);
    }
    async login(email: string): Promise<IUser | null> {
        return userSchema.findOne({ email }).select('+passwordHash');
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return userSchema.findOne({ email });
    }
}

export default new UserRepository();