const express = require("express");
const router = express.Router();
const controller = require("../controllers/controlcrecimiento.controller");

router.get("/", controller.getControlCrecimiento);
router.post("/create", controller.createControlCrecimiento);
router.put("/:id", controller.updateControlCrecimiento);
router.delete("/:id", controller.deleteControlCrecimiento);

module.exports = router;