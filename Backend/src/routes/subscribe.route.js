import express from "express"
import WrapAsync from "../utils/WrapAsync.js"
import isAuthenticate from '../middlewares/auth.middleware.js'
import { hasSubscribed, subscribe, unsubscribe } from "../controller/subscribe.controller.js"

const router = express.Router()


router.route("/:videoId").get(isAuthenticate,WrapAsync(hasSubscribed))
.post(isAuthenticate,WrapAsync(subscribe))
.delete(isAuthenticate,WrapAsync(unsubscribe))

export default router