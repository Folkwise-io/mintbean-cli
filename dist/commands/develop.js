"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.develop = void 0;
var chalk_1 = __importDefault(require("chalk"));
var shelljs_1 = __importDefault(require("shelljs"));
var files = __importStar(require("../lib/files"));
exports.develop = function () {
    var PKG = files.parsePackageDotJson();
    var developScript = (((PKG || {}).mintbean || {}).scripts || {}).develop;
    if (developScript) {
        console.log(chalk_1.default.cyanBright("Starting development server with hot reloading..."));
        shelljs_1.default.exec(developScript);
    }
    else {
        console.log(chalk_1.default.red('Error: no script called "develop" found in package.json > mintbean> scripts'));
        return false;
    }
};
