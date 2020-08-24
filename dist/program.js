"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = void 0;
var commander_1 = require("commander");
var config_1 = require("./commands/config");
var new_1 = require("./commands/new");
var deploy_1 = require("./commands/deploy");
var connect_1 = require("./commands/connect");
var init_1 = require("./commands/init");
var repo_1 = require("./commands/repo");
var develop_1 = require("./commands/develop");
var test_1 = require("./commands/test");
// @ts-ignore
var package_json_1 = require("./../package.json");
exports.createProgram = function () {
    var program = new commander_1.Command();
    program.version(package_json_1.version);
    program
        .command("new [project]")
        .alias("n")
        .description("Start new project from template")
        .action(function (project) {
        console.log(project);
        new_1.create.newProject(project);
    });
    program
        .command("deploy")
        .alias("d")
        .description('Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.')
        .action(function () {
        deploy_1.deploy();
    });
    program
        .command("init")
        .description("Alias for 'git init'.")
        .action(function (v) {
        init_1.init();
    });
    program
        .command("repo")
        .alias("r")
        .option("-c, --connect", "Set project's remote origin to new repo")
        .option("-p, --push", "(recommended) Intial add/commit/push of master to new repo")
        .description("Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))")
        .action(function (cmdObj) {
        console.log(cmdObj);
        repo_1.repo(cmdObj);
    });
    program
        .command("connect")
        .alias("c")
        .description("Add or override remote origin with github preferences in config")
        .action(function () {
        connect_1.connect();
    });
    program
        .command("config")
        .description("Set up or view config (Github credentials etc.)")
        .option("-v, --view", "view current config")
        .option("-g, --github <username>", "set github username")
        .option("-t, --token <token>", "set github personal access token")
        .option("-S, --ssh", "set github connection type to ssh")
        .option("-H, --https", "set github connection type to https")
        .action(function (cmdObj) {
        console.log(cmdObj);
        config_1.config(cmdObj);
    });
    program
        .command("develop")
        .alias("dev")
        .description("Start development server to test out your project")
        .action(function () {
        develop_1.develop();
    });
    program
        .command("test")
        .description("[For dev use only]")
        .action(function () {
        test_1.test();
    });
    return program;
};
