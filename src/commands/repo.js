import chalk from "chalk";
import fs from "fs";
import * as files from "../lib/files.js";
import { getConfig } from "../lib/config";
import * as git from "../lib/git";
import * as github from "../lib/github";
import { connect } from "./connect";

export const repo = (cmdObj) => {
  console.log(cmdObj);
  const githubUsername = getConfig("github");
  const githubToken = getConfig("token");

  // return if credentials not set
  const err = github.validateGithubCredentials(githubUsername, githubToken);
  if (err) return;

  // create new github repo, add it to remote (origin)
  const projectName = files.getCurrentDirectoryBase();
  const success = github.createRepo(githubUsername, githubToken, projectName);
  if (!success) return;
  if (cmdObj.connect) {
    const connectionType = getConfig("connection");
    connect(githubUsername, projectName, connectionType, {
      skipInitMsg: cmdObj.push ? true : false,
    });
  }
  if (cmdObj.push) {
    git.addCommitPushMaster("Initial commit");
  }
};
