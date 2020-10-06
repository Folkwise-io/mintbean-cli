import { contextBuilder } from './context';

export const core = () => {
  const context = contextBuilder();
  const plugins = context.pluginIdentificationService.findPlugins();
  console.log(
    context.pluginLexerService
      .lexPlugin(plugins)
      .map(x => x.lexedCommands.map(y => y.qualifiedCommand))
  );
};
