const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

// Public: list all users
router.get("/", ctrl.getUsers);


module.exports = router;