import { Argv } from 'yargs';

export class CommandStitcherServiceImpl
  implements CommandStitcherService<Argv> {
  /**
   * The purpose of the service is to take a command tree
   * and turn it into actual cli commands
   * @param program - CLI package of our choice currently yargs
   * @param commandBranch - A branch of the command tree
   * ready to be turned into commands for program
   */
  parseCommand = (
    program: Argv<Record<string, unknown>>,
    commandBranch: CommandBranch
  ): void => {
    // Combine command with its args 
    const commandWithArgs = commandBranch.args.length
      ? commandBranch.command + ` ${commandBranch.args.join(" ")}`
      : commandBranch.command;
    // Check for children
    if (Object.keys(commandBranch.children).length) {
      // Create command with children
      program.command(
        commandWithArgs,
        commandBranch.description,
        (program: Argv<Record<string, unknown>>) => {
          // Loop over children and recursively repeat the process
          for (const child in commandBranch.children) {
            this.parseCommand(program, commandBranch.children[child]);
          }

          if (!commandBranch.handler) {
            // if command has a handler default will run handler
            program.command('*', '', {}, commandBranch.handler);
          } else {
            // Add a default command to show the help menu when a command isn't recognized or no command is given
            program.command('*', 'Show Help', {}, () => {
              return program.showHelp('log');
            });
          }
        }
      );
    } else {
      // When a command has no children construct a command without builder
      program.command(
        commandWithArgs,
        commandBranch.description,
        {},
        commandBranch.handler
      );
    }
  };
}
