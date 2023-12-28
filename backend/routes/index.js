const express = require("express");
const { taskController } = require("../controllers");
const router = express.Router();

router.post("/tasks", taskController.create);
router.get("/tasks", taskController.getAll);
router.get("/tasks/:id", taskController.single);
router.delete("/tasks/:id", taskController.destroy);
router.patch("/tasks/:id", taskController.update);

module.exports = router;
