import { userModel } from "../models/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const createUser = async (request, response) => {
    try {

        let body = request.body

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newUser = await userModel.create(body)

        const payload = { id: newUser._id, email: newUser.email }

        let token = await jwt.sign(payload, process.env.JWT_KEY)

        const userData = {
            token,
            newUser
        }
        response.send(userData)

    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const login = async (request, response) => {
    try {
        let body = request.body

        let userExist = await userModel.findOne({ email: body.email })

        if (!userExist) {
            return response.json({ error: "No existe un usuario con este correo" })
        }

        const validationsPassword = bcrypt.compareSync(body.password, userExist.password);

        if (validationsPassword) {
            const payload = { _id: userExist._id }
            const token = jwt.sign(payload, process.env.JWT_KEY)

            const userData = {
                token,
                userExist
            }
            return response.send(userData)
        } else {
            return response.send({ error: "Datos correctos" })
        }



    } catch (e) {
        return response.json(e)
    }
}

export const getUser = async (request, response) => {
    try {

        let user = await userModel.find()

        response.json(user)

    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const deleteUser = async (request, response) => {
    try {
        let idForDelete = request.params.id
        console.log(idForDelete);
        let User = await userModel.findByIdAndDelete({ _id: idForDelete })
        console.log(User);
        response.json(User)
    } catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const updateUser = async (request, response) => {
    try {
        let idForUpdate = request.params.id;
        let updatedUser = request.body;
        updatedUser.password = bcrypt.hashSync(updatedUser.password, parseInt(process.env.MASTER_KEY));
        let updatedUserResult = await userModel.findByIdAndUpdate(
            idForUpdate,
            updatedUser,
            { new: true }
        );
        response.json(updatedUserResult);
    } catch (e) {
        console.error(e);
        response.json(e)
    }
};