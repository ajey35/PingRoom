"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const wss = new ws_1.WebSocketServer({ port: 8080 });
let cnt = 0;
wss.on("connection", (socket) => {
    cnt++;
    console.log("user #" + cnt + " is connected!");
});
app.get("/", (req, res) => {
    res.json({ msg: "Just Go A Head! Do Whatever You" });
});
app.listen(3000, () => {
    console.log("Express started!!");
});
