import { Schema, model } from "mongoose";
import { ICategory } from "../../types/product";

const CategorySchema = new Schema<ICategory>({
    name: { type: "String", required: true, unique: true}
})

const Category = model<ICategory>('Category', CategorySchema, "productCategories")

export default Category