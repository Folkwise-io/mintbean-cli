import chalk from "chalk";
import { createOrOverrideRemoteOrigin } from "../lib/git";

export const connect = ({ connectionType, org, projectName, githubUsername }) => {
  console.log(chalk.cyanBright("Setting remote origin..."));

  if (org) {
    createOrOverrideRemoteOrigin(org, projectName, connectionType);
  } else {
    createOrOverrideRemoteOrigin(
      githubUsername,
      projectName,
      connectionType
    );
  }

  console.log(chalk.cyanBright("Remote set"));
};

