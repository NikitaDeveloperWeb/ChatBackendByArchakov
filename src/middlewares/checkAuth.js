"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.default = (function (req, res, next) {
    if (req.path === "/user/signin" ||
        req.path === "/user/signup" ||
        req.path === "/user/verify") {
        return next();
    }
    var token = "token" in req.headers ? req.headers.token : null;
    if (token) {
        utils_1.verifyJWTToken(token)
            .then(function (user) {
            if (user) {
                req.user = user.data._doc;
            }
            next();
        })
            .catch(function () {
            res.status(403).json({ message: "Invalid auth token provided." });
        });
    }
});
