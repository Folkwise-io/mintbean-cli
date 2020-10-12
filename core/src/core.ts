import { contextBuilder } from './context';
import yargs from 'yargs';
import chalk from 'chalk';

export const core = (): void => {
  const program = yargs;
  const context = contextBuilder();
  const plugins = context.pluginIdentificationService.findPlugins();
  const lexedPlugins = context.pluginLexerService.lexPlugin(plugins);
  const commandTree = context.PluginTreeBuilderService.createTree(lexedPlugins)
    .mint.children;
  // TODO: Setup `mint` root command here
  for (const command in commandTree) {
    context.CommandStitcherService.parseCommand(program, commandTree[command]);
  }

  // TODO: Create Custom help command
  const askedHelp = process.argv.find(el => /^--help$/g.test(el));
  askedHelp &&
    console.log(chalk.bgBlack.hex('#02ed9d').underline('Mintbean CLI is here to help!'));
  

  
  program
    .completion()
    .showHelpOnFail(false)
    .recommendCommands()
    .help()
    .strict();

  program.parse();
};
