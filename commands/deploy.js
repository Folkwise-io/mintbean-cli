import chalk from "chalk";
import { hasRemoteOrigin } from "../lib/git";
import inquirer from "inquirer";
import deploymint from "../deploymint/index";

export const deploy = async () => {
  if (!hasRemoteOrigin()) {
    console.log(
      chalk.bold.red(`No git remote found! Are you in your project folder?`)
    );
    process.exit(1);
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
