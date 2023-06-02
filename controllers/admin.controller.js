import Product from "../models/product.model.js";
import NotFoundError from "../util/error.js";

export const postAddProduct = async (req, res, next) => {
  const { title, price, description } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(422).send("No image provided or is not valid");
  }

  const product = new Product({
    title,
    price,
    imageUrl: imageFile.path,
    description,
  });

  try {
    const savedProduct = await product.save();

    return res.send({ message: `correctly saved ${savedProduct}` });
  } catch (error) {
    next(error);
  }
};

// it is necessary to delete the image from the folder /images
// const clearImage = (filePath) => {


export const postEditProduct = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        title: updatedTitle,
        price: updatedPrice,
        imageUrl: updatedImageUrl,
        description: updatedDesc,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    return res.send(`the product ${updatedProduct}`);
  } catch (error) {
    next(error);
  }
};

export const postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: prodId });
    if (deletedProduct) {
      return res.send(deletedProduct);
    } else {
      throw new NotFoundError("No product found with that ID");
    }
  } catch (error) {
    next(error);
  }
};
