import { productModel } from "../models/products.js"

export const createProducts = async (request, response) => {
    try {
        let body = request.body

        let newProducts = await productModel.create(body)

        response.json(newProducts)
    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const getProducts = async (request, response) => {
    try {
        let Products = await productModel.find()
        console.log(Products);
        response.json(Products)
    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const getProductsByCategory = async (request, response) => {
    try {
        let categoryFilter = request.params.category
        let Products = await productModel.find({ Categoria: categoryFilter })
        response.json(Products)
    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const deleteProducts = async (request, response) => {
    try {
        let idForDelete = request.params.id
        let Products = await productModel.findByIdAndDelete({ _id: idForDelete })
        response.json(Products)
    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const updateProduct = async (request, response) => {
    try {
        let idForUpdate = request.params.id;
        let updatedProduct = request.body;

        let updatedProductResult = await productModel.findByIdAndUpdate(
            idForUpdate,
            updatedProduct,
            { new: true }
        );
        response.json(updatedProductResult);
    } catch (e) {
        console.error(e);
        response.json(e)
    }
};