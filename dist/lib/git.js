"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRemoteOrigin = exports.branchDoesExistAtOrigin = exports.hasGitInitialized = exports.getRemotes = exports.createOrOverrideRemoteOrigin = exports.pushSubtreeToOrigin = exports.addCommitPushMaster = exports.init = void 0;
var shelljs_1 = __importDefault(require("shelljs"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
// utils
var generateRemoteLinkSsh = function (username, projectName) {
    return "git@github.com:" + username + "/" + projectName + ".git";
};
var generateRemoteLinkHttps = function (username, projectName) {
    return "https://github.com/" + username + "/" + projectName + ".git";
};
var generateRemoteLink = function (username, projectName, connectionType) {
    if (connectionType === "https") {
        return generateRemoteLinkHttps(username, projectName);
    }
    else {
        return generateRemoteLinkSsh(username, projectName);
    }
};
// Native actions
exports.init = function () {
    shelljs_1.default.exec("git init");
};
var addRemote = function (name, remote) {
    shelljs_1.default.exec("git remote add " + name + " " + remote);
};
var removeRemote = function (name) {
    shelljs_1.default.exec("git remote remove " + name);
};
var addSubtree = function (subtree) {
    shelljs_1.default.exec("git add " + subtree + " && git commit -m \"initial " + subtree + " subtree commit\"");
};
exports.addCommitPushMaster = function (commitMsg) {
    shelljs_1.default.exec("git add . && git commit -m \"" + commitMsg + "\" && git push origin master", { silent: true });
};
// used mainly for pushing to gh-pages branch
exports.pushSubtreeToOrigin = function (subtree, branch) {
    if (exports.branchDoesExistAtOrigin("gh-pages")) {
        console.log("gh-pages already exists at origin");
    }
    shelljs_1.default.exec("git subtree push --prefix " + subtree + " origin " + branch);
};
// Custom actions
exports.createOrOverrideRemoteOrigin = function (username, projectName, connectionType) {
    // git init if needed
    if (!exports.hasGitInitialized()) {
        console.log(chalk_1.default.cyanBright("Initalizing git..."));
        exports.init();
    }
    // check remotes for existing origin, remove if present
    if (exports.hasRemoteOrigin()) {
        removeRemote("origin");
    }
    // create new remote origin connection
    var remote = generateRemoteLink(username, projectName, connectionType);
    addRemote("origin", remote);
    console.log(chalk_1.default.cyanBright("Updated remote connection for 'origin':"));
    console.log(exports.getRemotes());
};
// Viewers
exports.getRemotes = function () {
    var stdout = shelljs_1.default.exec("git remote -v", { silent: true }).stdout;
    return stdout;
};
exports.hasGitInitialized = function () {
    return fs_1.default.existsSync(path_1.default.join(process.cwd(), ".git"));
};
exports.branchDoesExistAtOrigin = function (branch) {
    var code = shelljs_1.default.exec("git ls-remote --exit-code origin \"refs/heads/" + branch + "\"", {
        silent: true,
    }).code;
    return code === 0;
};
exports.hasRemoteOrigin = function () {
    var output = exports.getRemotes();
    var pattern = /^origin\s/m;
    return pattern.test(output);
};
