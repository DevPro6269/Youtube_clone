import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import { verifyOtp } from "./controller/user.controller.js";
import channelRoute from "./routes/channel.route.js"
import commentRoute from "./routes/comment.route.js"
import videoRoute from "./routes/video.route.js"
import likeVideoRoute from "./routes/like.route.js"
import cors from "cors"
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend URL (replace with your frontend URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable cookies and other credentials
  };

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// user route
app.use("/",(req,res,next)=>{
    console.log("working")
    next()
})
app.use("/api/user",userRoute)
app.use("/api/channel",channelRoute)
app.use("/api/comment",commentRoute)
app.use("/api/video",videoRoute)
app.use("/api/like",likeVideoRoute)

app.post("/api/verify",verifyOtp)
// Error handling middleware
app.use((err, req, res, next) => {
    // If error contains a status code, use it, otherwise default to 500
    const statusCode = err.statusCode || 500;

    // Return a JSON response with the error status and message
    return res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
    });
});

export default app;
