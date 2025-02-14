import express from "express"
import WrapAsync from "../utils/WrapAsync.js";
import { hasUserLikedVideo, likeVideo, unlikeVideo } from "../controller/like.controller.js";

const router = express.Router();


router.route("/:videoId")
.get(WrapAsync(hasUserLikedVideo))
.put(WrapAsync(unlikeVideo))
.post(WrapAsync(likeVideo))


export default router;