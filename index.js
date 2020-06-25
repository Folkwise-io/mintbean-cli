#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const { program } = require('commander');
const shell = require('shelljs');
const DotJson = require('dot-json');

const enquirer  = require('./lib/enquirer');
const files = require('./lib/files');
const react = require('./lib/react');

// helpers (TODO: refactor to module)
const displayMessageIntro = () => {
  console.log(
    chalk.cyanBright(
      figlet.textSync('Mint', { horizontalLayout: 'full' })
    )
  );
  console.log(
    chalk.whiteBright('Let mint do the hard work... you do the coding \n')
  );
}


// cli command config
program.version('0.1.0');

program
  .command('new <project>')
  .alias('n')
  .description('create new project directory of type -t')
  .option('-t, --type <type>','specify project type: react, js', 'react')
  .action(function (project, cmdObj) {
    displayMessageIntro();

    // case: react
    if(cmdObj.type ==='react') {
      console.log(chalk.green(`Starting new react project`),
      chalk.bold.blue(`'${project}'`),
      chalk.green(`...`)
    );
      enquirer.askGithubUsername()
        .then(res => react.createReactApp(project, res.username))
        .catch(err => console.log(chalk.red(err)))
    }
  });

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
    // console.log(cmdObj )
  })

program.parse(process.argv);

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
