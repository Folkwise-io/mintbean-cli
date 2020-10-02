import path from 'path';
import klaw from 'klaw';
import glob from 'glob';
import fs from 'fs-extra';
import { lex } from './lexCommand';

const addCommandTreeBranch = (
  files: MintPluginDes['dec']['files'],
  commandTree: any
) => {
  require = require('esm')(module /*, options */);
  const lexCommands = files.map(file => {
    const plugin = require(file).default;
    return  lex(plugin.command);
  });
  lexCommands.reduce((acc:any, cur:LexedCommand) => {

  }, commandTree);
};

const buildCommandTree = (plugins: MintPluginDes[]) => {
  const commandTree = {};
  plugins.forEach((plugin: MintPluginDes) => {
    addCommandTreeBranch(plugin.dec.files, commandTree);
  });
};

const grabMintDef = (pluginsPaths: string[]): MintPluginDes[] => {
  return pluginsPaths.map((pluginPath: string) => {
    const mintbeanDec = path.join(pluginPath, '.mintbean');
    return { dec: fs.readJSONSync(mintbeanDec), path: pluginPath };
  });
};

const grabPluginFiles = (plugins: MintPluginDes[]): void => {
  plugins.forEach((plugin: MintPluginDes) => {
    plugin.dec.files = plugin.dec.files.flatMap((file: string) => {
      return glob.sync(file, {
        cwd: plugin.path,
        ignore: ['node_modules', ...plugin.dec.exclude],
        absolute: true,
      });
    });
  });
};

export const pluginLoader = () => {
  let pluginsPaths: string[] = []; // files, directories, symlinks, etc
  let plugins: MintPluginDes[];
  const pluginsDir = path.resolve(__filename, '../../../plugins');

  klaw(pluginsDir, {
    filter: path => !path.includes('node_modules'),
    depthLimit: 0,
  })
    .on('data', item => {
      if (item.path !== pluginsDir) {
        pluginsPaths.push(item.path);
      }
    })

    .on('end', () => {
      plugins = grabMintDef(pluginsPaths);
      grabPluginFiles(plugins);
      buildCommandTree(plugins);
    });
};
