import yargs, { Arguments } from 'yargs';

type user = {
  username: string;
  password: 'hidden';
};

interface Context {
  logger: any;
  user: user;
  persistence: any;
  userService: any;
  registrar: (key: string, value: any | null) => void;
}

interface PluginLifecycleHook {
  order: number; // higher is sooner
  callback?: () => void;
}

interface MintCommand {
  command: string;
  description: string;
  options?: yargs.Options | {};
  callback?: (args: Arguments<unknown>) => void;
  commands: MintCommand[];
}


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


