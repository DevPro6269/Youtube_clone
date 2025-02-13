import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
   channelName:{
    type:String,
    required:true,
    unique:true
   },
    description:{
        type:String,
    },
    videos:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    subscribers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{timestamps:true})

const Channel = mongoose.model("Channel",channelSchema)
export default Channel;