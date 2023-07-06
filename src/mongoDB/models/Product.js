
const { Schema, model } = require("mongoose");

const product_schema = new Schema({
    category: { type: String, required: true },
    discount_price: { type: Number },
    name_of_product: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String },
    available: { type: Boolean },
    description: { type: String },
    favourite: { type: Boolean },
    img: { type: String }
}, { collection: 'product' });

module.exports = model("Product", product_schema);