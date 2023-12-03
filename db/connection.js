import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.DB_URI_PROD);
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MONGO_DB_ERROR CONNECTING ERROR : \t", error);
        process.exit(1);
    }
}
export default connectDB