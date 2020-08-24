import { createProgram } from "./program";
function cli(args:string[]) {
    const program = createProgram();
    program.parse(args);
}

module.exports = {
  cli: cli,
};