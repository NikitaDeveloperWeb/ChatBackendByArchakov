/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = require("http");
dotenv_1.default.config();
require("./core/db");
var routes_1 = __importDefault(require("./core/routes"));
var socket_1 = __importDefault(require("./core/socket"));
var app = express_1.default();
var http = http_1.createServer(app);
var io = socket_1.default(http);
routes_1.default(app, io);
var PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
http.listen(PORT, function () {
  console.log("Server: http://localhost:" + PORT);
});
