import path from 'path';
import klawSync from 'klaw-sync';
import fs from 'fs-extra';

const grabDotMintbeanFile = (pluginsPaths: string[]): DotMintbeanFile[] => {
  return pluginsPaths.map((pluginPath: string) => {
    const mintbeanDec = path.join(pluginPath, '.mintbean');
    return {
      manifest: fs.readJSONSync(mintbeanDec),
      path: pluginPath,
    };
  });
};

export class PluginIdentificationServiceImpl
  implements PluginIdentificationService {
  // TODO: make this async, this is an architectural change
  // where the CLI needs to also then be async
  findPlugins(): DotMintbeanFile[] {
    const pluginsDir = path.resolve(__filename, '../../../plugins');
    const pluginsPaths = klawSync(pluginsDir, {
      filter: ({ path }) => !path.includes('node_modules/'),
      depthLimit: 0,
    });

    const definitions = grabDotMintbeanFile(
      pluginsPaths.map(item => item.path)
    );

    // TODO: Validate the plugin definitions

    return definitions;
  }
}
