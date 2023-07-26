const Product = require('../mongoDB/models/Product');
const Gallery_model = require("../mongoDB/models/Gallery");
const multer = require('multer');
const fs = require('fs').promises;
const sharp = require('sharp');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Папка, куда будут сохраняться загруженные изображения
    },
    filename: (req, file, cb) => {
        const currentDate = new Date().toISOString().slice(0, 19).replace(/[-T:/]/g, "");
        const fileName = `${currentDate}.jpeg`;
        cb(null, fileName); // Генерация уникального имени файла
    },
});
module.exports.upload = multer({ storage });

module.exports.upload_img = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    const image_url = req.file.path;
    const resizedImageBuffer = await sharp(req.file.path).resize({ width: 800, height: 600 }).toBuffer();
    await fs.writeFile(req.file.path, resizedImageBuffer);
    const image_data = {
        img_url: image_url,
        product_id: null,
        used: false,
    };
    const saved_image = await Gallery_model.create(image_data);
    console.log(image_url);
    res.json({ image_url });
};
module.exports.get_img = async (req, res) => {
    const imagePath = `uploads/${req.params.img}`;
    const product = await Product.findOne({ img: imagePath });
    if (!product || !product.img) {
        return res.status(404).json({ error: 'Изображение не найдено' });
    }
    const imageBuffer = await fs.readFile(product.img);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(imageBuffer);

}


// Метод для удаления изображения по его  старой ссылке



