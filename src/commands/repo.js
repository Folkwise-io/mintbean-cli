const chalk = require('chalk');
const fs = require('fs');
const files = require('../lib/files.js');
const getConfig = require('../lib/config').getConfig;
const git = require('../lib/git');
const github = require('../lib/github');
const connect = require('./connect').connect;

const repo = (cmdObj) => {
  console.log(cmdObj);
  const githubUsername = getConfig('github');
  const githubToken = getConfig('token');

  // return if credentials not set
  const err = github.validateGithubCredentials(githubUsername, githubToken);
  if (err) return;

  // create new github repo, add it to remote (origin)
  const projectName = files.getCurrentDirectoryBase();
  const success = github.createRepo(githubUsername, githubToken, projectName);
  if (!success) return
  if(cmdObj.connect) {
    const connectionType = getConfig('connection');
    connect(githubUsername, projectName, connectionType, { skipInitMsg: cmdObj.push? true : false });
  }
  if(cmdObj.push) {
    git.addCommitPushMaster('Initial commit');
  }
}

module.exports = {
  repo,
}
