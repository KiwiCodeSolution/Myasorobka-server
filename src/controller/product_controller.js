const Product_model = require("../mongoDB/models/Product");
const { NotFound } = require("http-errors");

module.exports.create_product = async (req, res) => {
    const new_product = new Product_model({ ...req.body });
    const saved_product = await new_product.save();
    res.status(201).json(saved_product);
};

module.exports.get_all_products = async (req, res) => {
    const products = await Product_model.find();
    res.status(200).json(products);
};

module.exports.get_product_by_id = async (req, res) => {
    const product = await Product_model.findById(req.params.id);
    if (!product) {
        throw new NotFound("product not found");
    }
    res.json(product);
};

module.exports.update_product = async (req, res) => {

    const productId = req.params.id;
    const updated_product = await Product_model.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
    );
    if (!updated_product) {
        throw new NotFound("product not found");
    }
    res.json(updated_product);

};


module.exports.delete_product = async (req, res) => {
    const product = await Product_model.findByIdAndRemove(req.params.id);
    if (!product) {
        throw new NotFound("product not found");
    }
    res.json({ message: 'Product deleted successfully' });

};