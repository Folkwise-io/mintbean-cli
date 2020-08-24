import chalk from "chalk";
import shell from "shelljs";
import { connect } from "./connect";
import { hasRemoteOrigin } from "../lib/git";
import { parsePackageDotJson } from "../lib/files";

export const deploy = () => {
  if (!hasRemoteOrigin()) {
    connect();
  }

  const packageDotJson = parsePackageDotJson();

  if (!packageDotJson) {
    console.log(
      chalk.red("No package.json found. Are you in the project root directory?")
    );
    return false;
  }
  if (!packageDotJson.mintbean) {
    console.log(
      chalk.red(
        'No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'
      )
    );
    return false;
  }
  if (packageDotJson.mintbean.scripts) {
    const { homepage } = packageDotJson.mintbean;
    const { predeploy, deploy } = packageDotJson.mintbean.scripts;
    if (!predeploy && !deploy) {
      console.log(
        chalk.red(
          'No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'
        )
      );
      return false;
    }
    if (predeploy) {
      console.log(chalk.cyanBright("Preparing build for deploy..."));
      shell.exec(predeploy);
    }
    if (deploy) {
      console.log(chalk.cyanBright("Deploying..."));
      shell.exec(deploy);
      if (homepage) {
        console.log(
          chalk.cyanBright(`Deployed to`),
          chalk.bold.cyanBright(`${homepage}`)
        );
      }
      console.log("(allow a minute or two for deploy to propagate...)");
    }
  } else {
    console.log(
      chalk.red(
        'No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'
      )
    );
  }
};
