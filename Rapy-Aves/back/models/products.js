import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Precio: {
        type: Number,
        required: true,
    },
    Imagen: {
        type: String,
        required: true,
    },
    Categoria: {
        type: String,
        enum: ["Bandeja", "Sopa", "Pollo", "Bebidas", "Porciones", "Combo Personal"]

    }
})

export const productModel = mongoose.model('products', productSchema)