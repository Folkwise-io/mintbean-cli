const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

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
  console.log(answers);

  const projectChoice = answers['template'];
  const githubUsername = answers['github'];
  const projectName = project ? project : generateProjectName();

  const CURR_DIR = process.cwd();
  const templatePath = path.join(__dirname, '../templates', projectChoice);
  const targetPath = path.join(CURR_DIR, projectName);

  const options = {
    projectName,
    githubUsername,
    templateName: projectChoice,
    templatePath,
    targetPath,
  }
  return options
}

module.exports = {
  newProject: async (project) => {
    const options = await getProjectOptions(project);
    console.log(options)
    const { templateName } = options;
    const templatingService = new TemplatingService();
    templatingService.template(templateName, { projectName: project });
  },
}
