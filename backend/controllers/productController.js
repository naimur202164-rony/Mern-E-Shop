import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// Geting all Products
const getProduct = asyncHandler(async (req, res) => {
  // Page Sige
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $option: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // Throw New Error
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
