
import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
}

const UserSchema = new Schema<IUser>({
        firstName: { type: String, required: true },
        lastName:{ type: String, required: true },
        email: { type: String, required: true },
        password:{ type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        try {
            // Hash password
            user.password = await bcrypt.hash(user.password, 8);
            return next();
        }
        catch (err: any) {
            return next(err);
        }
    }
    next();
});



const User = model<IUser>('User', UserSchema);

export default User;