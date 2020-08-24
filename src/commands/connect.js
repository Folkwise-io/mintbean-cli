import chalk from 'chalk';
import * as files from '../lib/files';
import * as git from '../lib/git';
import { getConfig } from '../lib/config'

export const connect = (username, project, connection, opts) => {
  console.log(chalk.cyanBright('Connecting remote origin...'));
  const githubUsername = username || getConfig('github');
  const projectName = project || files.getCurrentDirectoryBase();
  const connectionType = connection || getConfig('connection');

  git.createOrOverrideRemoteOrigin(githubUsername, projectName, connectionType);

  if(!opts.skipInitMsg) {
    console.log(chalk.cyanBright("To make first push:"));
    console.log("git add .");
    console.log("git commit -m \"init\"");
    console.log("git push origin master");
  }
}
