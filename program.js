const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { Command } = require('commander');
const shell = require('shelljs');

const create = require('./lib/create');
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
    .description('git init. Must be run from project folder root')
    .action(function () {
      init()
    })


  program
    .command('connect')
    .description('MUST RUN FROM PROJECT ROOT. Create new public GitHub repo and add it to project remote as origin')
    .action(function () {
      if(!fs.existsSync(path.join(process.cwd(), '.git'))) {
        shell.exec('git init')
      }
      const projectName = path.basename(process.cwd());
      shell.exec(`git remote add origin git@github.com:clairefro/${projectName}.git`)
      console.log('Added github repo and remote.')
      shell.exec(`git remote -v`)
    })

  // future commands
  program
    .command('config')
    .description('set up mintbean credentials etc.')
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
