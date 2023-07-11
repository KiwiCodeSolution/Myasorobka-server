
const { Schema, model } = require("mongoose");

const Product_schema = new Schema({
    category: { type: String, required: true },
    discount_price: { type: Number },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    unit: { type: String },
    available: { type: Boolean },
    description: { type: String },
    favourite: { type: Boolean },
    img: { type: String },
    archive: { type: Boolean, required: true }
});

module.exports = model("Product", Product_schema);