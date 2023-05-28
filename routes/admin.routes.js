import express from "express";
import {
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/add-product", postAddProduct);

router.post("/edit-product", postEditProduct);

router.delete("/delete-product", postDeleteProduct);

export default router;
