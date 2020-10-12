import fs from "fs-extra";
import path from "path";
import { prompt } from "enquirer";
import chalk from "chalk";
import moment from "moment";
import { createProject } from "../services/templatingService";
import banner from '../util/banner'

// grab all folder names in teh Template Dir
const TEMPLATE_CHOICES = fs.readdirSync(path.resolve(__dirname, "../../templates"));

const generateProjectName = (templateName) => {
  const month = moment().format("MM");
  const day = moment().format("DD");
  const year = moment().format("YYYY");
  return `mintbean-${templateName}-${year}-${month}-${day}`;
};

const getProjectOptions = async (argv, templateName) => {
  const QUESTIONS = [
    {
      name: "template",
      type: "select",
      message: "Choose a template for new project:",
      choices: TEMPLATE_CHOICES,
      skip: () => templateName,
    },
    {
      name: "packagemgr",
      type: "select",
      message: "Which package manager will you use:",
      choices: ["yarn", "npm"],
    },
  ];

  const answers = await prompt(QUESTIONS);
  
  templateName = templateName || answers.template;
  const packageManager = answers.packagemgr;
  const projectName = argv.projectName || generateProjectName(templateName);

  return {
    projectName,
    templateName,
    packageManager,
  };
};

export const newProject = async (argv, templateName) => {

  banner.mintbean();
  banner.sponsor();

  let options = await getProjectOptions(argv, templateName);
  if (argv.projectName) {
    const potentialFile = path.resolve(process.cwd(), options.projectName);
    const conflict = fs.pathExistsSync(potentialFile);
    if (conflict) {
      const clobber = await prompt([
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
  }
  createProject({ ...options });
};
