import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import moment from "moment";

import files from "../lib/files";
import config from "../lib/config";
import message from "../lib/message";

import { createProject } from "../service/templating.service";

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
  const month = moment().format("MM");
  const day = moment().format("DD");
  const year = moment().format("YYYY");
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

export const newProject = async (project) => {
  message.banner();
  let options = await getProjectOptions(project);
  const conflict = checkForProjectPathConflict(options.projectName);
  if (conflict) {
    const clobber = await inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        message: `Whoops! Project with name '${options.projectName}' already exists. Do you want to replace it?`,
        default: false,
      },
    ]);
    options.clobber = clobber.confirm;
  }
  if (options.clobber === false) {
    console.log(chalk.red("Try again with a new project name"));
    process.exit(1);
  }

  createProject({ ...options });
};
