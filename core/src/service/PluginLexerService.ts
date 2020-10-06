import { glob } from 'glob';
import { lex } from '../util/lexCommand';

const lexFile = (dotMbFile: DotMintbeanFile) => {
  return dotMbFile.manifest.files.flatMap(fileGlob => {
    const pluginCandidates = glob.sync(fileGlob, {
      absolute: true,
      cwd: dotMbFile.path,
    });

    const rawCommands: RawCommand[] = pluginCandidates.map(filepath => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('esm')(module /*, options */)(filepath).default;
    });

    return rawCommands.map(lex);
  });
};

export class PluginLexerServiceImpl implements PluginLexerService {
  lexPlugin(
    dotMintbeanFiles: DotMintbeanFile[]
  ): PluginProjectDefinitionLexed[] {
    const lexedCommands = dotMintbeanFiles.flatMap(lexFile);
    return dotMintbeanFiles.map(
      (lexedDef): PluginProjectDefinitionLexed => ({
        ...lexedDef,
        lexedCommands,
      })
    );
  }
}
