"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repo = void 0;
var files = __importStar(require("../lib/files.js"));
var config_1 = require("../lib/config");
var git = __importStar(require("../lib/git"));
var github = __importStar(require("../lib/github"));
var connect_1 = require("./connect");
exports.repo = function (cmdObj) {
    console.log(cmdObj);
    var githubUsername = config_1.getConfig("github");
    var githubToken = config_1.getConfig("token");
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
        var connectionType = config_1.getConfig("connection");
        connect_1.connect(githubUsername, projectName, connectionType, {
            skipInitMsg: cmdObj.push ? true : false,
        });
    }
    if (cmdObj.push) {
        git.addCommitPushMaster("Initial commit");
    }
};
