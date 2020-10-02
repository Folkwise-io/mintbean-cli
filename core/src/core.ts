import yargs from 'yargs';
import { pluginLoader } from './util/pluginLoader';

export const core = () => {
  const program = yargs;
  pluginLoader();

  program
    .completion()
    .recommendCommands()
    .strict();

  program.help().parse();
};
