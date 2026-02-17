import express from "express";
import {
  createOrUpdateEmployerProfile,
  getEmployerProfile,
  
} from "../controllers/EpProfileController.js";
import {  protect } from "../Middleware/authmiddleware.js";

const router = express.Router();

// Create or update employer profile
router.post("/create-profile", protect, createOrUpdateEmployerProfile);

// Get employer's own profile
router.get("/me", protect, getEmployerProfile);

// (Optional) Get profile by ID
// router.get("/:id", getEmployerProfileById);

export default router;
