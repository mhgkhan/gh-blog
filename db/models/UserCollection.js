import mongoose from "mongoose";


const userStr = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{
    timestamps:true
})

const UserCollection = mongoose.model("User", userStr);

export default UserCollection