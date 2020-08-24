import chalk from "chalk";
import path from "path";
import fs from "fs";
import shell from "shelljs";
import * as git from "../lib/git";

export const init = () => {
  if (git.hasGitInitialized()) {
    console.log(chalk.red("git already initialized in this project. Aborting"));
    return false;
  }
  git.init();
};
