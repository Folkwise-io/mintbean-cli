const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const CHOICES = fs.readdirSync(path.join(__dirname, '../../templates'));

const ghUsernameRegex = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/, 'i');

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'Choose a template for new project:',
    choices: CHOICES
  },
  {
    name: 'github',
    type: 'input',
    message: 'GitHub username: ',
    validate: (input) => {
      if (input === '' || !ghUsernameRegex.test(input) ) {
        return 'not valid username, try again'
      }
      return true
    }
  }
];

const generateProjectName = () => {
  const now = new Date();
  return `mintbean-hackathon-challenge-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
}

module.exports = {
  getOptions: (project) => {
    inquirer.prompt(QUESTIONS)
    .then(answers => {
      console.log(answers);

      const projectChoice = answers['template'];
      const githubUsername = answers['github'];
      const projectName = project ? project : generateProjectName();

      const CURR_DIR = process.cwd();
      const templatePath = path.join(__dirname, '../../templates', projectChoice);
      const targetPath = path.join(CURR_DIR, projectName);

      const options = {
        projectName,
        githubUsername,
        templateName: projectChoice,
        templatePath,
        targetPath,
      }
      console.log(options)
      return options
    });
  },
  createProject: (options) => {

  },
}
