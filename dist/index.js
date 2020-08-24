"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program_1 = require("./program");
function cli(args) {
    var program = program_1.createProgram();
    program.parse(args);
}
module.exports = {
    cli: cli,
};
