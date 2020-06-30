const shell = require('shelljs');
const chalk = require('chalk');

const run = (cmd) => {
  const { stderr, stdout, code } = shell.exec(`npm run ${cmd}`);
  return stderr
}

module.exports = {
  run,
}
