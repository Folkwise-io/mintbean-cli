import execa from "execa";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

const findOutput = () => {
  let build = fs.pathExistsSync(path.join(process.cwd(), "./build/"));
  let dist = fs.pathExistsSync(path.join(process.cwd(), "./dist/"));

  if (build) {
    return "build";
  } else if (dist) {
    return "dist";
  } else {
    console.log(chalk.red(`Publish Directory must either be /dist or /build`));
    process.exit(1);
  }
};

const sayCommand = (item) => {
  if (item.description) {
    console.log(" ");
    item.description.forEach((string) => {
      console.log(chalk.green(string));
    });
    console.log(" ");
  }

  if (item.command) {
    console.log(chalk.bold.green(item.command));
    console.log(" ");
  }

  if (item.instructions) {
    item.instructions.forEach((string) => {
      console.log(chalk.green(string));
    });
    console.log(" ");
  }
};

const ghPages = async (args) => {
  const main = require("../../node_modules/gh-pages/bin/gh-pages");
  execa("npm", ["run", "build"]);

  let outputFolder = findOutput();

  let folderFound = fs.pathExistsSync(path.join(process.cwd(), `./${outputFolder}`));

  if (folderFound) {
    await main([...args, "-d", outputFolder]);
  }
  const owner = chalk.bold.redBright("github-username");
  const repo = chalk.bold.redBright("repo");

  console.log(chalk.cyanBright(`\nDeployed to https://${owner}.github.io/${repo}/\n`));
  console.log(
    chalk.cyanBright(
      "Make sure to replace github-username and repo with your actual github username and repo name\n",
    ),
  );
  console.log(chalk.bold.cyanBright(`(allow a minute or two for deploy to propagate...)`));
};

const featurePeek = () => {
  const instructions = require("./howToFeaturePeek");
  sayCommand(instructions.description);
  sayCommand(instructions.gettingStarted);
  sayCommand(instructions.login);
  sayCommand(instructions.deployment);
};

export default {
  ghPages,
  featurePeek,
};
