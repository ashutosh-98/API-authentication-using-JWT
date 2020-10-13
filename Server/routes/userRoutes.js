const express = require("express");
const userControllers = require("./../controllers/userControllers");

const router = express.Router();

router.get("/authenticate",userControllers.authenticate);

module.exports = router