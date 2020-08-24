"use strict";
var chalk = require('chalk');
var shell = require('shelljs');
var files = require('../lib/files');
module.exports = {
    develop: function () {
        var PKG = files.parsePackageDotJson();
        var developScript = (((PKG || {}).mintbean || {}).scripts || {}).develop;
        if (developScript) {
            console.log(chalk.cyanBright('Starting development server with hot reloading...'));
            shell.exec(developScript);
        }
        else {
            console.log(chalk.red('Error: no script called "develop" found in package.json > mintbean> scripts'));
            return false;
        }
    }
};
