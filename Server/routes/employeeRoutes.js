const express = require("express");
const authorize = require("./authorize");
const employeeControllers = require("./../controllers/employeeControllers");
const router = express.Router();

router.get("/get", authorize("user","admin"), employeeControllers.getEmployees);
router.delete("/delete", authorize("admin"), employeeControllers.deleteEmployee);
router.put("/update", authorize("admin"), employeeControllers.updateEmployee);
router.post("/add", authorize("admin"), employeeControllers.addEmployee);

module.exports = router