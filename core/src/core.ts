import { contextBuilder } from './context';
import yargs from 'yargs';

export const core = (): void => {
  const program = yargs;
  const context = contextBuilder();
  const plugins = context.pluginIdentificationService.findPlugins();
  const lexedPlugins = context.pluginLexerService.lexPlugin(plugins);
  const commandTree = context.PluginTreeBuilderService.createTree(lexedPlugins)
    .mint.children;
  for (const command in commandTree) {
    context.CommandStitcherService.parseCommand(program, commandTree[command]);
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
