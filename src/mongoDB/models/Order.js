const { Schema, model } = require("mongoose");

const Order_schema = new Schema({
    order_date: {
        type: Date, // можно упростить
        required: true,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 3); // Смещение для Киева (UTC+3)
            return now;
        }
    },
    customer_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    delivery_address: { type: String, required: true },
    total_amount: { type: Number, required: true },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        }
    ],
});

module.exports = model("Order", Order_schema);