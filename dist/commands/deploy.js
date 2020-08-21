"use strict";
var chalk = require('chalk');
var shell = require('shelljs');
var connect = require('./connect').connect;
var hasRemoteOrigin = require('../lib/git').hasRemoteOrigin;
var parsePackageDotJson = require('../lib/files').parsePackageDotJson;
var deploy = function () {
    if (!hasRemoteOrigin()) {
        connect();
    }
    var packageDotJson = parsePackageDotJson();
    if (!packageDotJson) {
        console.log(chalk.red('No package.json found. Are you in the project root directory?'));
        return false;
    }
    if (!packageDotJson.mintbean) {
        console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
        return false;
    }
    if (packageDotJson.mintbean.scripts) {
        var homepage = packageDotJson.mintbean.homepage;
        var _a = packageDotJson.mintbean.scripts, predeploy = _a.predeploy, deploy_1 = _a.deploy;
        if (!predeploy && !deploy_1) {
            console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
            return false;
        }
        if (predeploy) {
            console.log(chalk.cyanBright('Preparing build for deploy...'));
            shell.exec(predeploy);
        }
        if (deploy_1) {
            console.log(chalk.cyanBright('Deploying...'));
            shell.exec(deploy_1);
            if (homepage) {
                console.log(chalk.cyanBright("Deployed to"), chalk.bold.cyanBright("" + homepage));
            }
            console.log('(allow a minute or two for deploy to propogate...)');
        }
    }
    else {
        console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
    }
};
module.exports = {
    deploy: deploy,
};
