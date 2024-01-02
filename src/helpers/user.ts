import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User, { IUser } from "../models/user";

export const generatePasswordHash = async function(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const findByEmail = async function(email: string) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const findByToken = async function(token: string) {
    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const decoded = jwt.verify(token, secret) as { _id: string };
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (err) {
        throw new Error(err as any);
    }
}