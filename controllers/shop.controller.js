import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import path from "path";

export const getProducts = async (req, res, next) => {
  try {
    if (req.session.isLoggedin) {
      const products = await Product.find();
      return res.status(200).json(products);
    } else {
      res.status(500).send("no session found please login");
    }
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const resProduct = await Product.findById(prodId);
    return res.status(200).json(resProduct);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userCart = await req.user.populate("cart.items.productId");

    return res.status(200).json({ cart: userCart.cart.items });
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
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
    next(error);
  }
};

export const submitOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const { cart } = await user.populate("cart.items.productId");

    const order = new Order({ products: cart.items, userId: user._id });
    const savedOrder = await order.save();

    user.cart.items = [];
    await user.save();

    return res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });

    if (!orders) {
      return res.status(404).send("No orders found for this user");
    }

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
   const order = await Order.findById({ userId: req.user._id });

    if (!order) {
      return res.status(404).send("No orders found for this user");
    }

    const invoiceName = `invoice-${order._id}.pdf`;
    const invoicePath = path.join("data", "invoices", invoiceName);
    
  } catch (error) {
    next(error);
  }
};
