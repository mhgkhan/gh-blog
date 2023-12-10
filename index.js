import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import path from 'path'
import connectDB from './db/connection.js'
import cors from 'cors'



export const app = express();

// connecting to database
connectDB(app.get("env") == "development" ? "mongodb://localhost:27017/GHBLOGPROJECT" : process.env.DB_URI_PROD)
// imported routes || this is used in line 31 to line 32
import userRouter from './routes/user/userRoutes.js'
import postRouter from './routes/blogpost/postRouter.js'


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(express.static(path.join(process.cwd(), "./public")))


// USEROP = USER OPERATIONS
// BLOGOP = BLOG OPERATIONS
app.use("/userop", userRouter);
app.use("/blogop", postRouter);


app.use("/", async (req, res) => {
    return res.json({ success: true, message: "WELCOME TO GH-BLOG-API ", author: "GH-COMPANY", gitub: "https://github.com/mhgkhan" })
})





// app.listen(process.env.PORT, () => {
//     console.log("APP ARE LISTENNING ON PORT", process.env.PORT)
// })