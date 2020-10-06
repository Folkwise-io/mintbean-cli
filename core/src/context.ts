import { PluginLexerServiceImpl } from './service/PluginLexerService';
import { PluginIdentificationServiceImpl } from './service/PluginIdentificationService';

const contextBuilder = (): Context => {
  return {
    pluginIdentificationService: new PluginIdentificationServiceImpl(),
    pluginLexerService: new PluginLexerServiceImpl(),
  };
};

export { contextBuilder };
