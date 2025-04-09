import { Request, Response } from "express";
import { IProduct, Product } from "../models/product.model"
import { get } from "http";

//Get all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to read products" })
    }
}

//Get Product By Id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
            return
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to read product" })
    }
}

//get product by name
const getProductByName = async (req: Request<{}, {}, {},{ productName: string }>, res: Response) => {
    try {
        const { productName } = req.query
        const product = await Product.find({
            productName: {
                $regex: productName,
                $options: 'i'
            }
        })
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
            return
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to read product" })
    }
}

//update product by id
const updateProductByid = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
            return
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to update product" })
    }
}

//Delete Product
const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            })
            return
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to delete product" })
    }
}

//Create Products
const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
    try {
        const { productName, productPrice } = req.body
        const product = await Product.create({ productName, productPrice })
        res.status(201).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Unable to create product" })
    }
}

export default {
    createProduct,
    getProductById,
    getProductByName,
    deleteProductById,
    updateProductByid,
    getAllProducts
}