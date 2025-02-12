import mongoose from "mongoose"

async function ConnectDB(){
   try {    
    await mongoose.connect(`${process.env.MONGO_URL}/youtube`)
    console.log("database is connected")
   } catch (error) {
    console.log(error)
   }

}

export default ConnectDB;