import chalk from "chalk";
import {addCommitPushMaster} from "./git";
import { Octokit }  from "@octokit/core";

// VALIDATIONS
export const validateGithubCredentials = ({ githubUsername, githubToken }) => {
    if (!githubUsername) {
      console.log(chalk.red("Missing GitHub username. Add it to config:"));
      console.log("mint config -g <username>");
      process.exit(1);
    }
    if (!githubToken) {
      console.log(
        chalk.red("Missing GitHub personal access token. Add it to config:")
      );
      console.log("mint config -t <token>");
      console.log(
        chalk.cyanBright(
          "Create a GitHub personal access token using the link below. Give the token full scopes for 'repo' and 'user'. Copy this token and set it with 'mint config -t <token>' "
        )
      );
      console.log("https://github.com/settings/tokens");
      console.log(
        chalk.red(
          "*Connection type defaults to 'ssh'. You can change this preference to 'https' by running 'mint config -H'"
        )
      );
      process.exit(1);
    }
};

const attemptRepoCreation = async ({ githubToken, projectName, org }) => {
  const octokit = new Octokit({ auth: githubToken });
  try {
    if (org) {
      return await octokit.request("POST /orgs/{org}/repos", {
        org: org,
        name: projectName,
      });
    } else {
      return await octokit.request("POST /user/repos", {
        name: projectName,
      });
    }
  } catch (error) {
    error.errors.forEach((error) => {
      console.log(chalk.red(`error: ${error.message}`));
    });
    process.exit(1);
  }
};
// Actions
export const createRepo = async (options) => {
  await attemptRepoCreation(options);
  addCommitPushMaster()
  

  console.log(
    chalk.cyanBright(
      `Successfully created repo at '${options.githubUsername}/${options.projectName}'`
    )
  );
};

