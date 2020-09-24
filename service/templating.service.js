import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import ejs from "ejs";
import { projectInstall } from "pkg-install";
import { transform } from "lodash";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  const transform = (read, write, file) => {
    const ejsTemplatable = fs.readFileSync(file.name);
    const ejsTemplated = ejs.compile(ejsTemplatable.toString("utf-8"))(options);
    fs.writeFileSync(file.name, ejsTemplated);

    read.pipe(write);
  };

  await copy(options.templateDir, options.targetDir, {
    clobber: options.clobber,
    transform: transform,
  });
}

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDir,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDir:
      options.targetDir || path.join(process.cwd(), options.projectName),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
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
      task: () =>
        projectInstall({
          cwd: options.targetDir,
          prefer: options.packageManager,
        }),
    },
  ]);
  await tasks.run();
}
