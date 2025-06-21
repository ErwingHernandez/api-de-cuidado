const express = require("express");
const router = express.Router();
const controller = require("../controllers/nino.controller");

router.get("/", controller.getNino);
router.get("/:id", controller.getNinoPorUsuario);
router.post("/create", controller.createNino);
router.put("/:id", controller.updateNino);
router.delete("/:id", controller.deleteNino);

module.exports = router;

//685717397852b73f91655e68