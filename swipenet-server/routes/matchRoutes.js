import express from "express";
import { swipeRight, swipeLeft, getMatches } from "../controllers/matchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/right/:id", protect, swipeRight);
router.post("/left/:id", protect, swipeLeft);
router.get("/my-matches", protect, getMatches);

export default router;
