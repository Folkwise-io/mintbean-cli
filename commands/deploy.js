const chalk = require('chalk');
const npm = require('../lib/npm');
const connect = require('./connect').connect;
const hasRemoteOrigin = require('../lib/git').hasRemoteOrigin;

const deploy = () => {
  if(!hasRemoteOrigin()) {
    connect();
  }
  const err = npm.run('deploy');
  if (err) {
    console.log(chalk.red('Error. Have you created a GitHub repo yet?'))
    console.log(chalk.red("Run 'mint r -c' to create new repo with project name then try 'mint deploy'"))
  }
}

module.exports = {
  deploy,
}
