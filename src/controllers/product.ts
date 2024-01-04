import { Request, Response } from "express";

import { UserRequest } from "../types/auth";
import Product from "../models/product";
import Category from "../models/product/category";


interface ProductBody {
    name: string;
    description: string;
    price: number;
    categories: string[]
}


const getAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await Category.find()
        res.status(200).json({
            categories
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Unexpected error"
        })
    }
}

const getAllproducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.find()
        res.status(200).json({
            products
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: "Unexpected error"
        })
    }
}

const createProduct = async (req: UserRequest, res: Response) => {
    try {
        let {
            name,
            description,
            price,
            categories
        } = req.body as ProductBody
    
        if(!name || !price || !description){
            throw new Error("Please fill in all fields")
        }
        categories = categories || []
    
        const product = await Product.create({
            name,
            description,
            price,
            categories
        })
    
        res.status(201).json({
            product
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        })
    }
}

export {
    getAllCategories,
    getAllproducts,
    createProduct
}