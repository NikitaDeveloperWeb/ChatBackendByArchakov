"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var validator_1 = require("validator");
var utils_1 = require("../utils");
var difference_in_minutes_1 = __importDefault(require("date-fns/difference_in_minutes"));
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: "Email address is required",
        validate: [validator_1.isEmail, "Invalid email"],
        unique: true,
    },
    fullname: {
        type: String,
        required: "Fullname is required",
    },
    password: {
        type: String,
        required: "Password is required",
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});
UserSchema.virtual("isOnline").get(function () {
    return difference_in_minutes_1.default(new Date().toISOString(), this.last_seen) < 5;
});
UserSchema.set("toJSON", {
    virtuals: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = this;
                    if (!user.isModified("password")) {
                        return [2 /*return*/, next()];
                    }
                    _a = user;
                    return [4 /*yield*/, utils_1.generatePasswordHash(user.password)];
                case 1:
                    _a.password = _c.sent();
                    _b = user;
                    return [4 /*yield*/, utils_1.generatePasswordHash(new Date().toString())];
                case 2:
                    _b.confirm_hash = _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
var UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
