const chalk = require('chalk');
const getConfig = require('../lib/config.js').getConfig;
const setConfig = require('../lib/config.js').setConfig;

const parse = (cmdObj) => {
  if (cmdObj.view) {
    console.log(chalk.cyanBright('Your config:'));
    console.log(`(-g) github username: ${getConfig('github')}`);
    console.log(`(-t) token: ${getConfig('token') ? '<hidden>' : 'undefined'}`);
    return
  }
  if (cmdObj.github) {
    setConfig('github', cmdObj.github)
    console.log(chalk.cyanBright(`Successfully set github username to '${cmdObj.github}'`));
  }
  if (cmdObj.token) {
    setConfig('token', cmdObj.token)
    console.log(chalk.cyanBright(`Successfully set github personal access token.`));
  }
}

module.exports = {
  parse,
}
