const jwt = require('jsonwebtoken')

exports.checklogin = function (req, res, next) {
    if (req.session) {


        const { access_token } = req.session

        if (access_token) {
            jwt.verify(access_token,
                process.env.JWT_SECRET_KEY,
                function (err, decoded) {
                    if (err) {
                        res.redirect("/login");
                    } else {
                        req.isLoggedIn=true
                        next()
                    }
                });
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
}