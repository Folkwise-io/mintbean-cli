const chalk = require("chalk");
const shell = require("shelljs");
const connect = require("./connect").connect;
const hasRemoteOrigin = require("../lib/git").hasRemoteOrigin;
const parsePackageDotJson = require("../lib/files").parsePackageDotJson;
const inquirer = require("inquirer");
const deploymint = require("../deploymint/index");
const message = require("../lib/message");

const deploy = async () => {
  if (!hasRemoteOrigin()) {
    console.log(chalk.bold.red(`No git remote found! Are you in your project folder?`));
    process.exit(1)
  }

  
  const star = chalk.hex("#FFDF00")("✯✯✯");
  const featurePeek = `${star} FeaturePeek(Recommended) ${star}`;

  async function askPlatform() {
    const answers = await inquirer.prompt([
      {
        name: "platform",
        type: "list",
        message: "Choose a platform...",
        choices: [
          { name: featurePeek, value: "featurePeek" },
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
};

module.exports = {
  deploy,
};
