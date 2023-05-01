import { getDb } from "../util/database.js";

class Product {
  constructor(title, price, imageURL, description) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  // saveProduct() {
  //   const db = getDb();
  //   return db
  //     .collection("products")
  //     .insertOne(this)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => console.log(error));
  // }
  async saveProduct() {
    const db = getDb();

    try {
      const result = await db.collection("products").insertOne(this);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Product;
