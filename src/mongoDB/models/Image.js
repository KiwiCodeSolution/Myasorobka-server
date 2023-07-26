const { Schema, model } = require("mongoose");

const Image_schema = new Schema({
    img_url: { type: String, required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", default: null },
    used: { type: Boolean, required: true },


});

module.exports = model("Image", Image_schema);