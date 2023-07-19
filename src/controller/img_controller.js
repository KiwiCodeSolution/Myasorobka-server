const Product = require('../mongoDB/models/Product');
const multer = require('multer');
const fs = require('fs').promises;

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
    const product_name = req.query.productName;
    console.log(image_url)
    res.json({ image_url });
};


// Метод для удаления изображения по его  старой ссылке


