import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri).then(conn=>console.log("DATABASE CONNECTION SUCESSFULL.")).catch(err=>console.log("MONGODB_ERR:\t",err))
    } catch (error) {
        const err = new Error()
        err.name = "mongoError";
        err.message = "MONGODB CONNECTING ERROR";
        return err
    }
}
export default connectDB