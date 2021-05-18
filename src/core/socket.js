"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
exports.default = (function (http) {
    var io = socket_io_1.default(http);
    io.on('connection', function (socket) {
        socket.on('DIALOGS:JOIN', function (dialogId) {
            socket.dialogId = dialogId;
            socket.join(dialogId);
        });
        socket.on('DIALOGS:TYPING', function (obj) {
            socket.broadcast.emit('DIALOGS:TYPING', obj);
        });
    });
    return io;
});
