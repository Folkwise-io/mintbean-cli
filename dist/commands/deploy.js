"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
var chalk_1 = __importDefault(require("chalk"));
var shelljs_1 = __importDefault(require("shelljs"));
var connect_1 = require("./connect");
var git_1 = require("../lib/git");
var files_1 = require("../lib/files");
exports.deploy = function () {
    if (!git_1.hasRemoteOrigin()) {
        connect_1.connect();
    }
    var packageDotJson = files_1.parsePackageDotJson();
    if (!packageDotJson) {
        console.log(chalk_1.default.red("No package.json found. Are you in the project root directory?"));
        return false;
    }
    if (!packageDotJson.mintbean) {
        console.log(chalk_1.default.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
        return false;
    }
    if (packageDotJson.mintbean.scripts) {
        var homepage = packageDotJson.mintbean.homepage;
        var _a = packageDotJson.mintbean.scripts, predeploy = _a.predeploy, deploy_1 = _a.deploy;
        if (!predeploy && !deploy_1) {
            console.log(chalk_1.default.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
            return false;
        }
        if (predeploy) {
            console.log(chalk_1.default.cyanBright("Preparing build for deploy..."));
            shelljs_1.default.exec(predeploy);
        }
        if (deploy_1) {
            console.log(chalk_1.default.cyanBright("Deploying..."));
            shelljs_1.default.exec(deploy_1);
            if (homepage) {
                console.log(chalk_1.default.cyanBright("Deployed to"), chalk_1.default.bold.cyanBright("" + homepage));
            }
            console.log("(allow a minute or two for deploy to propagate...)");
        }
    }
    else {
        console.log(chalk_1.default.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'));
    }
};
