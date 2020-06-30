const chalk = require('chalk');
const files = require('../lib/files');
const git = require('../lib/git');
const getConfig = require('../lib/config').getConfig;

const connect = (username, project, connection, isInit) => {
  console.log(chalk.cyanBright('Connecting remote origin...'));
  const githubUsername = username || getConfig('github');
  const projectName = project || files.getCurrentDirectoryBase();
  const connectionType = connection || getConfig('connection');

  git.createOrOverrideRemoteOrigin(githubUsername, projectName, connectionType);

  if(isInit) {
    console.log(chalk.cyanBright("To make first push:"));
    console.log("git add .");
    console.log("git commit -m \"init\"");
    console.log("git push origin master");
  }
}

module.exports = {
  connect,
}
