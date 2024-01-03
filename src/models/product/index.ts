import { HydratedDocument, Model, QueryWithHelpers, Schema, model } from "mongoose";
import { IProduct } from "../../types/model";


type ProductQueryHelper = QueryWithHelpers<
    HydratedDocument<IProduct>[],
    HydratedDocument<IProduct>,
    {}>;

interface ProductQueryHelpers {
    findByCategory: (categoryId: string) => ProductQueryHelper;
}

type ProductModel = Model<IProduct, ProductQueryHelpers>;

const ProductSchema = new Schema<
    IProduct,
    ProductModel,
    {},
    ProductQueryHelpers>({
    
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    categories: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
    discount: {
        type: Number,
        min: 0,
        max: 100
    }
}, {
    timestamps: true,
});

ProductSchema.query.findByCategory = function (
    this: ProductQueryHelper,
    categoryId: string
) {
    return this.where({ categories: categoryId });
}

const Product = model<IProduct, ProductModel>('Product', ProductSchema);

export default Product;