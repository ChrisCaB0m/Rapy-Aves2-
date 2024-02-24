import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import routerProducts from './routes/products.routes.js';
import routerUsers from './routes/users.routes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/products', routerProducts);
app.use('/api/users', routerUsers);

connectDatabase();

app.listen(PORT, () => {
    console.log("El servidor se está ejecutando en el puerto " + PORT);
});
