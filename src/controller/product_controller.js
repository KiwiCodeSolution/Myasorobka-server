const product_model = require("../mongoDB/models/Product");


module.exports.create_product = async (req, res) => {
    try {
        const product = {
            category,
            discount_price,
            name_of_product,
            price,
            unit,
            available,
            description,
            favourite,
            img
        } = req.body;
        const new_product = new product_model({ ...product });
        const saved_product = await new_product.save();
        res.status(201).json(saved_product);

    } catch (error) {
        console.log(error)
    }
};

