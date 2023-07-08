const Order = require("../mongoDB/models/Order");


module.exports.create_order = async (req, res) => {
    try {
        const order = {
            order_date,
            customer,
            phone_number,
            delivery_address,
            total_amount,
            product
        } = req.body;

        const new_order = new Order({ ...order });
        const saved_order = await new_order.save();
        res.status(201).json(saved_order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


module.exports.get_all_order = async (req, res) => {
    try {
        const orders = await Order.find().populate('product.product');;
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

module.exports.get_order_by_id = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product.product');;
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

module.exports.update_order = async (req, res) => {
    try {
        const order = {
            order_date,
            customer,
            phone_number,
            delivery_address,
            total_amount,
            product
        } = req.body;
        const order_id = req.params.id;
        const updated_order = await Order.findByIdAndUpdate(
            order_id,
            { ...order },
            { new: true }
        );

        if (!updated_order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updated_order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};


module.exports.delete_order = async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};


