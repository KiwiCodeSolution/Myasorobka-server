const Router = require("express");
const router = new Router();
const order_controller = require("../controller/order_conteroller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

router.post("/", ctrlWrapper(order_controller.create_order));
router.get('/', ctrlWrapper(order_controller.get_all_order));
router.get('/:id', ctrlWrapper(order_controller.get_order_by_id));
router.put('/:id', ctrlWrapper(order_controller.update_order));
router.delete('/:id', ctrlWrapper(order_controller.delete_order));
module.exports = router;