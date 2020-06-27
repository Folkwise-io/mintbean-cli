const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const files = require('./files');

const TemplatingService = require('../service/templating.service');

const TEMPLATE_CHOICES = fs.readdirSync(path.join(__dirname, '../templates'));

const ghUsernameRegex = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/, 'i');

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'Choose a template for new project:',
    choices: TEMPLATE_CHOICES
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

const getProjectOptions = async (project) => {
  const answers = await inquirer.prompt(QUESTIONS)

  const templateName = answers['template'];
  const githubUsername = answers['github'];
  const projectName = project ? project : generateProjectName();

  const options = {
    projectName,
    githubUsername,
    templateName
  }
  return options
}

const checkForProjectPathConflict = (project) => {
  // returns false if no conflict
  return files.checkFileOrDirExists(path.join(process.cwd(), project));
}

module.exports = {
  newProject: async (project) => {
    if(project) {
      const conflict = checkForProjectPathConflict(project)
      if (conflict) {
        console.log(chalk.red(`Whoops! Project with name '${project}' already exists.\nTry again with a different project name.`))
        return false
      }
    }

    const options = await getProjectOptions(project);
    const templatingService = new TemplatingService();
    templatingService.template({...options});
  },
}
