import { Argv } from 'yargs';

export class CommandStitcherServiceImpl
  implements CommandStitcherService<Argv> {
  parseCommand = (
    program: Argv<Record<string, unknown>>,
    def: CommandBranch
  ): void => {
    if (Object.keys(def.children).length) {
      program.command(
        def.command,
        def.description,
        (program: Argv<Record<string, unknown>>) => {
          for (const child in def.children) {
            this.parseCommand(program, def.children[child]);
          }
          program.command('*', '', {}, () => {
            return program.showHelp('log');
          });
        },
        def.handler
      );
    } else {
      const commandWithArgs = def.args.length
        ? def.command + ` ${def.args}`
        : def.command;
      program.command(commandWithArgs, def.description, {}, def.handler);
    }
  };
}
