const chalk = require("chalk");
const fs = require("fs");
const files = require("../lib/files.js");
const getConfig = require("../lib/config").getConfig;
const git = require("../lib/git");
const github = require("../lib/github");
const { command } = require("commander");
const connect = require("./connect").connect;

const runConnect = (
  githubUsername,
  projectName,
  connectionType,
  organization,
  push
) => {
  connect(githubUsername, projectName, connectionType, organization, {
    skipInitMsg: push ? true : false,
  });
};

const repo = async (cmdObj) => {
  const githubUsername = getConfig("github");
  const githubToken = getConfig("token");

  // return if credentials not set
  const err = github.validateGithubCredentials(githubUsername, githubToken);
  if (err) return;

  // create new github repo, add it to remote (origin)
  const projectName = files.getCurrentDirectoryBase();
  const success = await github.createRepo(
    githubUsername,
    githubToken,
    projectName,
    cmdObj.org
  );
  if (!success) return;
  if (cmdObj.connect) {
    const connectionType = getConfig("connection");
    runConnect(
      githubUsername,
      projectName,
      connectionType,
      cmdObj.org,
      cmdObj.push
    );
  }
};

module.exports = {
  repo,
};
