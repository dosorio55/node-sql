import express from "express";
import {
  // getAddProduct,
  postAddProduct,
  // getEditProduct,
  // postEditProduct,
  // postDeleteProduct,
} from "../controllers/admin.controller.js";

const router = express.Router();

// /admin/add-product => GET
// router.get("/add-product", getAddProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

// router.get("/edit-product/:productId", getEditProduct);

// router.post("/edit-product", postEditProduct);

// router.post("/delete-product", postDeleteProduct);

export default router;
