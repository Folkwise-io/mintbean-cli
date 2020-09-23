import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import ejs from "ejs"
import { projectInstall } from "pkg-install";


const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  if (options.clobber) {
    await execa("rm", ["-rf", options.projectName]);
  }

  await copy(options.templateDir, options.targetDir, {
    clobber: options.clobber,
  });

  const myJson = fs.readFileSync(path.join(options.targetDir, "package.json"));
  const newJson = ejs.compile(myJson.toString("utf-8"))(options);
  
  fs.writeFileSync(path.join(options.targetDir, "package.json"), newJson);

}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDir,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return
}

export async function createProject(options) {
  options = {
    ...options,
    targetDir:
      options.targetDir || path.join(process.cwd(), options.projectName),
  };

  
  const templateDir = path.resolve(
    __dirname,
    "../templates",
    options.templateName.toLowerCase()
  );

  options.templateDir = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copying project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initializing git",
      task: () => initGit(options),
    },
    {
      title: "Installing dependencies",
      skip: () => !options.install,
      task: () =>
        projectInstall({
          cwd: options.targetDir,
          prefer: options.packageManager,
        }),
    },
  ]);
  console.log(options);
  await tasks.run();
}

