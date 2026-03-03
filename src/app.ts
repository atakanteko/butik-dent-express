import connectDb from './config/db'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware';
import roleRouter from './modules/role/role.routes';


// DB Connection
connectDb();

const app = express()

app.use(express.json())

app.use('/api/roles', roleRouter)

//middlewares
app.use(express.json())
app.use(errorHandler)

export default app;