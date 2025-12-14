import mongoose from "mongoose";

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected sucessfully");
    }
    catch (err) {
        console.log("Database connection error:, err");
        process.exit(1);
    }
}
export default connectDB;