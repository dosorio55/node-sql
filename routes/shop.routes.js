import express from "express";
import {
  getProducts,
  getProduct,
  getCart,
  addProductToCart,
  submitOrder,
  getOrders,
  // getCart,
  // postCart,
  // postCartDeleteProduct,
  // getOrders,
  // getCheckout,
} from "../controllers/shop.controller.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/get-cart", getCart);

router.post("/add-product", addProductToCart);

router.get("/send-order", submitOrder);

router.get("/get-order", getOrders);

export default router;
