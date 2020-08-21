"use strict";
var shell = require('shelljs');
var chalk = require('chalk');
// this syntax works for both 'yarn' and 'npm'
var installPackagesCmd = function (packageManager) {
    console.log(packageManager + " install");
    return packageManager + " install";
};
module.exports = {
    installPackagesCmd: installPackagesCmd,
};
