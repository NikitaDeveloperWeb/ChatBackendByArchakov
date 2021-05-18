"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = __importDefault(require("../core/cloudinary"));
var models_1 = require("../models");
var UserController = /** @class */ (function () {
    function UserController() {
        this.create = function (req, res) {
            var userId = req.user._id;
            var file = req.file;
            cloudinary_1.default.v2.uploader
                .upload_stream({ resource_type: "auto" }, function (error, result) {
                if (error || !result) {
                    return res.status(500).json({
                        status: "error",
                        message: error || "upload error",
                    });
                }
                var fileData = {
                    filename: result.original_filename,
                    size: result.bytes,
                    ext: result.format,
                    url: result.url,
                    user: userId,
                };
                var uploadFile = new models_1.UploadFileModel(fileData);
                uploadFile
                    .save()
                    .then(function (fileObj) {
                    res.json({
                        status: "success",
                        file: fileObj,
                    });
                })
                    .catch(function (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                });
            })
                .end(file.buffer);
        };
        this.delete = function (req, res) {
            var fileId = req.user._id;
            models_1.UploadFileModel.deleteOne({ _id: fileId }, function (err) {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                });
            });
        };
    }
    return UserController;
}());
exports.default = UserController;
