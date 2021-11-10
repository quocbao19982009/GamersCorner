import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
// It is a good pratice to send route into a different file so it more managable

// Desc: Fetch all Product
// Route: /api/products
// Access: Public
router.route("/").get(getProducts);
router.route("/top").get(getTopProduct);
// Desc: CREATE Product
// Route:  POST /api/products/
// Access: Private/admin
router.route("/").post(protect, adminAuth, createProduct);

// Desc: Delete Product
// Route: Delete /api/products/:id
// Access: Private/admin

router.route("/:id").delete(protect, adminAuth, deleteProduct);

// Desc: UPDATE Product
// Route:  PUT /api/products/:id
// Access: Private/admin
router.route("/:id").put(protect, adminAuth, updateProduct);

// router.get("/:id", getProductById);
// Desc: Fetch Detail Product
// Route: get /api/products/:id
// Access: Public
router.route("/:id").get(getProductById);
// Desc: Create new reivew for Product
// Route:  POST /api/products/:id/reviews
// Access: Private
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
