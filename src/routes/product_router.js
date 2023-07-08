const Router = require("express");
const router = new Router();
const controller = require("../controller/product_controller");

router.post("/", controller.create_product);
router.get('/', controller.get_all_products);
router.get('/:id', controller.get_product_by_id);
router.put('/:id', controller.update_product);
router.delete('/:id', controller.delete_product);
module.exports = router;