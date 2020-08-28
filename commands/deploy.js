const chalk = require("chalk");
const shell = require("shelljs");
const connect = require("./connect").connect;
const hasRemoteOrigin = require("../lib/git").hasRemoteOrigin;
const parsePackageDotJson = require("../lib/files").parsePackageDotJson;
const inquirer = require("inquirer");
const deploymint = require("../deploymint/index");
const message = require("../lib/message");

const ghPagesDescription =
  "GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.";

const deploy = async () => {
  async function askPlatform() {
    const answers = await inquirer.prompt([
      {
        name: "platform",
        type: "list",
        message: "Choose a platform...",
        choices: [
          { name: "FeaturePeek(Recommended)", value: "featurePeek" },
          { name: "GitHub Pages(basic)", value: "ghPages" },
        ],
      },
      {
        name: "confirm",
        type: "confirm",
        message: "Are you sure?...",
        when: (answers) => answers.platform === "ghPages",
      },
    ]);

    if (answers.confirm === false) {
      return askPlatform();
    } else {
      return answers;
    }
  }

  const answers = await askPlatform();

  deploymint[answers.platform](process.argv, answers);

  // console.log(walk(process.cwd()));

  // if(!hasRemoteOrigin()) {
  //   connect();
  // }

  // const packageDotJson = parsePackageDotJson();

  // if(!packageDotJson) {
  //   console.log(chalk.red('No package.json found. Are you in the project root directory?'))
  //   return false;
  // }
  // if(!packageDotJson.mintbean) {
  //   console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'))
  //   return false
  // }
  // if(packageDotJson.mintbean.scripts) {
  //   const { homepage } = packageDotJson.mintbean;
  //   const { predeploy, deploy } = packageDotJson.mintbean.scripts;
  //   if(!predeploy && !deploy) {
  //     console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'))
  //     return false
  //   }
  //   if(predeploy) {
  //     console.log(chalk.cyanBright('Preparing build for deploy...'))
  //     shell.exec(predeploy)
  //   }
  //   if(deploy) {
  //     console.log(chalk.cyanBright('Deploying...'))
  //     shell.exec(deploy)
  //     if(homepage) {
  //       console.log(chalk.cyanBright(`Deployed to`), chalk.bold.cyanBright(`${homepage}`))
  //     }
  //     console.log('(allow a minute or two for deploy to propogate...)')
  //   }
  // } else {
  //   console.log(chalk.red('No "mintbean">"scripts">"predeploy" or "deploy" found in package.json!'))
  // }
};

module.exports = {
  deploy,
};
