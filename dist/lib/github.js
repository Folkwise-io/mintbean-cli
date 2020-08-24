"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepo = exports.validateGithubCredentials = void 0;
var shelljs_1 = __importDefault(require("shelljs"));
var chalk_1 = __importDefault(require("chalk"));
// VALIDATIONS
exports.validateGithubCredentials = function (username, token) {
    if (!username || !token) {
        if (!username) {
            console.log(chalk_1.default.red("Missing GitHub username. Add it to config:"));
            console.log("mint config -g <username>");
        }
        if (!token) {
            console.log(chalk_1.default.red("Missing GitHub personal access token. Add it to config:"));
            console.log("mint config -t <token>");
            console.log(chalk_1.default.cyanBright("Create a GitHub personal access token using the link below. Give the token full scopes for 'repo' and 'user'. Copy this token and set it with 'mint config -t <token>' "));
            console.log("https://github.com/settings/tokens");
            console.log(chalk_1.default.red("*Connection type defaults to 'ssh'. You can change this preference to 'https' by running 'mint config -H'"));
        }
        return true;
    }
    return false;
};
var attemptRepoCreation = function (username, token, projectName) {
    return shelljs_1.default.exec("curl -H 'Authorization: token " + token + "' https://api.github.com/user/repos -d '{\"name\":\"" + projectName + "\"}'", { silent: true });
};
// Actions
exports.createRepo = function (username, token, projectName) {
    var output = attemptRepoCreation(username, token, projectName);
    var curlErr = JSON.parse(output).message;
    if (curlErr) {
        console.log(chalk_1.default.red("error: " + curlErr));
        return false;
    }
    console.log(chalk_1.default.cyanBright("Successfully created repo at '" + username + "/" + projectName + "'"));
    return true;
};
