import chalk from "chalk";
import files from "../lib/files.js";
import fs from "fs"
import { getConfig } from "../lib/config";
import { validateGithubCredentials, createRepo } from "../lib/github";
import { addCommitPushMaster } from "../lib/git";
import { connect } from "./connect";
import writeJson from "write-json";
import path from "path";


export const repo = async (cmdObj) => {
  cmdObj.githubUsername = getConfig("github");
  cmdObj.githubToken = getConfig("token");
  cmdObj.projectName = files.getCurrentDirectoryBase();

  // return if credentials not set
  validateGithubCredentials(cmdObj);
  connect(cmdObj);


  if (cmdObj.org) {
    const myJson = fs
      .readFileSync(path.join(process.cwd(), "package.json"))
      .toString("utf-8");
    
    const newJson = JSON.parse(myJson)
    newJson.organization = cmdObj.org;
    writeJson.sync("package.json", newJson);
  }
  // create new github repo

  try {
    await createRepo(cmdObj);
    console.log(chalk.cyanBright("Making initial commit"));
    addCommitPushMaster("Initial commit");
  } catch (error) {
    console.error(chalk.red(`ERROR ${error.msg}`));
    process.exit(1);
  }
};
