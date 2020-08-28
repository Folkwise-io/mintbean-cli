const shell = require("shelljs");
const chalk = require("chalk");
const git = require("./git");
const { Octokit } = require("@octokit/core");

// VALIDATIONS
const validateGithubCredentials = (username, token) => {
  if (!username || !token) {
    if (!username) {
      console.log(chalk.red("Missing GitHub username. Add it to config:"));
      console.log("mint config -g <username>");
    }
    if (!token) {
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
    }
    return true;
  }
  return false;
};

const attemptRepoCreation = async (
  username,
  token,
  projectName,
  organization
) => {
  const octokit = new Octokit({ auth: token });
  try {
    if (organization) {
      return await octokit.request("POST /orgs/{org}/repos", {
        org: organization,
        name: projectName,
      });
    } else {
      return await octokit.request("POST /user/repos", {
        name: projectName,
      });
    }
  } catch (error) {
    error.errors.forEach(error => {
      console.log(chalk.red(`error: ${error.message}`));
    });
    process.exit(1)
  }
};
// Actions
const createRepo = async (username, token, projectName, organization) => {
  const output = await attemptRepoCreation(
    username,
    token,
    projectName,
    organization
  );
  
  console.log(
    chalk.cyanBright(
      `Successfully created repo at '${username}/${projectName}'`
    )
  );
  return true;
};

module.exports = {
  validateGithubCredentials,
  createRepo,
};
