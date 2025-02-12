import { Schema } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User", // User who created the playlist
        required: true,
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
},{timestamps:true});

const Playlist = model("Playlist", playlistSchema);
export default Playlist;
