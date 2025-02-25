import express from "express"
import { getCurrentUser, login, logout, profile, SignUp, updateProfile } from "../controller/user.controller.js";
import WrapAsync from "../utils/WrapAsync.js"
import isAuthenticate from "../middlewares/auth.middleware.js"
const router = express.Router();

router.route("/signup").post(WrapAsync(SignUp))
router.route("/login").post(WrapAsync(login))

// protected routes
router.route("").get(isAuthenticate,WrapAsync(getCurrentUser))
router.route("/logout").post(isAuthenticate,WrapAsync(logout))
router.route("/profile").get(isAuthenticate,WrapAsync(profile))
.put(isAuthenticate,WrapAsync(updateProfile))
export default router;