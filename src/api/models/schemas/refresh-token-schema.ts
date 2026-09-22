import { Schema, model, Types } from 'mongoose';
import { IRefreshToken } from '../interfaces/refresh-token-interface.js';

const RefreshTokenSchema = new Schema<IRefreshToken>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        tokenHash: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
            expires: 0
        },

        revokedAt: {
            type: Date,
            default: null
        },

        replacedByTokenHash: {
            type: String,
            default: null
        },

        ip: {
            type: String
        },

        userAgent: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model<IRefreshToken>(
    'RefreshToken',
    RefreshTokenSchema
);