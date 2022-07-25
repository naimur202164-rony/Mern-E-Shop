import express from "express";
const router = express.Router();
import {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductById,
} from "../controllers/productController";

router.route("/").get(getAllProduct).post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
