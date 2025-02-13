import express from "express"
import { SignUp } from "../controller/user.controller.js";
import WrapAsync from "../utils/WrapAsync.js"

const router = express.Router();

router.route("/signup").post(WrapAsync(SignUp))
export default router;