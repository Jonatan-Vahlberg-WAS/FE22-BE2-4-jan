import { Router } from "express";

import {
    getAllCategories,
    getAllproducts,
    createProduct
} from "../controllers/product"
import { verifyToken } from "../middlewares/verifyToken";


const router = Router()

router.get("/categories", getAllCategories)

router.get("/", getAllproducts),
router.post("/", verifyToken, createProduct)

export default router