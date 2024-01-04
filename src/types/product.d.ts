import { Document } from "mongoose";
import { TimestampedDocument } from "./models";

interface ICategory extends Document {
    name: string;
}

interface IProduct extends TimestampedDocument {
    name: string;
    description: string;
    price: number;
    categories: ICategory[];
}