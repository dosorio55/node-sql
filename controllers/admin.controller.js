import Product from "../models/product.js";

// export const getAddProduct = (req, res) => {
//   res.render("admin/edit-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     editing: false,
//   });
// };

export const postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, imageUrl, description )
  product.saveProduct()
  // Product.create({ title, imageUrl, price, description })
    .then((product) => {
      res.send({ message: `correctly saved ${product}` });
    })
    .catch((error) => console.log(error));
};

// export const getEditProduct = (req, res) => {
//   const editMode = req.query.edit;

//   const prodId = req.params.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       res.send({ ...product.dataValues, editMode });
//     })
//     .catch((error) => console.log(error));
// };

// export const postEditProduct = (req, res) => {
//   const { productId: id, title, price, imageUrl, description } = req.body;

//   Product.findByPk(id)
//     .then((product) => {
//       product.title = title;
//       product.price = price;
//       product.description = description;
//       product.imageUrl = imageUrl;
//       return product.save();
//     })
//     .then((product) => res.send(`the product ${product.dataValues.title}`))
//     .catch((error) => console.log(error));
// };

// export const postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((error) => console.log(error));
// };
