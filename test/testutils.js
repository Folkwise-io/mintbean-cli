const { createProgram } = require('../program');
const tmp = require('tmp');

const switchToTempDir = () => {
  const tempDir = tmp.dirSync();
  process.cwd(tempDir);
}

const generateTestProgram = () => {
  const program = createProgram();
  program.exitOverride();
  return program;
}

module.exports = {
  execute: (...args) => {
    switchToTempDir();
    const program = generateTestProgram();
    program.parse(['node', 'mint', ...args]);
  }
}