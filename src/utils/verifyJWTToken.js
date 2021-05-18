"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", function (err, decodedData) {
            if (err || !decodedData) {
                return reject(err);
            }
            resolve(decodedData);
        });
    });
});
