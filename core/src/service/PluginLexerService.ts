import { glob } from 'glob';
import { lex } from '../util/lexCommand';

/** The purpose of this service is to lex files into a readable commands bundle
 * @param dotMbFile - A singular configuration file containing information needed 
 * to load the plugin
 */

const lexFile = (dotMbFile: DotMintbeanFile) => {
  return dotMbFile.manifest.files.flatMap(fileGlob => {
    // files paths matching the manifest.files glob pattens
    const pluginCandidates = glob.sync(fileGlob, {
      absolute: true,
      cwd: dotMbFile.path,
    });

    // loop over file paths and replace with raw commands dynamically importing each file
    const rawCommands: RawCommand[] = pluginCandidates.map(filepath => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('esm')(module /*, options */)(filepath).default;
    });

    // TODO: validate rawCommands

    // return commands that have been lexed
    return rawCommands.map(lex);
  });
};

export class PluginLexerServiceImpl implements PluginLexerService {
  /**
   * @param dotMintbeanFiles A set of configuration files containing information 
   * needed to load the plugins
   */
  lexPlugin(
    dotMintbeanFiles: DotMintbeanFile[]
  ): PluginProjectDefinitionLexed[] {
    // Use mintbean manifests to return all files matching the manifest.files glob patterns
    const lexedCommands = dotMintbeanFiles.flatMap(lexFile);
    // Combine manifest metadata with Command files
    return dotMintbeanFiles.map(
      (lexedDef): PluginProjectDefinitionLexed => ({
        ...lexedDef,
        lexedCommands,
      })
    );
  }
}
