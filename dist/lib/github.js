"use strict";
var shell = require('shelljs');
var chalk = require('chalk');
var git = require('./git');
// VALIDATIONS
var validateGithubCredentials = function (username, token) {
    if (!username || !token) {
        if (!username) {
            console.log(chalk.red("Missing GitHub username. Add it to config:"));
            console.log("mint config -g <username>");
        }
        if (!token) {
            console.log(chalk.red("Missing GitHub personal access token. Add it to config:"));
            console.log("mint config -t <token>");
            console.log(chalk.cyanBright("Create a GitHub personal access token using the link below. Give the token full scopes for 'repo' and 'user'. Copy this token and set it with 'mint config -t <token>' "));
            console.log("https://github.com/settings/tokens");
            console.log(chalk.red("*Connection type defaults to 'ssh'. You can change this preference to 'https' by running 'mint config -H'"));
        }
        return true;
    }
    return false;
};
var attemptRepoCreation = function (username, token, projectName) {
    return shell.exec("curl -H 'Authorization: token " + token + "' https://api.github.com/user/repos -d '{\"name\":\"" + projectName + "\"}'", { silent: true });
};
// Actions
var createRepo = function (username, token, projectName) {
    var output = attemptRepoCreation(username, token, projectName);
    var curlErr = JSON.parse(output).message;
    if (curlErr) {
        console.log(chalk.red("error: " + curlErr));
        return false;
    }
    console.log(chalk.cyanBright("Successfully created repo at '" + username + "/" + projectName + "'"));
    return true;
};
module.exports = {
    validateGithubCredentials: validateGithubCredentials,
    createRepo: createRepo,
};
