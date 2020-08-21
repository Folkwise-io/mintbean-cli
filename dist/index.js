"use strict";
var createProgram = require("./program.js").createProgram;
function cli(args) {
    var program = createProgram();
    program.parse(args);
}
module.exports = {
    cli: cli,
};
