import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("CONNECTED TO DATABASE.")
    } catch (error) {
        const err = new Error()
        err.name = "mongoError";
        err.message = "MONGODB CONNECTING ERROR";
        return err
    }
}
export default connectDB