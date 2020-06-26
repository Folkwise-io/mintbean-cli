const chalk = require('chalk');
const figlet = require('figlet');

module.exports = {
  banner: () => {
    console.log(
      chalk.cyanBright(
        figlet.textSync('Mint', { horizontalLayout: 'full' })
      )
    );
    console.log(
      chalk.whiteBright('Let mint do the hard work... you do the coding \n')
    );
  }
}
