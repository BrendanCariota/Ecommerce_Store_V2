import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // Empty curly braces will give you everything
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;

// Async Handler is middleware for handeling exceptions inside of async express routes and passing them to express error handlers.
// This prevents us from having to write try catch block in all of our routes
// However we need to create a custom error handler
