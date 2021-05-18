"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var DialogController = /** @class */ (function () {
    function DialogController(io) {
        var _this = this;
        this.index = function (req, res) {
            var userId = req.user._id;
            models_1.DialogModel.find()
                .or([{ author: userId }, { partner: userId }])
                .populate(["author", "partner"])
                .populate({
                path: "lastMessage",
                populate: {
                    path: "user",
                },
            })
                .exec(function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: "Dialogs not found",
                    });
                }
                return res.json(dialogs);
            });
        };
        this.create = function (req, res) {
            var postData = {
                author: req.user._id,
                partner: req.body.partner,
            };
            models_1.DialogModel.findOne({
                author: req.user._id,
                partner: req.body.partner,
            }, function (err, dialog) {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: err,
                    });
                }
                if (dialog) {
                    return res.status(403).json({
                        status: "error",
                        message: "Такой диалог уже есть",
                    });
                }
                else {
                    var dialog_1 = new models_1.DialogModel(postData);
                    dialog_1
                        .save()
                        .then(function (dialogObj) {
                        var message = new models_1.MessageModel({
                            text: req.body.text,
                            user: req.user._id,
                            dialog: dialogObj._id,
                        });
                        message
                            .save()
                            .then(function () {
                            dialogObj.lastMessage = message._id;
                            dialogObj.save().then(function () {
                                res.json(dialogObj);
                                _this.io.emit("SERVER:DIALOG_CREATED", __assign(__assign({}, postData), { dialog: dialogObj }));
                            });
                        })
                            .catch(function (reason) {
                            res.json(reason);
                        });
                    })
                        .catch(function (err) {
                        res.json({
                            status: "error",
                            message: err,
                        });
                    });
                }
            });
        };
        this.delete = function (req, res) {
            var id = req.params.id;
            models_1.DialogModel.findOneAndRemove({ _id: id })
                .then(function (dialog) {
                if (dialog) {
                    res.json({
                        message: "Dialog deleted",
                    });
                }
            })
                .catch(function () {
                res.json({
                    message: "Dialog not found",
                });
            });
        };
        this.io = io;
    }
    return DialogController;
}());
exports.default = DialogController;
