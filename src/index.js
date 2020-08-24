const { createProgram } = require("./program.js");
function cli(args) {
    const program = createProgram();
    program.parse(args);
}

module.exports = {
  cli: cli,
};