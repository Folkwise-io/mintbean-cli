const shell = require('shelljs');

const run = (cmd) => {
  shell.exec(`npm run ${cmd}`);
}

module.exports = {
  run,
}
