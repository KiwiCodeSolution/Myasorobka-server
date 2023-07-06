const { Schema, model } = require("mongoose");

const Product = new Schema({
    category: { type: String, required: true },
    discountPrice: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String },
    available: { type: Boolean },
    description: { type: String },
    favourite: { type: Boolean },
    img: { type: String }
})