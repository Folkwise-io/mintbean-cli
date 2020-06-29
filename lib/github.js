const shell = require('shelljs');
const chalk = require('chalk');
const git = require('./git');

// VALIDATIONS
const validateGithubCredentials = (username, token) => {
  if (!username || !token) {
    let missing = []
    if(!username) missing.push('github-username');
    if(!token) missing.push('github-token');
    console.log(chalk.red(`Missing config: ${missing.join(', ')}`))
    console.log(chalk.red("Run 'mint config -g <github-username> -t <github-token>' to set up missing credentials"))
    console.log("Add new GitHub personal access token called 'mintbean-cli' with 'repo' and 'user' permissions: ")
    console.log("https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token")
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
