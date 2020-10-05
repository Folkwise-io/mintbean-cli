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
    namespaces: string;
    exclude: string[];
    files: string[]
    entry: string;
    protected: boolean;
  };
  path: string;
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
