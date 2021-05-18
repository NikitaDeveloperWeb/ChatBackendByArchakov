"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var lodash_1 = require("lodash");
exports.default = (function (user) {
    var token = jsonwebtoken_1.default.sign({
        data: lodash_1.reduce(user, function (result, value, key) {
            if (key !== "password") {
                result[key] = value;
            }
            return result;
        }, {}),
    }, process.env.JWT_SECRET || "", {
        expiresIn: process.env.JWT_MAX_AGE,
        algorithm: "HS256",
    });
    return token;
});
