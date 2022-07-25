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

// Get all products by id

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete Product

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product Removed Successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

//

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/img/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    rating: 0.0,
    numReviews: 0,
    description: "Sample Text",
  });

  const createdProduct = await product.save();

  res.status(201).json({
    success: true,
    message: "Product Created Successfuly",
    createdProduct,
  });
});

// Update Product

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
