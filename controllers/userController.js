const userModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");

function getUsers(req, res, next) {
    userModel.getUsers()
        .then((users) => res.json({users}))
        .catch((err) => {
            res.status(500);
            next(err);
        });
}

module.exports = {
    getUsers,
}