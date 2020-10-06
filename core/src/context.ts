import { PluginLexerServiceImpl } from './service/PluginLexerService';
import { PluginIdentificationServiceImpl } from './service/PluginIdentificationService';
import { PluginTreeBuilderServiceImpl } from './service/PluginTreeBuilderService'
import { CommandStitcherServiceImpl } from './service/CommandStitcherService'
import { Argv } from 'yargs';

const contextBuilder = (): Context<Argv> => {
  return {
    pluginIdentificationService: new PluginIdentificationServiceImpl(),
    pluginLexerService: new PluginLexerServiceImpl(),
    PluginTreeBuilderService: new PluginTreeBuilderServiceImpl(),
    CommandStitcherService: new CommandStitcherServiceImpl(),
  };
};

export { contextBuilder };
