import { Schema, model } from "mongoose";
import { IProduct } from "../../types/product";

const ProductSchema = new Schema<IProduct>({
    name: { type: "String", required: true},
    description: { type: "String", required: true},
    price: { type: "Number", required: true},
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})

const Product = model<IProduct>('Product', ProductSchema)

export default Product