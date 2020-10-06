import path from 'path';
import klawSync from 'klaw-sync';
// import { MintCommand2 } from './parseCommand';
import glob from 'glob';
import fs from 'fs-extra';
import { lex } from './lexCommand';
import { MintCommand2 } from './parseCommand';

const grabPlugin = (file: string): LexedCommand => {
  /* eslint-disable no-global-assign, @typescript-eslint/no-var-requires*/
  require = require('esm')(module /*, options */);
  const plugin: MintCommand2 = require(file).default;
  /* eslint-enable */
  return { ...plugin, ...lex(plugin.command) };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const createTree = (commands: LexedCommand[], cmdTree: any) => {
  return commands.reduce((acc, cur): Record<string, unknown> => {
    let branch: any = acc;
    /* eslint-enable*/
    const { command, path, fullCommand } = cur;
    path.forEach(fragment => {
      if (!branch[fragment]) {
        branch[fragment] = {
          children: {},
        };
      }
      branch = branch[fragment].children;
    });
    if (!branch[command]) {
      branch[command] = {
        children: {},
      };
    }

    if (branch[command].command) {
      console.log(
        `conflict path ${branch[command].fullCommand}already exists and cannot be over written with ${fullCommand}`
      );
    } else {
      branch[command] = {
        ...cur,
        ...branch[command],
      };
    }
    return acc;
  }, cmdTree);
};

const grabMintDef = (pluginsPaths: string[]): MintPluginDes[] => {
  return pluginsPaths.map((pluginPath: string) => {
    const mintbeanDec = path.join(pluginPath, '.mintbean');
    return { dec: fs.readJSONSync(mintbeanDec), path: pluginPath };
  });
};

const loadPluginFiles = (plugin: MintPluginDes) => {
  const { files } = plugin.dec;
  const pattern = `${files.join('|')}`;

  const plugInFiles = glob.sync(pattern, {
    absolute: true,
    cwd: plugin.path,
  });

  return plugInFiles.map(path => grabPlugin(path));
};

export const pluginLoader = (): Record<string, unknown> => {
  const pluginsDir = path.resolve(__filename, '../../../plugins');
  const pluginsPaths = klawSync(pluginsDir, {
    filter: ({ path }) => !path.includes('node_modules'),
    depthLimit: 0,
  });
  const pluginsDes = grabMintDef(pluginsPaths.map(item => item.path));
  const plugins = pluginsDes.map(def => loadPluginFiles(def));
  const commandTree = {};
  plugins.forEach(plugin => {
    sortCommands(plugin);
    createTree(plugin, commandTree);
  });

  console.log(plugins);

  return {};

  // return createTree(pluginsDes);
};
