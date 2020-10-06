import { contextBuilder } from './context';

export const core = ():void => {
  const context = contextBuilder();
  const plugins = context.pluginIdentificationService.findPlugins();
  const lexedPlugins = context.pluginLexerService.lexPlugin(plugins);
  const commandTree =context.PluginTreeBuilderService.createTree(lexedPlugins)
  console.log(commandTree);
  
};
