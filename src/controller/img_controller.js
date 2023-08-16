const Product = require("../mongoDB/models/Product");
const Gallery_model = require("../mongoDB/models/Gallery");
const multer = require("multer");
const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");
const { BadRequest } = require("http-errors");
const { baseServerUrl } = require("../config/urlConfig");

const FILE_MAX_SIZE = 8388608;
const VALID_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const invalidMimeTypesFilter = (req, file, cb) => {
  if (!VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(
      BadRequest(
        `Invalid file mimetype - ${
          file.mimetype
        }. Mimetype must be one of: ${VALID_MIME_TYPES.join(", ")}.`
      )
    );
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: "uploads/", // Папка, куда будут сохраняться загруженные изображения

  filename: (req, file, cb) => {
    const parsedOriginalName = file.originalname.split(".");
    const extention = parsedOriginalName.pop();
    const OriginalNameWithoutExtention = parsedOriginalName.join(".");
    // const currentDate = new Date()
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace(/[-T:/]/g, "");
    // const fileName = `${currentDate}.jpeg`;
    const fileName = `${OriginalNameWithoutExtention}_${Date.now()}.${extention}`;
    cb(null, fileName); // Генерация уникального имени файла
  },
});

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: FILE_MAX_SIZE,
  },
  fileFilter: invalidMimeTypesFilter,
});

module.exports.upload_img = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const resizedImageBuffer = await sharp(req.file.path)
    .resize({ width: 800, height: 600 })
    .toBuffer();
  await fs.writeFile(req.file.path, resizedImageBuffer);

  const img_url = baseServerUrl + req.file.path;
  const image_data = {
    img_url,
    product_id: null,
    used: false,
  };
  const saved_image = await Gallery_model.create(image_data);
  res.json({ img_url });
};
module.exports.get_img = async (req, res) => {
  const imagePath = `uploads/${req.params.img}`;
  // const product = await Product.findOne({ img: imagePath });
  // console.log("product:", product)
  // if (!product || !product.img) {
  //     return res.status(404).json({ error: 'Изображение не найдено' });
  // }
  // const imageBuffer = await fs.readFile(product.img);
  const imageBuffer = await fs.readFile(imagePath);
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  res.end(imageBuffer);
};

// Метод для удаления изображения по его  старой ссылке
