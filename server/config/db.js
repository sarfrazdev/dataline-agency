import mongoose  from "mongoose";



const connectDb=async()=>{
    try{
            await mongoose.connect(process.env.MONGO_URL)
        console.log("Db connection successfully")

    }
    catch(err){
        console.log("Error in connecting db",err)
    }

}
export default connectDb