import Product from "../models/product.model.js";

// export const getAddProduct = (req, res) => {
//   res.render("admin/edit-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     editing: false,
//   });
// };

export const postAddProduct = async (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, imageUrl, description);

  try {
    const savedProduct = await product.saveProduct();

    return res.send({ message: `correctly saved ${savedProduct}` });
  } catch (error) {
    console.log(error);
  }
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

export const postEditProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.body.productId);
    const newProduct = req.body;
    delete newProduct.productId;
    if (!product) {
      return res.status(404).send("Product not found");
    }
    // product.title = title;
    // product.price = price;
    // product.description = description;
    // product.imageUrl = imageUrl;

    const updatedProduct = await Product.editProduct(product, newProduct);

    res.send(`the product ${updatedProduct}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// export const postDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//     .then(() => {
//       res.redirect("/admin/products");
//     })
//     .catch((error) => console.log(error));
// };
