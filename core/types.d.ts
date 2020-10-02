interface LexedCommand {
  commandToken: string;
  flags: string[];
  arguments: string[];
  path: Path;
}

type Path = string[];

interface MintPluginDes {
  dec: {
    title: string;
    namespaces: string[];
    exclude: string[];
    files: string[];
    protected: boolean;
  };
  path: string;
}

type User = {
  username: string;
  password: 'hidden';
};

interface Context {
  logger: any;
  user: User;
  persistence: any;
  userService: any;
  registrar: (key: string, value: any | null) => void;
}

interface PluginLifecycleHook {
  order: number; // higher is sooner
  callback?: () => void;
}

interface MintCommand {
  command: LexedCommand;
  description: string;
  options: { [key: string]: any };
  callback?: (args: Arguments<unknown>) => void;
}

type Arguments<T = {}> = T & {
  _: string[];
  $0: string;
  [argName: string]: unknown;
};

interface MintPlugin<C> {
  lifecycle: {
    // determines order of command inside --help
    commandRegistration: PluginLifecycleHook;
  };
  // Contains the command to be added to the CLI
  command: MintCommand;
  // Adds stuff to context
  registerContext: (
    setContext: Context['registrar'],
    key: string,
    value: any | null
  ) => { setContext(key: string, value: any | null): void };
}
