"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var MessageController = /** @class */ (function () {
    function MessageController(io) {
        var _this = this;
        this.updateReadStatus = function (res, userId, dialogId) {
            models_1.MessageModel.updateMany({ dialog: dialogId, user: { $ne: userId } }, { $set: { read: true } }, function (err) {
                if (err) {
                    res.status(500).json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    _this.io.emit("SERVER:MESSAGES_READED", {
                        userId: userId,
                        dialogId: dialogId,
                    });
                }
            });
        };
        this.index = function (req, res) {
            var dialogId = req.query.dialog;
            var userId = req.user._id;
            _this.updateReadStatus(res, userId, dialogId);
            models_1.MessageModel.find({ dialog: dialogId })
                .populate(["dialog", "user", "attachments"])
                .exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        status: "error",
                        message: "Messages not found",
                    });
                }
                res.json(messages);
            });
        };
        this.create = function (req, res) {
            var userId = req.user._id;
            var postData = {
                text: req.body.text,
                dialog: req.body.dialog_id,
                attachments: req.body.attachments,
                user: userId,
            };
            var message = new models_1.MessageModel(postData);
            _this.updateReadStatus(res, userId, req.body.dialog_id);
            message
                .save()
                .then(function (obj) {
                obj.populate("dialog user attachments", function (err, message) {
                    if (err) {
                        return res.status(500).json({
                            status: "error",
                            message: err,
                        });
                    }
                    models_1.DialogModel.findOneAndUpdate({ _id: postData.dialog }, { lastMessage: message._id }, { upsert: true }, function (err) {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                    });
                    res.json(message);
                    _this.io.emit("SERVER:NEW_MESSAGE", message);
                });
            })
                .catch(function (reason) {
                res.json(reason);
            });
        };
        this.delete = function (req, res) {
            var id = req.query.id;
            var userId = req.user._id;
            models_1.MessageModel.findById(id, function (err, message) {
                if (err || !message) {
                    return res.status(404).json({
                        status: "error",
                        message: "Message not found",
                    });
                }
                if (message.user.toString() === userId) {
                    var dialogId_1 = message.dialog;
                    message.remove();
                    models_1.MessageModel.findOne({ dialog: dialogId_1 }, {}, { sort: { created_at: -1 } }, function (err, lastMessage) {
                        if (err) {
                            res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                        models_1.DialogModel.findById(dialogId_1, function (err, dialog) {
                            if (err) {
                                res.status(500).json({
                                    status: "error",
                                    message: err,
                                });
                            }
                            if (!dialog) {
                                return res.status(404).json({
                                    status: "not found",
                                    message: err,
                                });
                            }
                            dialog.lastMessage = lastMessage ? lastMessage.toString() : "";
                            dialog.save();
                        });
                    });
                    return res.json({
                        status: "success",
                        message: "Message deleted",
                    });
                }
                else {
                    return res.status(403).json({
                        status: "error",
                        message: "Not have permission",
                    });
                }
            });
        };
        this.io = io;
    }
    return MessageController;
}());
exports.default = MessageController;
