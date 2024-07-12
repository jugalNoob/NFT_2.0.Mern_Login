const express = require("express");
const router = new express.Router();
const controllers=require("../controollers/userControllers")
router.get("/home/jugal", controllers.first);
router.post("/signin",controllers.form )
router.post("/signup",controllers.login )
module.exports = router;