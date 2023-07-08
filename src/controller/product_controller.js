const Product_model = require("../mongoDB/models/Product");


module.exports.create_product = async (req, res) => {
    try {
        const product = {
            category,
            discount_price,
            name,
            price,
            unit,
            available,
            description,
            favourite,
            img
        } = req.body;
        const new_product = new Product_model({ ...product });
        const saved_product = await new_product.save();
        res.status(201).json(saved_product);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

module.exports.get_all_products = async (req, res) => {
    try {
        const products = await Product_model.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


module.exports.get_product_by_id = async (req, res) => {
    try {
        const product = await Product_model.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

module.exports.update_product = async (req, res) => {
    try {
        const old_product = {
            category,
            discount_price,
            name,
            price,
            unit,
            available,
            description,
            favourite,
            img
        } = req.body;
        const productId = req.params.id;
        const updated_product = await Product_model.findByIdAndUpdate(
            productId,
            { ...old_product },
            { new: true }
        );
        if (!updated_product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updated_product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};


module.exports.delete_product = async (req, res) => {
    try {
        const product = await Product_model.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};