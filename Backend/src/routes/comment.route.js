import express from "express"
import isAuthenticate from "../middlewares/auth.middleware.js"
import WrapAsync from "../utils/WrapAsync.js";
import { createComment, deleteComment, updateComment } from "../controller/comment.controller.js";
const router = express.Router();


router.route("/:videoId").post(isAuthenticate,WrapAsync(createComment))

router.route("/:commentId")
.put(isAuthenticate,WrapAsync(updateComment))
.delete(isAuthenticate,WrapAsync(deleteComment))


export default router;