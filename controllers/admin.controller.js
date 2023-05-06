import Product from "../models/product.model.js";
import NotFoundError from "../util/error.js";

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

export const postEditProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.body.productId);
    const newProduct = req.body;
    delete newProduct.productId;
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const updatedProduct = await Product.editProduct(product, newProduct);

    return res.send(`the product ${updatedProduct}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const postDeleteProduct = async (req, res) => {
  const prodId = req.body.productId;

  try {
    const result = await Product.deleteById(prodId);
    if (result.deletedCount > 0) {
      return res.status(204).send();
    } else {
      throw new NotFoundError("No product found with that ID");
    }
  } catch (error) {
    // Log the error using a logging library like Winston or Bunyan
    res.status(500).send("Internal server error");
    console.error(error);
  }
};
