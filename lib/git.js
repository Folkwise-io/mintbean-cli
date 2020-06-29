const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// utils
const generateRemoteLinkSsh = (username, projectName) => {
  return `git@github.com:${username}/${projectName}.git`
}

// Native actions
const init = () => {
  shell.exec('git init');
}

const addRemote = (name, remote) => {
  shell.exec(`git remote add ${name} ${remote}`);
}

const removeRemote = (name) => {
  shell.exec(`git remote remove ${name}`);
}

// Custom actions
const createOrOverrideRemoteOrigin = (username, projectName) => {
  // git init if needed
  if(!hasGitInitialized()) {
    console.log(chalk.cyanBright('Intializing git...'));
    init();
  }
  // check remotes for existing origin, remove if present
  if(hasRemoteOrigin()){
    removeRemote('origin');
  }
  // create new remote origin connection
  const remote = generateRemoteLinkSsh(username, projectName);
  addRemote('origin', remote);
  console.log(chalk.cyanBright("Updated remote connection for 'origin':"));
  console.log(getRemotes())
}

// Viewers
const getRemotes = () => {
  const { stdout } = shell.exec('git remote -v', {silent: true});
  return stdout;
}

// Bools
const hasGitInitialized = () => {
  return fs.existsSync(path.join(process.cwd(), '.git'))
}

const hasRemoteOrigin = () => {
  const output = getRemotes()
  const pattern = /^origin\s/m
  return pattern.test(output);
}

module.exports = {
  init,
  createOrOverrideRemoteOrigin,
  getRemotes,
  hasGitInitialized,
  hasRemoteOrigin
}
