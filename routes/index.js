const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const authenticationService = require("../services/authentication");
const userModel = require("../models/userModel");


router
    .route("/login")
    .get((req, res) => {
        res.json("login");
    })
    .post((req, res) => {
        userModel
            .getUsers()
            .then((users) => {
                authenticationService.authenticateUser(req.body, users, res);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    });


router.get("/", (req, res) => {
    res.send("Hello World! This is a test!")
});



module.exports = router;