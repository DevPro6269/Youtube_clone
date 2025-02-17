import express from "express"
import isAuthenticate from "../middlewares/auth.middleware.js";
import WrapAsync from "../utils/WrapAsync.js";
import {createChannel, getChannelDetails, updateChannel} from "../controller/channel.controller.js"
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();


router.route("").post( upload.single("profile"),isAuthenticate,WrapAsync(createChannel))

router.route("/:channelId").get(WrapAsync(getChannelDetails))
.put(isAuthenticate,WrapAsync(updateChannel))
export default router;