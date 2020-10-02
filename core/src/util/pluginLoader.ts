import path from 'path';
import klaw from 'klaw';
import glob from 'glob';
import fs from 'fs-extra';
import { lex } from './lexCommand';

const addCommandTreeBranch = (
  files: MintPluginDes['dec']['files'],
  commandTree: any
) => {
  // eslint-disable-next-line no-native-reassign
  require = require('esm')(module /*, options */);
  const plugins = files.map((file: string) => {
    const plugin: any = require(file).default;
    return {
      ...plugin,
      command: lex(plugin.command),
    };
  });
  plugins.reduce((acc: any, cur: MintCommand) => {
    const { path, commandToken } = cur.command;
    let current = acc;
    for (let i = 0; i < path.length; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    current[commandToken] = {
      command: commandToken,
      arguments: cur.command.arguments,
      description: cur.description,
      callback: cur.callback,
      ...current[commandToken],
    };
    return acc;
  }, commandTree);
  console.log(commandTree);
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
