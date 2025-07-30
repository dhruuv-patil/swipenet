import express from "express";
import { updateProfile, getAllUsers, getUserById } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/update", updateProfile);
router.get("/all",  getAllUsers);
router.get("/:id",  getUserById);

export default router;
