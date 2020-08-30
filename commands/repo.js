import chalk from "chalk";
import files from "../lib/files.js";
import { getConfig } from "../lib/config";
import { validateGithubCredentials, createRepo } from "../lib/github";
import { addCommitPushMaster } from "../lib/git";
import { connect } from "./connect";
import DotJson from "dot-json";
import path from "path";


export const repo = async (cmdObj) => {
  cmdObj.githubUsername = getConfig("github");
  cmdObj.githubToken = getConfig("token");
  cmdObj.projectName = files.getCurrentDirectoryBase();

  // return if credentials not set
  validateGithubCredentials(cmdObj);
  connect(cmdObj);


  if (cmdObj.org) {
    const myJson = new DotJson(path.join(process.cwd(), "package.json"));
    myJson.set("organization", cmdObj.org).save();
  }
  // create new github repo, add it to remote (origin)

  try {
    await createRepo(cmdObj);
    console.log(chalk.cyanBright("Making initial commit"));
    addCommitPushMaster("Initial commit");
  } catch (error) {
    console.error(chalk.red(`ERROR exiting process`));
    process.exit(1);
  }
};
