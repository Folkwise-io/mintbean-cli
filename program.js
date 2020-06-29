const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const shell = require('shelljs');

const config = require('./commands/config').config;
const create = require('./commands/new');
const connect = require('./commands/connect').connect;
const init = require('./commands/init').initialize;
const repo = require('./commands/repo').repo;
const { version } = require("./package.json");

const createProgram = () => {
  const program = new Command();

  program.version(version);

  program
    .command('new [project]')
    .alias('n')
    .description('start new project from template')
    .action(function (project) {
      create.newProject(project)
    });

  program
    .command('deploy')
    .description('deploy project to GitHub pages from master (origin)')
    .action(function () {
      console.log(chalk.red('Sorry this command not developed yet...'))
      // shell.exec('gh-pages -d build')
      // console.log(chalk.cyanBright(`Done! 'https://${username}.io/${path.basename(CWD)}/'`))
    });

  program
    .command('init')
    .description('Alias for \'git init\'. MUST RUN FROM PROJECT FOLDER ROOT.')
    .action(function () {
      init()
    });

  program
    .command('repo')
    .alias('r')
    .option('-c, --connect', "Set project's remote origin to new repo")
    .description('Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))')
    .action(function (cmdObj) {
      repo(cmdObj)
    });

  program
    .command('connect')
    .alias('c')
    // .option('-c, --connect', "Set project's remote origin to new repo")
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

  return program;
}

module.exports = {
  createProgram
};
