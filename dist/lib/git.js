"use strict";
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
// utils
var generateRemoteLinkSsh = function (username, projectName) {
    return "git@github.com:" + username + "/" + projectName + ".git";
};
var generateRemoteLinkHttps = function (username, projectName) {
    return "https://github.com/" + username + "/" + projectName + ".git";
};
var generateRemoteLink = function (username, projectName, connectionType) {
    if (connectionType === 'https') {
        return generateRemoteLinkHttps(username, projectName);
    }
    else {
        return generateRemoteLinkSsh(username, projectName);
    }
};
// Native actions
var init = function () {
    shell.exec('git init');
};
var addRemote = function (name, remote) {
    shell.exec("git remote add " + name + " " + remote);
};
var removeRemote = function (name) {
    shell.exec("git remote remove " + name);
};
var addSubtree = function (subtree) {
    shell.exec("git add " + subtree + " && git commit -m \"initial " + subtree + " subtree commit\"");
};
var addCommitPushMaster = function (commitMsg) {
    shell.exec("git add . && git commit -m \"" + commitMsg + "\" && git push origin master", { silent: true });
};
// used mainly for pushing to gh-pages branch
var pushSubtreeToOrigin = function (subtree, branch) {
    if (branchDoesExistAtOrigin('gh-pages')) {
        console.log('gh-pages already exists at origin');
    }
    shell.exec("git subtree push --prefix " + subtree + " origin " + branch);
};
// Custom actions
var createOrOverrideRemoteOrigin = function (username, projectName, connectionType) {
    // git init if needed
    if (!hasGitInitialized()) {
        console.log(chalk.cyanBright('Intializing git...'));
        init();
    }
    // check remotes for existing origin, remove if present
    if (hasRemoteOrigin()) {
        removeRemote('origin');
    }
    // create new remote origin connection
    var remote = generateRemoteLink(username, projectName, connectionType);
    addRemote('origin', remote);
    console.log(chalk.cyanBright("Updated remote connection for 'origin':"));
    console.log(getRemotes());
};
// Viewers
var getRemotes = function () {
    var stdout = shell.exec('git remote -v', { silent: true }).stdout;
    return stdout;
};
var hasGitInitialized = function () {
    return fs.existsSync(path.join(process.cwd(), '.git'));
};
var branchDoesExistAtOrigin = function (branch) {
    var code = shell.exec("git ls-remote --exit-code origin \"refs/heads/" + branch + "\"", { silent: true }).code;
    return code === 0;
};
var hasRemoteOrigin = function () {
    var output = getRemotes();
    var pattern = /^origin\s/m;
    return pattern.test(output);
};
module.exports = {
    init: init,
    createOrOverrideRemoteOrigin: createOrOverrideRemoteOrigin,
    branchDoesExistAtOrigin: branchDoesExistAtOrigin,
    pushSubtreeToOrigin: pushSubtreeToOrigin,
    addCommitPushMaster: addCommitPushMaster,
    getRemotes: getRemotes,
    hasGitInitialized: hasGitInitialized,
    hasRemoteOrigin: hasRemoteOrigin
};
