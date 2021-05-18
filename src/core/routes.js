/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var middlewares_1 = require("../middlewares");
var validations_1 = require("../utils/validations");
var multer_1 = __importDefault(require("./multer"));
var controllers_1 = require("../controllers");
var createRoutes = function (app, io) {
  var UserController = new controllers_1.UserCtrl(io);
  var DialogController = new controllers_1.DialogCtrl(io);
  var MessageController = new controllers_1.MessageCtrl(io);
  var UploadFileController = new controllers_1.UploadFileCtrl();
  app.use(body_parser_1.default.json());
  app.use(middlewares_1.checkAuth);
  app.use(middlewares_1.updateLastSeen);
  app.get("/", function (_, res) {
    res.send("Hello, World!");
  });
  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.post(
    "/user/signup",
    validations_1.registerValidation,
    UserController.create
  );
  app.post("/user/signin", validations_1.loginValidation, UserController.login);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);
  app.get("/dialogs", DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", DialogController.create);
  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.delete("/messages", MessageController.delete);
  app.post(
    "/files",
    multer_1.default.single("file"),
    UploadFileController.create
  );
  app.delete("/files", UploadFileController.delete);
};
exports.default = createRoutes;
