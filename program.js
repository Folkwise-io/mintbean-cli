const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const shell = require('shelljs');

const create = require('./lib/create');
const connect = require('./lib/connect').connect;
const init = require('./lib/init').initialize;
const config = require('./lib/config');
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
    })

  program
    .command('deploy')
    .description('deploy project to GitHub pages from master (origin)')
    .action(function () {
      console.log(chalk.green('Deploying project to GitHub pages from master at origin...'))
      shell.exec('gh-pages -d build')
      console.log(chalk.green(`Done! 'https://${username}.io/${path.basename(CWD)}/'`))
    })

  program
    .command('init')
    .description('Alias for \'git init\'. MUST RUN FROM PROJECT FOLDER ROOT.')
    .action(function () {
      init()
    })


  program
    .command('connect')
    .alias('c')
    .description('Create new public GitHub repo and add it to project remote as origin. MUST RUN FROM PROJECT ROOT. ')
    .action(function () {
      connect()
    })

  program
    .command('config')
    .description('Set up or view config (Github credentials etc.)')
    .option('-v, --view', 'view current config')
    .option('-g, --github <username>', 'set github username')
    .option('-t, --token <token', 'set github personal access token')
    .action((cmdObj) => {
      config.parse(cmdObj)
    });

  return program;
}

module.exports = {
  createProgram
};
