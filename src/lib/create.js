const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const CHOICES = fs.readdirSync(path.join(__dirname, '../../templates'));

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
      const regex = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/, 'i');
      if (input === '' || !regex.test(input) ) {
        return 'not valid username, try again'
      }
      return true
    }
}
];

module.exports = {
  getTemplate: () => {
    inquirer.prompt(QUESTIONS)
    .then(answers => {
        console.log(answers);
    });
  }
}
