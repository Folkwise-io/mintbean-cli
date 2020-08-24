const shell = require('shelljs');
const chalk = require('chalk');

// this syntax works for both 'yarn' and 'npm'
const installPackagesCmd = (packageManager) => {
  console.log(`${packageManager} install`);
  return `${packageManager} install`
}

module.exports = {
  installPackagesCmd,
}
