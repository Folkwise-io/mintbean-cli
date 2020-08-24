"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
exports.banner = function () {
    console.log(chalk_1.default.cyanBright(figlet_1.default.textSync('Mint', { horizontalLayout: 'full' })));
    console.log(chalk_1.default.whiteBright('Let mint do the hard work... you do the coding \n'));
};
