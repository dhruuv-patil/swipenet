import express from "express";
import { createOrUpdateProfile } from "../controllers/JsProfileController.js";
import { protect } from "../Middleware/authmiddleware.js";
import { getMyProfile } from "../controllers/JsProfileController.js";

const router = express.Router();

router.post("/create-profile", protect , createOrUpdateProfile);

router.get("/me", protect, getMyProfile);

export default router;
