#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const { program } = require('commander');
const shell = require('shelljs');


const enquirer  = require('./lib/enquirer');
const files = require('./lib/files');
const github = require('./lib/github');


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

const createReactApp = (project, username) => {
  console.log(chalk.green('Creating react app with gh-pages...'));
  shell.exec(`create-react-app ${project} --template cra-template-mintbean-challenge-react-starter`);

  console.log(chalk.green('Updating package.json...'));
  shell.exec(`dot-json ./${project}/package.json homepage "https://${username}.io/${project}/"`);
  console.log(chalk.green('Changing into project directory...'));
  process.chdir(`./${project}`);
  console.log(chalk.green('Creating and connecting to new GitHub repo...'));
  shell.exec(`hub create ${project}`);
  shell.exec(`git remote rm origin`);
  shell.exec(`git remote add origin git@github.com:${username}/${project}.git`);
  shell.exec(`git remote -v`);

  console.log(chalk.green(`Done! 'cd ${project}' to get started coding!`))
}

program.version('0.1.0');

program
  .command('new <project>')
  .alias('n')
  .description('create new project directory of type -t')
  .option('-t, --type <type>','specify project type: react, js', 'react')
  .action(function (project, cmdObj) {
    displayMessageIntro();

    if(cmdObj.type ==='react') {
      console.log(chalk.green(`Starting new react project`),
      chalk.bold.blue(`'${project}'`),
      chalk.green(`...`)
    );
      enquirer.askGithubUsername()
        .then(res => createReactApp(project, res.username))
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
