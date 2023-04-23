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
  Product.create({ title, imageUrl, price, description })
    .then((product) => {
      res.send(`correctly saved ${product}`);
    })
    .catch((error) => console.log(error));
};

export const getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  const prodId = req.params.productId;
  Product.findOne({ where: { id: prodId } })
    .then((product) => {
      res.send({ ...product.dataValues, editMode });
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
