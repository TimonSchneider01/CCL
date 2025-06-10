const {resolve} = require("node:dns");
const db = require("../services/database").config;

const getMinis = () =>
    new Promise((resolve, reject) => {
        db.query("SELECT * FROM miniatures", (err, results) =>
            err ? reject(err) : resolve(results),
        );
    });


// First we define what values are to be expected within this query
const addMinis = async ({ userId, game, pieces, assembled, colored, minicondi, price, isAuction, image, description }) => {
    // Create a promise that can be resolved or rejected later in the userController
    return new Promise((resolve, reject) => {
        //creating the sql-statement and turn it into a string
        const sql = `
            INSERT INTO miniatures
                (userId, game, pieces, assembled, colored, minicondi, price, isAuction, image, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        // Don't know what that does
        const values = [userId, game, pieces, assembled, colored, minicondi, price, isAuction, image, description];
        // the actual database query, takes the sql, values (for what?) and it can lead to error or result
        db.query(sql, values, (err, result) => {
            if (err) return reject(err); // if an error occurs we want to handle the error
            resolve({ //if it resolves we actually insert the user into the database?
                user_id: result.insertId,
                userId,
                game,
                pieces,
                assembled,
                colored,
                minicondi,
                price,
                isAuction,
                image,
                description
            });
        });
    });
};

module.exports = {
    getMinis,
    addMinis,
}
