import Product from "../models/product.js";

export const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({ title, imageUrl, price, description }).then().catch((error) =>
    console.log(error)
  );
};

export const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

export const postEditProduct = (req, res) => {
  const { productId, title, price, imageUrl, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

export const getProducts = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};

export const postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
