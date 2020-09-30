import yargs, { Argv } from 'yargs';
import { MintCommand } from '../../types';
import _ from 'lodash';
const MAX_SUBCOMMAND_DEPTH = 4;

export const parseCommand = (
  program: yargs.Argv<{}>,
  def: MintCommand,
  depth = 0
) => {
  if (++depth > MAX_SUBCOMMAND_DEPTH) {
    throw new Error('Max depth exceeded!');
  }

  if (def.commands.length > 0) {
    program.command(def.command, def.description, (program: Argv<{}>) => {
        let hasDefault = false;
        _.forEach(def.commands, cmd => {
          hasDefault = hasDefault || cmd.command === '*';
          return parseCommand(program, cmd, depth);
        });
        if (!hasDefault) {
          program.command('*', '', {}, () => {
            _.forEach(
              _.sortBy(def.commands, cmd => cmd.command),
              cmd => {
                hasDefault = hasDefault || cmd.command === '*';
                return parseCommand(program, cmd, depth);
              }
            );
            return program.showHelp('log');
          });
        }
      },
      def.callback,
    );
  } else if (def.callback) {
    program.command(
      def.command,
      def.description,
      def.options || {},
      def.callback
    );
  }
};
