import mongoose from 'mongoose'

export const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("conexion exitosa")
    }catch (e) {
       console.log(e)
    }
} 