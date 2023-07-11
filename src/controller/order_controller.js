const Order = require("../mongoDB/models/Order");
const { NotFound } = require("http-errors");

module.exports.create_order = async (req, res) => {
    const saved_order = await Order.create(req.body);
    res.status(201).json(saved_order);
};

module.exports.get_all_orders = async (req, res) => {
    const orders = await Order.find().populate('products.product');;
    res.status(200).json(orders);
};

// module.exports.get_order_by_id = async (req, res) => {
//     const order = await Order.findById(req.params.id).populate('product.product');;
//     if (!order) {
//         throw new NotFound("order not found");
//     }
//     res.json(order);
// };

module.exports.update_order = async (req, res) => {
    const order_id = req.params.id;
    const updated_order = await Order.findByIdAndUpdate(
        order_id,
        req.body,
        { new: true }
    );
    if (!updated_order) {
        throw new NotFound("order not found");
    }
    res.json(updated_order);
};


module.exports.delete_order = async (req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order) {
        throw new NotFound("order not found");
    }
    res.json({ message: 'Order deleted successfully' });
};


