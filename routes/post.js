import express from "express";
const postRouter = express.Router()


postRouter.post("create", async (req,res)=>{
    try {
        console.log(req.body)
        return res.json({body:req.body})
    } catch (error) {
       console.log(error)
    }
})

export default postRouter;