import chalk from 'chalk';
import cp from 'child_process';

export const lint = (lintSources = 'src/') => {
  const path = __dirname + '/../node_modules/eslint/bin/eslint.js'

  const eslint = cp.spawn(path, [lintSources], {
    stdio: ['inherit', 'inherit', 'pipe']
  });

  eslint.on('error', (error) => {
      if (error.errno === -2) {
        console.log(chalk.red(`error: ${error.message}`));
      }
  });
};


