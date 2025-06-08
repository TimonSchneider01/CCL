const {resolve} = require("node:dns");
const db = require("../services/database").config;
// const bcrypt = require("bcrypt");

const getUsers = () =>
    new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, results) =>
            err ? reject(err) : resolve(results),
        );
    });

module.exports = {
    getUsers,
}