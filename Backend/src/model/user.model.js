import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs"; // Corrected import name

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profile: {
        type: String,
        // required: true,
    },
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    channel: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
    },
    subscribed: [
        {
            type: Schema.Types.ObjectId,
            ref: "Channel",
        }
    ],
    playlist: {
        type: Schema.Types.ObjectId,
        ref: "Playlist",
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving it
userSchema.pre("save", async function (next) {
    const saltRounds = 10;

    try {
        // Check if the password is already hashed (to prevent re-hashing)
        if (!this.isModified('password')) return next();
        
        const salt = await bcryptjs.genSalt(saltRounds);
        this.password = await bcryptjs.hash(this.password, salt);
    } catch (error) {
        return next(error);
    }

    next(); // Ensure to call next()
});

// Instance method to compare passwords during login
userSchema.methods.comparePassword = async function (userPassword) {
    return bcryptjs.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
