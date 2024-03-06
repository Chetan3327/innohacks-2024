import express from 'express'
import dotenv from 'dotenv'
import connect from './config/db.js'
import cors from 'cors'
import verifyToken from './middlewares/verifyToken.js'
dotenv.config()
connect()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: "hello, world"})
})

import userRoute from './routes/user.routes.js'
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
});