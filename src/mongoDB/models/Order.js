const { Schema, model } = require("mongoose");

const Order_schema = new Schema({
    order_date: { type: Date, required: true },
    customer: { type: String, required: true },
    phone_number: { type: String, required: true },
    delivery_address: { type: String, required: true },
    total_amount: { type: Number, required: true },
    product: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ],

});

module.exports = model("Order", Order_schema);