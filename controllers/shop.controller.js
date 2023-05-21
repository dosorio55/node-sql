import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getProducts = async (req, res) => {
  try {
    if (req.session.isLoggedin) {
      const products = await Product.find();
      return res.status(200).json(products);
    } else {
      res.status(500).send("no session found please login");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProduct = async (req, res) => {
  const prodId = req.params.productId;
  try {
    const resProduct = await Product.findById(prodId);
    return res.status(200).json(resProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCart = async (req, res) => {
  try {
    // const userCart = await User.findById(req.user._id).select("cart -_id");

    const userCart = await User.findById(req.user._id);
    // const userCart = user.select("cart -_id");

    return res.status(200).json(userCart);
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (req, res) => {
  const { user } = req;
  const { productId } = req.body;
  try {
    const productToAdd = await Product.findById(productId);
    user.cart.items = [...user.cart.items, {productId: productToAdd._id}];
    // const user = await User.findById(userId);

    user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

// export const postCart = (req, res) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect("/cart");
// };

// export const postCartDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

export const getOrders = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
