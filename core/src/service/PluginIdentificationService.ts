import path from 'path';
// import klawSync from 'klaw-sync';
import glob from 'glob';
import fs from 'fs-extra';

/* 
  The purpose of the service is to go into the 
  global plugins folder & grab all plugin manifests 
  manifests in our config-file .mintbean
*/

/** @param dotMintbeanPaths - array of path strings leading to the definition file of each plugin */
const grabDotMintbeanFile = (dotMintbeanPaths: string[]): DotMintbeanFile[] => {
  return dotMintbeanPaths.map((mintbeanDec: string) => {
    // return a new object with the config file and the path
    return {
      manifest: fs.readJSONSync(mintbeanDec),
      path: path.resolve(mintbeanDec, '..'),
    };
  });
};

export class PluginIdentificationServiceImpl
  implements PluginIdentificationService {
  // TODO: make this async, this is an architectural change
  // where the CLI needs to also then be async
  findPlugins(): DotMintbeanFile[] {
    // Grab plugins directory
    const rootDir = path.resolve(__filename, '../../..');
    // Grab all plugin Definition files
    const dotMintbeanPaths = glob.sync('**/.mintbean', {
      cwd: rootDir,
      absolute: true,
    });

    // map over definition files and parse data
    const definitions = grabDotMintbeanFile(dotMintbeanPaths);

    // TODO: Validate the plugin definitions

    return definitions;
  }
}
