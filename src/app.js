const express = require("express");
const cors = require("cors");
const app = express();
const product_router = require("./routes/product_router");
const order_router = require("./routes/order_router")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Драсьте!");
});
app.use("/auth", (req, res) => {
    console.log("auth");
    res.json({ message: "auth response!", token: 12345 });
});

app.use("/product", product_router);
app.use("/order", order_router);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(async (err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

module.exports = app;