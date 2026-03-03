import mongoose  from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log(`Connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("DB Error", error);
        
    }
}

export default connectDb;