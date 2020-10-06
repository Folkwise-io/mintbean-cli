import yargs from 'yargs';
import { parseCommand } from './util/parseCommand';
import { pluginLoader } from './util/pluginLoader';

export const core = (): void => {
  const program = yargs;
  const plugins: CommandBranch = pluginLoader();
  // TODO: Setup `mint` root command here
  for (const child in plugins.children) {
    parseCommand(program, plugins.children[child]);
  }

  program
    .command('*', false, {}, () => {
      return program.showHelp();
    })
    .completion()
    .recommendCommands()
    .strict();

  program.help().parse();
};
