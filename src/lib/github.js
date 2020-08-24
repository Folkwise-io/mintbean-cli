const shell = require("shelljs");
const chalk = require('chalk');
const git = require('./git');

// VALIDATIONS
const validateGithubCredentials = (username, token) => {
  if (!username || !token) {
    if(!username) {
      console.log(chalk.red("Missing GitHub username. Add it to config:"));
      console.log("mint config -g <username>");
    }
    if (!token) {
      console.log(chalk.red("Missing GitHub personal access token. Add it to config:"));
      console.log("mint config -t <token>");
      console.log(chalk.cyanBright("Create a GitHub personal access token using the link below. Give the token full scopes for 'repo' and 'user'. Copy this token and set it with 'mint config -t <token>' "));
      console.log("https://github.com/settings/tokens");
      console.log(chalk.red("*Connection type defaults to 'ssh'. You can change this preference to 'https' by running 'mint config -H'"));
    }
    return true
  }
  return false
}

const attemptRepoCreation = (username, token, projectName) => {
  return shell.exec(`curl -H 'Authorization: token ${token}' https://api.github.com/user/repos -d '{"name":"${projectName}"}'`, {silent:true});
}
// Actions
const createRepo = (username, token, projectName) => {
  const output = attemptRepoCreation(username, token, projectName);
  const curlErr = JSON.parse(output).message
  if(curlErr) {
    console.log(chalk.red(`error: ${curlErr}`));
    return false;
  }
  console.log(chalk.cyanBright(`Successfully created repo at '${username}/${projectName}'`));
  return true;
}

module.exports = {
  validateGithubCredentials,
  createRepo,
}
