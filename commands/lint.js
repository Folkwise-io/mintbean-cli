import chalk from 'chalk';

export const lint = (lintSources = 'src/') => {
  console.log(chalk.cyanBright('Linting...'));

  const cp = require('child_process');

  const eslint = cp.spawn('eslint', [lintSources], {
    stdio: ['inherit', 'inherit', 'pipe']
  });

  eslint.on('error', (error) => {
      if (error.errno === -2) {
        // Better ENOENT error message
        console.log(chalk.red('error: Directory "src" not found: "mint lint" should be ran from the project\'s root directory'))
      } else {
        console.log(chalk.red(`error: ${error.message}`));
      }
  });
};

