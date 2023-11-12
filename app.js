import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'

import path from 'path'
import connectDB from './db/connection.js'
import cors from 'cors'
connectDB(app.get("env")==="development" ? process.env.DB_URI_LOCAL : process.env.DB_URI_PROD)


export const app = express();


// imported routes 
import userRouter from './routes/user/userRoutes.js'
import postRouter from './routes/blogpost/postRouter.js'

// app.use(session({
//     name:"ghblogsession",
//     secret:process.env.SESSION_SECRET,
//     saveUninitialized:true,
//     cookie:{
//         httpOnly:true,
//         secure:true,
//     }
// }))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(express.static(path.join(process.cwd(), "./public")))



app.use("/userop", userRouter);
app.use("/blogop", postRouter);

app.use("/", async (req,res)=>{
    return res.json({success:true,message:"hello world"})
})





app.listen(process.env.PORT, () => {
    console.log("APP ARE LISTENNING ON PORT",process.env.PORT)
})