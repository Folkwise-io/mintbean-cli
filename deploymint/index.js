const shell = require("shelljs");
const path = require("path");
const chalk = require("chalk");
const { checkFileOrDirExists } = require("../lib/files.js");
const config = require("../lib/config");
const githubUsername = config.getConfig("github");
const parsePackageDotJson = require("../lib/files").parsePackageDotJson;

function findOutput() {
  let build = checkFileOrDirExists(path.join(process.cwd(), "./build/"));
  let dist = checkFileOrDirExists(path.join(process.cwd(), "./dist/"));

  if (build) {
    return "build";
  } else if (dist) {
    return "dist";
  } else {
    console.log(chalk.red(`Publish Directory must either be /dist or /build`));
    process.exit(1);
  }
}

function sayCommand(item) {
    if (item.description) {
      console.log(" ");
        item.description.forEach((string) => {
          console.log(chalk.green(string));
        });
      console.log(" ");
    }

    if (item.command) {
      console.log(chalk.bold.green(item.command));
      console.log(' ');
    }

    if (item.instructions) {
      item.instructions.forEach((string) => {
        console.log(chalk.green(string));
      });
      console.log(" ");
    }
}

function ghPages(args) {
  const main = require("../node_modules/gh-pages/bin/gh-pages");
  const {name} = parsePackageDotJson();
  shell.exec("npm run build");

  let outputFolder = findOutput();

  let folderFound = checkFileOrDirExists(
    path.join(process.cwd(), `./${outputFolder}`)
  );

  if (folderFound) {
    main([...args, "-d", outputFolder]);
    console.log(
      chalk.cyanBright(`Deployed to`),
      chalk.bold.cyanBright(`https://${githubUsername}.github.io/${name}/`)
    );
    console.log(
      chalk.bold.cyanBright(
        `(allow a minute or two for deploy to propogate...)`
      )
    );
  } else {
    console.log(
      chalk.red(`No ${outputFolder} folder found, check your spelling`)
    );
    process.exit(1);
  }
}

function featurePeek(_, answers) {
  const instructions = require("./howToFeaturePeek");
  sayCommand(instructions.description);
  sayCommand(instructions.gettingStarted);
  sayCommand(instructions.login);
  sayCommand(instructions.deployment);
}

module.exports = {
  ghPages,
  featurePeek,
};
