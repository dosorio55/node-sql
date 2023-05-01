import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

export const getProducts = (req, res) => {
  Product.getAllProducts()
    .then(
      (products) => res.send(products)
      // return res.status(200).json(products);
    )
    .catch((error) => {
      console.log(error);
    });
};

export const getProduct = async (req, res) => {
  const prodId = req.params.productId;
  const resProduct = await Product.getProductById(prodId);
  return res.status(200).json(resProduct);
  // Product.findOne({ where: { id: prodId } })
  //   .then((product) => res.status(200).json(product))
  //   .catch((error) => console.log(error));
};

// export const getIndex = (req, res) => {
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render("shop/index", {
//         prods: rows,
//         pageTitle: "Shop",
//         path: "/",
//       });
//     })
//     .catch((error) => console.log(error));
// };

export const getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

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
