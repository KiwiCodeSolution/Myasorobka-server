const Product_model = require("../mongoDB/models/Product");
const Gallery_model = require("../mongoDB/models/Gallery");
const { NotFound, Conflict } = require("http-errors");
const fs = require("fs");
const path = require("path");
const { baseServerUrl } = require("../config/urlConfig.json");

const deleteOldImage = (oldImage) => {
  const lastImageName = oldImage.split("uploads")[1];
  const oldImagePath = path.join(__dirname, "../../", "uploads", lastImageName);
  // console.log("old image path:", oldImagePath);
  try {
    fs.unlink(oldImagePath, function (err) {
      // if (err) {
      //     console.log("err);
      // } else {
      //     console.log("old file deleted")
      // }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.create_product = async (req, res) => {
  const { body, files } = req;

  const newProduct = { ...body };

  const existingProduct = await Product_model.findOne({
    name: newProduct.name,
  });

  if (existingProduct) {
    throw new Conflict("Продукт з такою назвою вже існує");
  }

  if (files.length) {
    newProduct.images = files.map((file) => baseServerUrl + file.path);
  }

  const saved_product = await Product_model.create({ ...newProduct });

  res
    .status(201)
    .json({ product: saved_product, message: "product created successfully" });
};

module.exports.get_all_products = async (req, res) => {
  const products = await (await Product_model.find()).reverse();
  res.status(200).json(products);
};

module.exports.update_product = async (req, res) => {
  const productId = req.params.id;
  const { body, files } = req;
  const productToUpdate = { images: [], ...body };

  if (files.length) {
    files.forEach((file) =>
      productToUpdate.images.push(baseServerUrl + file.path)
    );
  }

  const currentProduct = await Product_model.findById(productId);

  const updated_product = await Product_model.findByIdAndUpdate(
    productId,
    { ...productToUpdate },
    { new: true }
  );

  if (!updated_product) {
    throw new NotFound("product not found");
  }

  if (currentProduct.images) {
    currentProduct.images.forEach((image) => {
      if (!updated_product.images.includes(image)) {
        deleteOldImage(image);
      }
    });
  }

  res.json({ data: updated_product, message: "updated successfully" });
};

module.exports.delete_product = async (req, res) => {
  const product = await Product_model.findByIdAndRemove(req.params.id);

  if (!product) {
    throw new NotFound("product not found");
  } else {
    product.images.forEach((image) => deleteOldImage(image));
  }
  res.json({ message: "Product deleted successfully" });
};
