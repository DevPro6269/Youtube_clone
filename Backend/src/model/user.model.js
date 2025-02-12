import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password:{
     type:String,
     required:true,
     min:6
    },
    profile:{
        type:String,
        required:true,
    },
    history:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    channel:{
        type:Schema.Types.ObjectId,
        ref:"Channel"
    },
    subscribed:[
        {
            type:Schema.Types.ObjectId,
            ref:"Channel"
        }
    ],
    playlist:{
        type:Schema.Types.ObjectId,
        ref:"Playlist"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);
export default User;