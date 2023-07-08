const Router = require("express");
const router = new Router();
const order_controller = require("../controller/order_conteroller");

router.post("/", order_controller.create_order);
router.get('/', order_controller.get_all_order);
router.get('/:id', order_controller.get_order_by_id);
router.put('/:id', order_controller.update_order);
router.delete('/:id', order_controller.delete_order);
module.exports = router;