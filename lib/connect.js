const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const getConfig = require('./config').getConfig;

const validateCredentials = (username, token) => {
  if (!username || !token) {
    let missing = []
    if(!username) missing.push('github-username');
    if(!token) missing.push('github-token');
    console.log(chalk.red(`Missing config: ${missing.join(', ')}`))
    console.log(chalk.red("Run 'mint config -u <github-username> -t <github-token>' to set up missing credentials"))
    console.log("How to get GitHub personal access token: ")
    console.log("https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token")
    return true
  }
  return false
}

const connect = () => {
  const githubUsername = getConfig('github')
  const githubToken = getConfig('token')

  // return if credentials not set
  const err = validateCredentials(githubUsername, githubToken);
  if (err) return;

  // git init if no .git found
  if(!fs.existsSync(path.join(process.cwd(), '.git'))) {
    shell.exec('git init')
  }

  // create new github repo, add it to remote (origin)
  const projectName = path.basename(process.cwd());
  shell.exec(`curl -s -H 'Authorization: token ${githubToken}' https://api.github.com/user/repos -d '{"name":"${projectName}"}'`);
  shell.exec(`git remote add origin git@github.com:${githubUsername}/${projectName}.git`);
  console.log(chalk.cyanBright(`Github repo '${githubUsername}/${projectName}' linked as remote (origin).`));
  console.log(`https://github.com/${githubUsername}/${projectName}`);
  shell.exec(`git remote -v`)
  console.log(chalk.cyanBright("To make first push:"));
  console.log("git add .");
  console.log("git commit -m \"init\"");
  console.log("git push origin master");
}

module.exports = {
  connect
}
