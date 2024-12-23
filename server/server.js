import 'dotenv/config'
import express from "express"
import cors from "cors"
import { logger } from "logger-express";
import userRoutes from './config/routes/user.routes.js'


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(logger());

app.use(userRoutes)

app.listen(port, console.log(`¡Servidor encendido en el puerto! ${port}`));