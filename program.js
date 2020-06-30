const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const shell = require('shelljs');

const config = require('./commands/config').config;
const create = require('./commands/new');
const deploy = require('./commands/deploy').deploy;
const connect = require('./commands/connect').connect;
const init = require('./commands/init').initialize;
const repo = require('./commands/repo').repo;
const test = require('./commands/test').test;
const { version } = require("./package.json");

const createProgram = () => {
  const program = new Command();

  program.version(version);

  program
    .command('new [project]')
    .alias('n')
    .description('Start new project from template')
    .action(function (project) {
      create.newProject(project)
    });

  program
    .command('deploy')
    .alias('d')
    .description('Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.')
    .action(function () {
      deploy()
    });

  program
    .command('init')
    .description('Alias for \'git init\'.')
    .action(function () {
      init()
    });

  program
    .command('repo')
    .alias('r')
    .option('-c, --connect', "Set project's remote origin to new repo")
    .option('-p, --push', "(recommended) Intial add/commit/push of master to new repo")
    .description('Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))')
    .action(function (cmdObj) {
      repo(cmdObj)
    });

  program
    .command('connect')
    .alias('c')
    .description('Add or override remote origin with github preferences in config')
    .action(function () {
      connect()
    });

  program
    .command('config')
    .description('Set up or view config (Github credentials etc.)')
    .option('-v, --view', 'view current config')
    .option('-g, --github <username>', 'set github username')
    .option('-t, --token <token>', 'set github personal access token')
    .option('-S, --ssh', 'set github connection type to ssh')
    .option('-H, --https', 'set github connection type to https')
    .action((cmdObj) => {
      config(cmdObj)
    });

  program
    .command('test')
    .description('[For dev use only]')
    .action(() => {
      test()
    });

  return program;
}

module.exports = {
  createProgram
};
