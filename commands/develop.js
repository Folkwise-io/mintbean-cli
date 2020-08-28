const chalk = require('chalk');
const shell = require('shelljs');
const files = require('../lib/files');

module.exports = {
  develop: () => {
    shell.exec('npm run start');
  }
}
