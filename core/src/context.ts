import { PluginLexerServiceImpl } from './service/PluginLexerService';
import { PluginIdentificationServiceImpl } from './service/PluginIdentificationService';
import { PluginTreeBuilderServiceImpl } from './service/PluginTreeBuilderService'

const contextBuilder = (): Context => {
  return {
    pluginIdentificationService: new PluginIdentificationServiceImpl(),
    pluginLexerService: new PluginLexerServiceImpl(),
    PluginTreeBuilderService: new PluginTreeBuilderServiceImpl(),
  };
};

export { contextBuilder };
