import chalk from 'chalk';
import shell from 'shelljs';
import * as files from '../lib/files';

export const develop = () => {
  const PKG = files.parsePackageDotJson();
  const developScript = (((PKG || {}).mintbean || {}).scripts || {}).develop;
  if (developScript) {
    console.log(
      chalk.cyanBright("Starting development server with hot reloading...")
    );
    shell.exec(developScript);
  } else {
    console.log(
      chalk.red(
        'Error: no script called "develop" found in package.json > mintbean> scripts'
      )
    );
    return false;
  }
}
