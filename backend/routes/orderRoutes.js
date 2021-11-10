import express from "express";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOderById,
  updateOrdertoDelivered,
  updateOrdertoPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminAuth, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOderById);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, adminAuth, updateOrdertoDelivered);
export default router;
