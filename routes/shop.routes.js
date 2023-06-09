import express from "express";
import {
  getProducts,
  getProduct,
  getCart,
  addProductToCart,
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


// router.get("/cart", getCart);

// router.post("/cart", postCart);

// router.post("/cart-delete-item", postCartDeleteProduct);

// router.get("/orders", getOrders);

// router.get("/checkout", getCheckout);

export default router;
