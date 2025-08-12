import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/with/:matchId",     getMessages);

export default router;
