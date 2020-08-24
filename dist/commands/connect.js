"use strict";
var chalk = require('chalk');
var files = require('../lib/files');
var git = require('../lib/git');
var getConfig = require('../lib/config').getConfig;
var connect = function (username, project, connection, opts) {
    console.log(chalk.cyanBright('Connecting remote origin...'));
    var githubUsername = username || getConfig('github');
    var projectName = project || files.getCurrentDirectoryBase();
    var connectionType = connection || getConfig('connection');
    git.createOrOverrideRemoteOrigin(githubUsername, projectName, connectionType);
    if (!opts.skipInitMsg) {
        console.log(chalk.cyanBright("To make first push:"));
        console.log("git add .");
        console.log("git commit -m \"init\"");
        console.log("git push origin master");
    }
};
module.exports = {
    connect: connect,
};
