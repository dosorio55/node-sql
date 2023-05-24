import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;

// import { ObjectId } from "mongodb";
// import { getDb } from "../util/database.js";

// class Product {
//   constructor(title, price, imageURL, description) {
//     this.title = title;
//     this.price = price;
//     this.imageURL = imageURL;
//     this.description = description;
//   }

//   async saveProduct() {
//     try {
//       const db = getDb();
//       const result = await db.collection("products").insertOne(this);
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async editProduct(product, dataObject) {
//     const db = getDb();
//     return await db
//       .collection("products")
//       .updateOne(product, { $set: { ...product, ...dataObject } });
//   }

//   static async getAllProducts() {
//     try {
//       const db = getDb();
//       return await db.collection("products").find().toArray();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async getProductById(prodId) {
//     const db = getDb();

//     return await db
//       .collection("products")
//       .findOne({ _id: new ObjectId(prodId) });
//   }
// }

// export default Product;
