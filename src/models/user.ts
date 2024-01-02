
import { Schema, Model, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
}

interface IUserMethods {
    fullName(): string;
    comparePassword(password: string): Promise<boolean>;
    toJSON(): IUser;
    generateAuthToken(): string | null;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
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


// Methods - Instance methods

UserSchema.methods.fullName = function(): string {
    return `${this.firstName} ${this.lastName}`;
};

UserSchema.methods.toJSON = function(): IUser {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    }
    catch (err) {
        return false;
    }
};

UserSchema.methods.generateAuthToken = function(): string | null {
    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
        const token = jwt.sign({ _id: this._id }, secret, { expiresIn });
        return token;
    }
    catch (err) {
        throw new Error(err as any);
    }
};

// Statics - Model methods



const User = model<IUser, UserModel>('User', UserSchema);

export default User;