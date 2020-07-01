const chalk = require('chalk');
const shell = require('shelljs');
const files = require('../lib/files');

module.exports = {
  develop: () => {
    const PKG = files.parsePackageDotJson()
    const developScript = (((PKG || {}).mintbean || {}).scripts || {}).develop;
    if(developScript) {
      console.log(chalk.cyanBright('Starting development server with hot reloading...'));
      shell.exec(developScript)
    } else {
      console.log(chalk.red('Error: no script called "develop" found in package.json > mintbean> scripts'));
      return false;
    }
  }
}
