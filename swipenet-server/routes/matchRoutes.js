import express from "express";
import { swipeRight, swipeLeft, getMatches } from "../controllers/matchController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/right/:id",  swipeRight);
router.post("/left/:id",     swipeLeft);
router.get("/my-matches",  getMatches);

export default router;
