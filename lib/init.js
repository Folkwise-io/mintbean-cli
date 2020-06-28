const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

module.exports = {
  initialize: () => {
    if(fs.existsSync(path.join(process.cwd(), '.git'))) {
      console.log(chalk.red('git already initialized in this project. Aborting'))
      return false;
    }
    shell.exec('git init')
  }
}
