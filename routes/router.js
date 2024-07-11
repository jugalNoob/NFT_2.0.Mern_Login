 const express = require("express");
const router = new express.Router();

const control=require('../controollers/userControllers')

router.get("/", control.first);
router.post('/form' , control.form)
router.post('/login' , control.login)
module.exports = router;