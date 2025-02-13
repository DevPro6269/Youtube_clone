import express from "express"
import isAuthenticate from "../middlewares/auth.middleware.js";
import WrapAsync from "../utils/WrapAsync.js";
import {createChannel, getChannelDetails, updateChannel} from "../controller/channel.controller.js"
const router = express.Router();

router.route("").post(isAuthenticate,WrapAsync(createChannel))
router.route("/:channelId").get(WrapAsync(getChannelDetails))
.put(isAuthenticate,WrapAsync(updateChannel))
export default router;