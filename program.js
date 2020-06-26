const chalk = require('chalk');
const clear = require('clear');
const path = require('path');
const { Command } = require('commander');
const shell = require('shelljs');

const enquirer  = require('./lib/enquirer');
const files = require('./lib/files');
const create = require('./lib/create');
const { version } = require("./package.json");

const createProgram = () => {
  const program = new Command();

  // cli command config
  program.version(version);

  program
    .command('create [project]')
    .alias('c')
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

  // future commands
  program
    .command('config')
    .description('(future command) set up mintbean credentials etc.')
    .action(function (cmdObj) {
      console.log('config-ing....')
    });

  return program;
}

module.exports = {
  createProgram
};
