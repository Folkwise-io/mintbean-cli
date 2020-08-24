"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var chalk_1 = __importDefault(require("chalk"));
var config_js_1 = require("../lib/config.js");
var config_js_2 = require("../lib/config.js");
exports.config = function (cmdObj) {
    // return if choosing multiple connection types simultaneously
    if (cmdObj.ssh && cmdObj.https) {
        console.log(chalk_1.default.red("Nooo! Choose only one connection type: ssh (-S) OR https (-H). Try again."));
        return false;
    }
    if (cmdObj.view || cmdObj.parent.args.length === 1) {
        console.log(chalk_1.default.cyanBright("Your current config:"));
        console.log("github username:  " + config_js_1.getConfig("github"));
        console.log("token:            " + (config_js_1.getConfig("token") ? "<hidden>" : "undefined"));
        console.log("connection type:  " + (config_js_1.getConfig("connection") ? config_js_1.getConfig("connection") : "undefined"));
        console.log(chalk_1.default.cyanBright("Run 'mint config -h' to learn how to update preferences"));
        return true;
    }
    if (cmdObj.github) {
        config_js_2.setConfig("github", cmdObj.github);
        console.log(chalk_1.default.cyanBright("Successfully set github username to '" + cmdObj.github + "'"));
    }
    if (cmdObj.token) {
        config_js_2.setConfig("token", cmdObj.token);
        console.log(chalk_1.default.cyanBright("Successfully set github personal access token."));
    }
    if (cmdObj.ssh) {
        config_js_2.setConfig("connection", "ssh");
        console.log(chalk_1.default.cyanBright("Successfully set github connection type to ssh."));
    }
    if (cmdObj.https) {
        config_js_2.setConfig("connection", "https");
        console.log(chalk_1.default.cyanBright("Successfully set github connection type to https."));
    }
};
