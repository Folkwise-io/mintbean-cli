const chalk = require('chalk');
const clear = require('clear');
const path = require('path');
const { Command } = require('commander');
const shell = require('shelljs');

const enquirer  = require('./lib/enquirer');
const files = require('./lib/files');
const react = require('./lib/react');
const message = require('./lib/message');
const create = require('./lib/create');
const TemplatingService = require('./service/templating.service');
const { version } = require("./package.json");

const createProgram = () => {
  const program = new Command();

  // cli command config
  program.version(version);

  program
    .command('new <project>')
    .alias('n')
    .description('create new project directory of type -t')
    .option('-t, --type <type>','specify project type: react, js', 'react')
    .action(function (project, cmdObj) {
      message.banner();

      const templatingService = new TemplatingService();
      templatingService.template('vanilla', { projectName: project });

      // case: react
      // if(cmdObj.type ==='react') {
      //   console.log(chalk.green(`Starting new react project`),
      //   chalk.bold.blue(`'${project}'`),
      //   chalk.green(`...`)
      // );
      //   enquirer.askGithubUsername()
      //     .then(res => react.createReactApp(project, res.username))
      //     .catch(err => console.log(chalk.red(err)))
      // }
    });

  program
    .command('deploy')
    .description('deploy project to GitHub pages from master (origin)')
    .action(function () {
      console.log(chalk.green('Deploying project to GitHub pages from master at origin...'))
      shell.exec('gh-pages -d build')
      console.log(chalk.green(`Done! 'https://${username}.io/${path.basename(CWD)}/'`))
    })

  program
    .command('create [project]')
    .alias('c')
    .description('start new project from template')
    .action(function (project) {
      create.newProject(project)

    })

  // future commands
  program
    .command('config')
    .description('(future command) set up mintbean credentials etc.')
    .action(function (cmdObj) {
      console.log('config-ing....')
      // console.log(cmdObj )
    });

  return program;
}

module.exports = {
  createProgram
};

//
// if (!files.directoryIsEmpty('.')) {
//   console.log(chalk.red('Error: Project of name  already exists. Run \'mintbean -i\ <project-name>\' in empty project folder'))
//   process.exit();
// };
//
// const run = async () => {
//   const credentials = await enquirer.askGithubCredentials();
//   console.log(credentials);
// };

// const argv = require('minimist')(process.argv)
// console.log(argv)
// const run = async () => {
//   shell.exec('git init')
//
//   shell.exec('hub create')
// };

// run();
