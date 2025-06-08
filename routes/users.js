const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.get("/", ctrl.getUsers);

router.post("/add", ctrl.addUser);



module.exports = router;