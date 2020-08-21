"use strict";
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var git = require('../lib/git');
module.exports = {
    initialize: function () {
        if (git.hasGitInitialized()) {
            console.log(chalk.red('git already initialized in this project. Aborting'));
            return false;
        }
        git.init();
    }
};
