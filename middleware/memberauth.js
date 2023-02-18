
const jwt = require("jsonwebtoken");

exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, "ankan23233387", (err, data) => {
            req.member = data
            next()
        })
    } else {
        next()
    }
}