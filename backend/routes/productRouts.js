import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
router.route("/").get(getProducts).post(createProduct);
router.get("/top", getTopProducts);
router.route("/:id/reviews").post(createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);



  export default router
