const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const Command = require("commander").Command;
const shell = require("shelljs");
const config = require("./commands/config").config;
const create = require("./commands/new");
const deploy = require("./commands/deploy").deploy;
const connect = require("./commands/connect").connect;
const init = require("./commands/init").initialize;
const repo = require("./commands/repo").repo;
const develop = require("./commands/develop").develop;
const test = require("./commands/test").test;
const version = require("./../package.json").version;
const createProgram = function ():void {
    var program = new Command();
    program.version(version);
    program
        .command("new [project]")
        .alias("n")
        .description("Start new project from template")
        .action(function (project: string): void {
        console.log(project);
        create.newProject(project);
    });
    program
        .command("deploy")
        .alias("d")
        .description('Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.')
        .action(function (): void {
        deploy();
    });
    program
        .command("init")
        .description("Alias for 'git init'.")
        .action(function (v:void):void {
        init();
    });
    program
        .command("repo")
        .alias("r")
        .option("-c, --connect", "Set project's remote origin to new repo")
        .option("-p, --push", "(recommended) Intial add/commit/push of master to new repo")
        .description("Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))")
        .action(function (cmdObj):void {
        repo(cmdObj);
    });
    program
        .command("connect")
        .alias("c")
        .description("Add or override remote origin with github preferences in config")
        .action(function () {
        connect();
    });
    program
        .command("config")
        .description("Set up or view config (Github credentials etc.)")
        .option("-v, --view", "view current config")
        .option("-g, --github <username>", "set github username")
        .option("-t, --token <token>", "set github personal access token")
        .option("-S, --ssh", "set github connection type to ssh")
        .option("-H, --https", "set github connection type to https")
        .action(function (cmdObj):void {
        config(cmdObj);
    });
    program
        .command("develop")
        .alias("dev")
        .description("Start development server to test out your project")
        .action(function ():void {
        develop();
    });
    program
        .command("test")
        .description("[For dev use only]")
        .action(function ():void {
        test();
    });
    return program;
};
module.exports = {
    createProgram: createProgram
};
