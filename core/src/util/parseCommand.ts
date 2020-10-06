import yargs, { Argv, Options } from 'yargs';

export interface MintCommand2 {
  command: string;
  args: string[];
  description: string;
  options: { [key: string]: Options };
  handler?: (args: Arguments) => void;
  children: MintCommand2[];
}

export interface MintCommand {
  command: LexedCommand;
  description: string;
  options: yargs.Options;
  callback?: yargs.ParseCallback;
  children: MintCommand[];
}

export const parseCommand = (
  program: yargs.Argv<Record<string, unknown>>,
  def: CommandBranch
): void => {
  if (def.children) {
    program.command(
      def.command,
      def.description,
      (program: Argv<Record<string, unknown>>) => {
        for (const child in def.children) {
          return parseCommand(program, def.children[child]);
        }
        program.command('*', '', {}, () => {
          return program.showHelp('log');
        });
      },
      def.handler
    );
  }

  program.command(def.command, def.description, {}, def.handler);
};
