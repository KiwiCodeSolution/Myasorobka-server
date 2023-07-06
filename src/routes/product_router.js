const Router = require("express");
const router = new Router();
const controller = require("../controller/product_controller");

router.post("/product", controller.create_product);
module.exports = router;