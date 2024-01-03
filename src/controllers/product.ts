
import { Request, Response } from "express";

import Product from "../models/product";
import ProductCategory from "../models/product/category";

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await ProductCategory.find();
        res.status(200).json({ categories });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    try {
        const category = await ProductCategory.create({ name })
        res.status(201).json({ category });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        let products = await Product.find().populate('categories');
        if(req.query.category) {
            products = await Product.find().
                findByCategory(req.query.category as string).
                populate('categories');
        }
        res.status(200).json({ products });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('categories');
        res.status(200).json({ product });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, categories, discount } = req.body;
    if(!name || !description || !price || !categories) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const product = await Product.create({
            name,
            description,
            price,
            categories,
            discount
        });
        await product.populate('categories');
        res.status(201).json({ product });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { name, description, price, categories, discount } = req.body;
    if(!name || !description || !price || !categories) {
        console.log(req.body);
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            categories,
            discount
        }, { new: true });
        if(!product) {
            throw new Error('Product not found');
        }
        await product.populate('categories');
        res.status(200).json({ product });
    }
    catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            throw new Error('Product not found');
        }
        res.status(200).json({ 
            message: 'Product deleted successfully',
            product
         });
    }
    catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export {
    getCategories,
    createCategory,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}