import mongoose from "mongoose";

const  connectDB = async ()=>{

    mongoose.connection.on('connected',()=>
    console.log("database is connected"));

    await mongoose.connect(`${process.env.MONGODB_URL}/LOGIN-Auth`)
};

export default connectDB;
