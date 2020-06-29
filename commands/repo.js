const chalk = require('chalk');
const fs = require('fs');
const files = require('../lib/files.js');
const getConfig = require('../lib/config').getConfig;
const git = require('../lib/git');
const github = require('../lib/github');


const repo = (cmdObj) => {
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
    console.log(chalk.cyanBright('Connecting remote origin...'));
    git.createOrOverrideRemoteOrigin(githubUsername, projectName);
    console.log(chalk.cyanBright("To make first push:"));
    console.log("git add .");
    console.log("git commit -m \"init\"");
    console.log("git push origin master");
  }
}

module.exports = {
  repo,
}
