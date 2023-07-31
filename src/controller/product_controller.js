const Product_model = require("../mongoDB/models/Product");
const Gallery_model = require("../mongoDB/models/Gallery");
const { NotFound, Conflict } = require("http-errors");
const fs = require("fs");
const path = require("path");
const { baseServerUrl } = require("../config/urlConfig.json");

const deleteOldImage = (oldImage) => {
     const lastImageName = oldImage.split("uploads")[1];
    const oldImagePath = path.join(__dirname, "../../", "uploads", lastImageName)
    // console.log("old image path:", oldImagePath);
    try {
        fs.unlink(oldImagePath, function (err) {
            // if (err) {
            //     console.log("err);
            // } else {
            //     console.log("old file deleted")
            // }
        })
    }
    catch (err) {
        console.log(err);
    };
}

module.exports.create_product = async (req, res) => {
  const existingProduct = await Product_model.findOne({ name: req.body.name });
  if (existingProduct) {
    throw new Conflict("Продукт з такою назвою вже існує");
  }
  const saved_product = await Product_model.create(req.body);
  if (saved_product.img) {
    const image = await Gallery_model.findOne({ img_url: saved_product.img });
    if (image) {
      image.product_id = saved_product._id;
      await image.save();
      console.log(`Привязка прошла успешно: ${image}`);
    } else {
      console.log(`Изображение с адресом ${saved_product.img} не найдено.`);
    }
  }
  res.status(201).json(saved_product);
};

module.exports.get_all_products = async (req, res) => {
  const products = await Product_model.find();
  res.status(200).json(products);
};

module.exports.update_product = async (req, res) => {
    const productId = req.params.id;
    const { body, file } = req;
    const product = JSON.parse(body.product);

    if (file) {
        const oldImage = product.img;

        if (oldImage) deleteOldImage(oldImage);
        product.img = baseServerUrl + file.path;
    }

  const updated_product = await Product_model.findByIdAndUpdate(
    productId,
    { ...product },
    { new: true }
  );

  if (!updated_product) {
    throw new NotFound("product not found");
  }

  res.json({ data: updated_product, message: "updated successfully" });
};

module.exports.delete_product = async (req, res) => {
  const product = await Product_model.findByIdAndRemove(req.params.id);

  if (!product) {
    throw new NotFound("product not found");
  } else { deleteOldImage(product.img)}
  res.json({ message: "Product deleted successfully" });
};
