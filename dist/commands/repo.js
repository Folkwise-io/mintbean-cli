"use strict";
var chalk = require('chalk');
var fs = require('fs');
var files = require('../lib/files.js');
var getConfig = require('../lib/config').getConfig;
var git = require('../lib/git');
var github = require('../lib/github');
var connect = require('./connect').connect;
var repo = function (cmdObj) {
    console.log(cmdObj);
    var githubUsername = getConfig('github');
    var githubToken = getConfig('token');
    // return if credentials not set
    var err = github.validateGithubCredentials(githubUsername, githubToken);
    if (err)
        return;
    // create new github repo, add it to remote (origin)
    var projectName = files.getCurrentDirectoryBase();
    var success = github.createRepo(githubUsername, githubToken, projectName);
    if (!success)
        return;
    if (cmdObj.connect) {
        var connectionType = getConfig('connection');
        connect(githubUsername, projectName, connectionType, { skipInitMsg: cmdObj.push ? true : false });
    }
    if (cmdObj.push) {
        git.addCommitPushMaster('Initial commit');
    }
};
module.exports = {
    repo: repo,
};
