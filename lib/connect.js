const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const files = require('./files');
const getConfig = require('./config').getConfig;
const git = require('./git');
const github = require('./github');


const connect = () => {
  const githubUsername = getConfig('github')
  const githubToken = getConfig('token')

  // return if credentials not set
  const err = github.validateGithubCredentials(githubUsername, githubToken);
  if (err) return;

  // git init if no .git found
  if(!git.hasGitInitialized()) {
    git.init();
  }

  // create new github repo, add it to remote (origin)
  const projectName = files.getCurrentDirectoryBase();


  const output = shell.exec(`curl -H 'Authorization: token ${githubToken}' https://api.github.com/user/repos -d '{"name":"${projectName}"}'`, {silent:true});
  // const curlErr = JSON.parse(output).message
  // if(curlErr) {
  //   console.log(chalk.red(`error: ${curlErr}`));
  //   return false;
  // } else {

    // console.log(git.hasRemoteOrigin())
    // const { stdout,stderr, code } = shell.exec(`git remote add origin git@github.com:${githubUsername}/${projectName}.git`);

    // shell.exec(`git remote add origin git@github.com:${githubUsername}/${projectName}.git`);
    // console.log(chalk.cyanBright(`Github repo '${githubUsername}/${projectName}' linked as remote (origin).`));
    // console.log(`https://github.com/${githubUsername}/${projectName}`);
    // shell.exec(`git remote -v`)
    console.log(chalk.cyanBright("To make first push:"));
    console.log("git add .");
    console.log("git commit -m \"init\"");
    console.log("git push origin master");
  // }
}

module.exports = {
  connect
}
