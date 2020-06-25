const chalk = require('chalk');
const shell = require('shelljs');
const DotJson = require('dot-json');

module.exports = {
  createReactApp: (project, username) => {
    console.log(chalk.green('Creating react app with gh-pages...'));
    shell.exec(`create-react-app ${project} --template cra-template-mintbean-challenge-react-starter`);

    console.log(chalk.green('Changing into project directory...'));
    process.chdir(`./${project}`);
    console.log(process.cwd())

    console.log(chalk.green('Updating package.json...'));
    const pjson = new DotJson('package.json')
    pjson.set('homepage', `https://${username}.github.io/${project}/`).save(() => {
    console.log(chalk.green('updated "homepage" in package.json'))})

    console.log(chalk.green('Creating and connecting to new GitHub repo...'));
    shell.exec(`hub create ${project}`);  // COMMENT OFF during testing to avoid repo spamming github
    // shell.exec(`git remote rm origin`);
    // shell.exec(`git remote add origin git@github.com:${username}/${project}.git`);
    shell.exec(`git remote -v`);

    console.log(chalk.green('Making initial deploy to GitHub pages...'));
    shell.exec(`react-scripts build`);
    shell.exec(`gh-pages -d build`);

    console.log(chalk.blue(`\n\nYour deploy link: `), chalk.bold.blue(`https://${username}.github.io/${project}/`));
    console.log(chalk.blue(`(may take a few minutes for first deploy to propogate)`));
    console.log(chalk.blue(`For future deploys, push your changes to master(origin) then run `),chalk.bold.cyanBright('yarn deploy'));
    console.log(chalk.green(`Done! 'cd ${project}' to get started coding!`))
  }
}
