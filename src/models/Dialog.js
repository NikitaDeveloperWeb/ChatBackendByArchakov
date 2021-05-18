"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var DialogSchema = new mongoose_1.Schema({
    partner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: mongoose_1.Schema.Types.ObjectId, ref: "Message" },
}, {
    timestamps: true,
});
var DialogModel = mongoose_1.default.model("Dialog", DialogSchema);
exports.default = DialogModel;
