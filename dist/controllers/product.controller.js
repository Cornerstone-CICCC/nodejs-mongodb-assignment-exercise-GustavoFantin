"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
//Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to read products" });
    }
});
//Get Product By Id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to read product" });
    }
});
//get product by name
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.query;
        const product = yield product_model_1.Product.find({
            productName: {
                $regex: productName,
                $options: 'i'
            }
        });
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to read product" });
    }
});
//update product by id
const updateProductByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to update product" });
    }
});
//Delete Product
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found!"
            });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to delete product" });
    }
});
//Create Products
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, productPrice } = req.body;
        const product = yield product_model_1.Product.create({ productName, productPrice });
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to create product" });
    }
});
exports.default = {
    createProduct,
    getProductById,
    getProductByName,
    deleteProductById,
    updateProductByid,
    getAllProducts
};
