import chalk from "chalk";
import { prompt } from "inquirer";
import execa from 'execa'
import deploymint from '../util/deploymint'

const verifyRemoteOrigin = async() => {
    const {stdout} = await execa('git', ['remote', '-v'])
    return stdout;
}


export const deployHandler = async () => {
  if (await !verifyRemoteOrigin()) {
    console.log(chalk.bold.red(`No git remote found! Are you in your project folder?`));
    process.exit(1);
  }

  const star = chalk.hex("#FFDF00")("✯✯✯");
  const featurePeek = `${star} FeaturePeek(Recommended) ${star}`;

  async function askPlatform() {
    const answers = await prompt([
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
      return await askPlatform();
    } else {
      return answers;
    }
  }

  const answers = await askPlatform();

  deploymint[answers.platform](process.argv, answers);
};
