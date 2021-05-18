"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
exports.default = (function (req, _, next) {
    if (req.user) {
        models_1.UserModel.findOneAndUpdate({ _id: req.user.id }, {
            last_seen: new Date(),
        }, { new: true });
    }
    next();
});
