const chalk = require('chalk');
const shell = require('shelljs');
const DotJson = require('dot-json');

module.exports = {
  createReactApp: (project, username) => {
    console.log(chalk.cyanBright('Creating react app with gh-pages...'));
    shell.exec(`create-react-app ${project} --template cra-template-mintbean-challenge-react-starter`);

    console.log(chalk.cyanBright('Changing into project directory...'));
    process.chdir(`./${project}`);
    console.log(process.cwd())

    console.log(chalk.cyanBright('Updating package.json...'));
    const pjson = new DotJson('package.json')
    pjson.set('homepage', `https://${username}.github.io/${project}/`).save(() => {
    console.log(chalk.cyanBright('updated "homepage" in package.json'))})

    console.log(chalk.cyanBright('Creating and connecting to new GitHub repo...'));
    shell.exec(`hub create ${project}`);  // COMMENT OFF during testing to avoid repo spamming github

    console.log(chalk.cyanBright('Your git remote: '));
    shell.exec(`git remote -v`);
    console.log(chalk.cyanBright('Pushing master branch to remote...'));
    shell.exec(`git add .`);
    shell.exec(`git commit -m "update package.json"`);
    shell.exec(`git push origin master`);

    console.log(chalk.cyanBright('Making initial deploy to GitHub pages...'));
    shell.exec(`react-scripts build`);
    shell.exec(`gh-pages -d build`);

    console.log(chalk.blue(`\n\nYour deploy link: `), chalk.bold.blue(`https://${username}.github.io/${project}/`));
    console.log(chalk.blue(`(may take a few minutes for first deploy to propogate)`));
    console.log(chalk.blue(`For future deploys, push your changes to master(origin) then run `),chalk.bold.cyanBright('yarn deploy'));
    console.log(chalk.cyanBright(`Done! 'cd ${project}' to get started coding!`))
  }
}
