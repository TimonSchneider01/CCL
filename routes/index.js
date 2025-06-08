const express = require("express");
const req = require("express/lib/request");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Hello World! This is a test!")
});



module.exports = router;