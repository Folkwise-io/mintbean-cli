import yargs from 'yargs';
import { parseCommand } from './util/parseCommand';
import samplePlugin from './plugins/samplePlugin';

export const core = () => {
  const program = yargs;
  parseCommand(program, samplePlugin);

  program
    .completion()
    .recommendCommands()
    .strict();

  program.help().argv;
};
