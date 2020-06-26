const { createProgram } = require('../program');
const fs = require('fs');
const tmp = require('tmp');
const path = require('path');

const switchToTempDir = () => {
  const tempDir = tmp.dirSync();
  process.chdir(tempDir.name);
  return process.cwd();
}

const generateTestProgram = () => {
  const program = createProgram();
  program.exitOverride();
  return program;
}

const stat = (...filepaths) => fs.statSync(path.join(...filepaths))

module.exports = {
  execute: (...args) => {
    const dir = switchToTempDir();
    const program = generateTestProgram();
    program.parse(['node', 'mint', ...args]);
    return dir;
  },
  isFile: (...filepaths) => stat(...filepaths).isFile(),
  isDirectory: (...filepaths) => stat(...filepaths).isDirectory()
}