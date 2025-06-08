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

async function addUser(req, res, next) {
    try {
        const user = await userModel.registerUser({...req.body});
        // res.redirect(`/users/${user.user_id}`);
        res.send(user);
    } catch (err) {
        res.send("The query failed with error: " + err);
    }
}

module.exports = {
    getUsers,
    addUser,
}