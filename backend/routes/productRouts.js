import express from "express";
const router = express.Router();
import {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductById,
} from "../controllers/productController";

router.route("/").get(getAllProduct).post(createProduct);
router.get("/top", getTopProducts);

router.route("/:id/reviews").post(createProductReview);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
