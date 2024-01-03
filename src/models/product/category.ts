import { Schema, model } from "mongoose";
import { IProductCategory } from "../../types/model";

const ProductCategorySchema = new Schema<IProductCategory>({
    name: { type: String, required: true, unique: true },
});

const ProductCategory = model<IProductCategory>('ProductCategory', ProductCategorySchema, 'productCategories');

export default ProductCategory;