const miniature = require("../models/miniatureModel");
const fs = require("fs");
const path = require("path");


function getMinis(req, res, next) {
    miniature.getMinis()
        .then((minis) => res.json({minis}))
        .catch((err) => {
            res.status(500);
            next(err);
        });
}

async function postMinis(req, res, next) {
    try {
        const mini = await miniature.addMinis({...req.body});
        // res.redirect(`/users/${user.user_id}`);
        res.send(mini);
    } catch (err) {
        res.send("The query failed with error: " + err);
    }
}

module.exports = {
    postMinis,
    getMinis,
}
