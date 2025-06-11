const express = require("express");
const router = express.Router();
const controller = require("../controllers/recomendaciones.controller");

router.get("/", controller.getRecomendacion);
router.post("/create", controller.createRecomendacion);
router.put("/:id", controller.updateRecomendacion);
router.delete("/:id", controller.deleteRecomendacion);

module.exports = router;