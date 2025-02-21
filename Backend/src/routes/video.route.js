import express from "express";
import multer from "multer";
import isAuthenticate from "../middlewares/auth.middleware.js";
import WrapAsync from "../utils/WrapAsync.js";
import {
  deleteVideo,
  getAllVideos,
  publishVideo,
  updateVideo,
  viewVideo,
} from "../controller/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("").get(WrapAsync(getAllVideos));

router
  .route("/:channelId")
  .post(
    isAuthenticate,
    upload.fields([
      { name: "video", maxCount: 1 }, // Max 1 video
      { name: "thumbnail", maxCount: 1 }, // Max 1 thumbnail
    ]),
    WrapAsync(publishVideo)
  )
  .put(isAuthenticate, WrapAsync(updateVideo))


  router.route("/:videoId").get(WrapAsync(viewVideo))
  .delete(isAuthenticate, WrapAsync(deleteVideo));

export default router;
