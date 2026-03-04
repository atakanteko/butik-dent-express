import connectDb from './config/db'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware';
import roleRouter from './modules/role/role.routes';
import userRouter from './modules/user/user.routes';


// DB Connection
connectDb();

const app = express()

app.use(express.json())

app.use('/api/role', roleRouter)
app.use('/api/user', userRouter)

//middlewares
app.use(express.json())
app.use(errorHandler)

export default app;