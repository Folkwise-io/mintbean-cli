import shell from 'shelljs';
import chalk from 'chalk';

// this syntax works for both 'yarn' and 'npm'
export const installPackagesCmd = (packageManager) => {
  console.log(`${packageManager} install`);
  return `${packageManager} install`
}
