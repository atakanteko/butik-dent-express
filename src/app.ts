import connectDb from './config/db'
import express from 'express'
import { errorHandler } from './middlewares/errorHandler';


// DB Connection
connectDb();

const app = express()

//middlewares
app.use(express.json())
app.use(errorHandler)

export default app;