import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({

   publishedBy:{
     type:Schema.Types.ObjectId,
     ref:"Channel",
     required:true
   },

    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    thumbnailUrl:{
        type:String,
        required:true
    },
    likes:
        {
            type:Number,
            default:0
        },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    tags:[
        {
            type:String,
            trim:true
        }
    ],

},{timestamps:true})

const Video = mongoose.model("Video",videoSchema);
export default Video;