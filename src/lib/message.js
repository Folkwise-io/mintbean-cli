import chalk from 'chalk';
import figlet from 'figlet';

export const banner = () => {
  console.log(
      chalk.cyanBright(
        figlet.textSync('Mint', { horizontalLayout: 'full' })
      )
    );
    console.log(
      chalk.whiteBright('Let mint do the hard work... you do the coding \n')
    );
}
