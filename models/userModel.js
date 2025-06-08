const {resolve} = require("node:dns");
const db = require("../services/database").config;
const bcrypt = require("bcrypt");

const getUsers = () =>
    new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, results) =>
            err ? reject(err) : resolve(results),
        );
    });


// First we define what values are to be expected within this query
const registerUser = async ({ name, surname, username, email, password }) => {
    // Create a promise that can be resolved or rejected later in the userController
    const hash = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        //creating the sql-statement and turn it into a string
        const sql = `
            INSERT INTO users
                (name, surname, username, email, password)
            VALUES (?, ?, ?, ?, ?)
        `;
        // Don't know what that does
        const values = [name, surname, username, email, hash];
        // the actual database query, takes the sql, values (for what?) and it can lead to error or result
        db.query(sql, values, (err, result) => {
            if (err) return reject(err); // if an error occurs we want to handle the error
            resolve({ //if it resolves we actually insert the user into the database?
                user_id: result.insertId, // don't know what this is for
                name,
                surname,
                username,
                email,
                password,
            });
        });
    });
};

module.exports = {
    getUsers,
    registerUser,
}