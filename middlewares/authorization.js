import jwt from 'jsonwebtoken'
import { processToken } from './UtiltyFunctions.js'

export const authorization = (req,res,next) =>{
    // console.log(req.header('ghtoken'))
    try {
        if(req.header('ghtoken') || req.header('ghtoken') !== undefined ){
            // console.log("hello world ")
            const token = req.header('ghtoken');
            // console.log(token)
            const verfiyToken = processToken(token);
            req.userId = verfiyToken.id
            req.userEmail = verfiyToken.email
            // console.log(verfiyToken.id)
            next()
        }
        else{
            res.status(401).json({success:false,message:"User is unathorize"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error})
    }
}
