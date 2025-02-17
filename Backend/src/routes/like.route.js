import express from "express"
import WrapAsync from "../utils/WrapAsync.js";
import { hasUserLikedVideo, likeVideo, unlikeVideo } from "../controller/like.controller.js";
import isAuthenticate from "../middlewares/auth.middleware.js"
const router = express.Router();


router.route("/:videoId")
.get(isAuthenticate,WrapAsync(hasUserLikedVideo))
.put(isAuthenticate,WrapAsync(unlikeVideo))
.post(isAuthenticate,WrapAsync(likeVideo))


export default router;