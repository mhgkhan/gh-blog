import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import connectDB from './db/connection.js'
connectDB(process.env.DB_URI_LOCAL)

// improt routes 
import postRouter from './routes/post.js'

export const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(express.static(path.join(process.cwd(), "./public")))


app.use("/post/", postRouter)