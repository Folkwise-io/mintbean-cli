const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const moment = require("moment");

const files = require("../lib/files");
const config = require("../lib/config");
const message = require("../lib/message");

const {createProject} = require("../service/templating.service");

const TEMPLATE_CHOICES = fs.readdirSync(path.join(__dirname, "../templates"));
const PM_CHOICES = ["yarn", "npm"];

const ghUsernameRegex = new RegExp(
  /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/,
  "i"
);

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "Choose a template for new project:",
    choices: TEMPLATE_CHOICES,
  },
  {
    name: "packagemgr",
    type: "list",
    message: "Which package manager will you use:",
    choices: PM_CHOICES,
  },
  {
    name: "github",
    type: "input",
    message: "GitHub username: ",
    when: () => !config.getConfig("github"),
    validate: (input) => {
      if (input === "" || !ghUsernameRegex.test(input)) {
        return "not valid username, try again";
      }
      return true;
    },
  },
];

const generateProjectName = (templateName) => {
  const month = moment().format("MM")
  const day = moment().format("DD")
  const year = moment().format("YYYY")
  return `mintbean-${templateName}-${year}-${month}-${day}`;
};

const getProjectOptions = async (project) => {
  const answers = await inquirer.prompt(QUESTIONS);
  const templateName = answers.template;
  if (answers.github) {
    config.setConfig("github", answers.github);
  }
  const githubUsername = config.getConfig("github");
  const packageManager = answers.packagemgr;
  console.log(packageManager);
  const projectName = project ? project : generateProjectName(answers.template);

  const options = {
    projectName,
    githubUsername,
    templateName,
    packageManager,
  };
  return options;
};

const checkForProjectPathConflict = (project) => {
  // returns false if no conflict
  return files.checkFileOrDirExists(path.join(process.cwd(), project));
};

module.exports = {
  newProject: async (project) => {
    if (project) {
      const conflict = checkForProjectPathConflict(project);
      if (conflict) {
        console.log(
          chalk.red(
            `Whoops! Project with name '${project}' already exists.\nTry again with a different project name.`
          )
        );
        return false;
      }
    }
    message.banner();
    message.sponsorBanner();
    const options = await getProjectOptions(project);
    createProject({ ...options });
  },
};
