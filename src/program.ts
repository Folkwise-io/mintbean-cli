import chalk from "chalk";
import path from "path";
import fs from "fs";
import { Command } from "commander";
import shell from "shelljs";
import { config } from "./commands/config";
import { create } from "./commands/new";
import { deploy } from "./commands/deploy";
import { connect } from "./commands/connect";
import { init } from "./commands/init";
import { repo } from "./commands/repo";
import { develop } from "./commands/develop";
import { test } from "./commands/test";
// @ts-ignore
import { version } from "./../package.json";
export const createProgram = function () {
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
    .description(
      'Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.'
    )
    .action(function (): void {
      deploy();
    });
  program
    .command("init")
    .description("Alias for 'git init'.")
    .action(function (v: void): void {
      init();
    });
  program
    .command("repo")
    .alias("r")
    .option("-c, --connect", "Set project's remote origin to new repo")
    .option(
      "-p, --push",
      "(recommended) Intial add/commit/push of master to new repo"
    )
    .description(
      "Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))"
    )
    .action(function (cmdObj: object): void {
      console.log(cmdObj);

      repo(cmdObj);
    });
  program
    .command("connect")
    .alias("c")
    .description(
      "Add or override remote origin with github preferences in config"
    )
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
    .action(function (cmdObj: object): void {
      console.log(cmdObj);
      config(cmdObj);
    });
  program
    .command("develop")
    .alias("dev")
    .description("Start development server to test out your project")
    .action(function (): void {
      develop();
    });
  program
    .command("test")
    .description("[For dev use only]")
    .action(function (): void {
      test();
    });
  return program;
};
