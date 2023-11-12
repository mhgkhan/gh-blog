import mongoose from "mongoose";

const infoStr = mongoose.Schema({
    fullname: { type: String },
    country: { type: String, default: "pakistan" },
    phone: { type: String },
    gender: { type: String },
    role: { type: String, default: "other" },
    dob: { type: String },
    profileimage: { type: String },
    coverimage: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique:true,
    }
},{
    timestamps:true
})

const InfoCollection = mongoose.model("User_Information", infoStr);


export default InfoCollection