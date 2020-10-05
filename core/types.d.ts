interface LexedCommand {
  command: string;
  fullCommand: string;
  flags: string[];
  args: string[];
  path: Path;
  [key: string]: unknown
}

interface CommandBranch {
  command: string;
  fullCommand: string;
  description: string;
  flags: string[];
  args: string[];
  path: Path;
  children?: CommandBranchChildren;
  handler?: (args: Arguments<unknown>) => void;
}
interface CommandBranchChildren {
  [command: string]: CommandBranch
}

type Path = string[];

interface PluginProjectDefinition {
  dec: {
    title: string;
    namespaces: string;
    exclude: string[];
    files: string[]
    entry: string;
    protected: boolean;
  };
  path: string;
}

interface PluginProjectDefinitionLexed extends PluginProjectDefinition {
  lexedCommands: LexedCommand[];
}

type User = {
  username: string;
  password: 'hidden';
};

// interface Context {
//   logger: any;
//   user: User;
//   persistence: any;
//   userService: any;
//   registrar: (key: string, value: any | null) => void;
// }

interface PluginLifecycleHook {
  order: number; // higher is sooner
  callback?: () => void;
}

type Arguments<T = Record<string, unknown>> = T & {
  _: string[];
  $0: string;
  [argName: string]: unknown;
};
