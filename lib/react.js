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
    pjson.set('homepage', `https://${username}.io/${project}/`).save(() => {
    console.log(chalk.green('updated "homepage" in package.json'))})

    // shell.exec(`node_modules/dot-json/bin/dot-json.js package.json homepage "https://${username}.io/${project}/"`);
    // console.log(process.cwd())

    console.log(chalk.green('Creating and connecting to new GitHub repo...'));
    // shell.exec(`hub create ${project}`);  // COMMENT OFF during testing to avoid repo spamming github
    shell.exec(`git remote rm origin`);
    shell.exec(`git remote add origin git@github.com:${username}/${project}.git`);
    shell.exec(`git remote -v`);

    console.log(chalk.green(`Done! 'cd ${project}' to get started coding!`))
  }
}
