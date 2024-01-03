import { Document, QueryWithHelpers } from "mongoose";

interface TimeStampedDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}
/// User
interface IUser extends TimeStampedDocument {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/// Product
interface IProductCategory extends Document {
    name: string;
}

interface IProduct extends TimeStampedDocument {
    name: string;
    description: string;
    price: number;
    categories: IProductCategory[];
    discount?: number;
}