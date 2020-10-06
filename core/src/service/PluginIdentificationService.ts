import path from 'path';
import klawSync from 'klaw-sync';
import fs from 'fs-extra';

/* 
  The purpose of the service is to go into the 
  global plugins folder & grab all plugin manifests 
*/

// Grab config file
/** @param pluginsPaths - array of path strings leading to the root dir of each plugin */
const grabDotMintbeanFile = (pluginsPaths: string[]): DotMintbeanFile[] => {
  return pluginsPaths.map((pluginPath: string) => {
    const mintbeanDec = path.join(pluginPath, '.mintbean');
    // return a new object with the config file and the path
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
    // Grab plugins directory
    const pluginsDir = path.resolve(__filename, '../../../plugins');
    // Grab all plugin Directories
    const pluginsPaths = klawSync(pluginsDir, {
      filter: ({ path }) => !path.includes('node_modules/'),
      depthLimit: 0,
    });
    // map over directories and grab config file
    const definitions = grabDotMintbeanFile(
      pluginsPaths.map(item => item.path)
    );

    // TODO: Validate the plugin definitions

    return definitions;
  }
}
