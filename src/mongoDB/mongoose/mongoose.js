const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose
    .connect(process.env.DB_HOST)
    .then(() => {
        console.log("mongodb up");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
