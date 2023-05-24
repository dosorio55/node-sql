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
    const userCart = await req.user.populate("cart.items.productId");

    return res.status(200).json(userCart);
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (req, res) => {
  const { user } = req;
  const { reqProductId } = req.body;
  try {
    const productToAdd = await Product.findById(reqProductId);

    let existentProductIndex = -1;
    if (user.cart.items.length > 0) {
      existentProductIndex = user.cart.items.findIndex((item) => {
        // return item.productId === reqProductId;
        // needs to use equals method of mongoose because 
        // that one compared the objectId against the same object id
        // which both are mongoose id type
        return item.productId.equals(reqProductId);
      });
    }

    if (existentProductIndex !== -1) {
      user.cart.items[existentProductIndex].quantity++;
    } else {
      user.cart.items = [
        ...user.cart.items,
        { productId: productToAdd._id, quantity: 1 },
      ];
    }

    await user.save();

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
