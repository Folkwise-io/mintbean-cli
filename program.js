const chalk = require('chalk');
const path = require('path');
const { Command } = require('commander');
const shell = require('shelljs');

const create = require('./lib/create');
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
