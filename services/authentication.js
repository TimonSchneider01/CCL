const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const bcrypt = require('bcrypt');

async function authenticateUser({email, password}, users, res) {

    const user = users.find((u) => {
        return u.email === email;
    })
    if (user && await checkPassword(password, user.password)) {
        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            role: user.role,
        }, ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

        res.cookie('accessToken', accessToken, {httpOnly: true});
        // res.redirect('/users/' + user.user_id);
        res.json({user, accessToken});
    } else {
        res.send('Username or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403);
                next(err);
            }
            console.log(user);
            req.user = user;
            next();
        })
    } else {
        const error = new Error('Unauthorized');
        error.status = 401;
        next(error);
    }
}

async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

module.exports = {
    authenticateUser,
    authenticateJWT,
}

//TODO: Change the JWT to be sent via HEADERS instead of cookies!!!!