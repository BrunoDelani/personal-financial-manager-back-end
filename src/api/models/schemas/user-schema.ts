import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { IUser } from '../interfaces/user-interface.js';

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        passwordHash: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => ({
                id: ret._id.toString(),
                email: ret.email,
                name: ret.name,
                createdAt: ret.createdAt,
                updatedAt: ret.updatedAt
            })
        }
    }
);

UserSchema.plugin(paginate);

export default model<IUser, PaginateModel<IUser>>(
    'User',
    UserSchema
);