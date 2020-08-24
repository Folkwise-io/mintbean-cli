const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require("shelljs");
const git = require('../lib/git');

module.exports = {
  initialize: () => {
    if(git.hasGitInitialized()) {
      console.log(chalk.red('git already initialized in this project. Aborting'))
      return false;
    }
    git.init()
  }
}
