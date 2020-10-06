interface RawCommand {
  command: string;
  description: string;
  args: string[];
  handler?: (args: Arguments) => void;
}

interface LexedCommand extends RawCommand {
  qualifiedCommand: string;
  flags: string[];
  path: string[];
}

interface CommandBranch extends LexedCommand {
  protected?: boolean;
  children?: CommandBranchChildren;
  handler?: (args: Arguments<unknown>) => void;
}

interface CommandBranchChildren {
  [command: string]: CommandBranch | Partial<CommandBranch>;
}

interface DotMintbeanFile {
  manifest: {
    title: string;
    namespaces: string[];
    exclude: string[];
    files: string[];
    protected: boolean;
  };
  path: string;
}

interface PluginProjectDefinitionLexed extends DotMintbeanFile {
  lexedCommands: LexedCommand[];
}

type User = {
  username: string;
  password: 'hidden';
};

interface PluginLifecycleHook {
  order: number; // higher is sooner
  callback?: () => void;
}

type Arguments<T = Record<string, unknown>> = T & {
  _: string[];
  $0: string;
  [argName: string]: unknown;
};

interface PluginIdentificationService {
  findPlugins(): DotMintbeanFile[];
}

interface PluginLexerService {
  lexPlugin(
    dotMintbeanFiles: DotMintbeanFile[]
  ): PluginProjectDefinitionLexed[];
}

interface PluginTreeBuilderService {
  createTree(
    PluginProjectDefinitionsLexed: PluginProjectDefinitionLexed[]
  ): CommandBranchChildren;
}

interface Context {
  pluginIdentificationService: PluginIdentificationService;
  pluginLexerService: PluginLexerService;
  PluginTreeBuilderService: PluginTreeBuilderService;
}
