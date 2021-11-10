import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

// Desc: Auth User & get Token
// Route: POST /api/users/login
// Access: Public
router.route("/").post(registerUser);
router.route("/").get(protect, adminAuth, getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router.route("/:id").delete(protect, adminAuth, deleteUser);
router.route("/:id").get(protect, adminAuth, getUserById);
router.route("/:id").put(protect, adminAuth, updateUser);

// middleware is fisrt, so it run first before getUserProfile
export default router;
