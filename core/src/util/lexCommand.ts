const split = (command: string) => command.split(' ');
const isArgument = (token: string) => /^\[\w+\]$/g.test(token);
const isCommandFragment = (token: string) => /^\w+$/g.test(token);
const isFlag = (token: string) => /^--\w+$/g.test(token);

export const lex = (command: string): LexedCommand => {
  // It must start with "mint".
  if (command.indexOf('mint') !== 0) {
    throw new Error(
      'Commands must all start with "mint". Instead, the command we got was: ' +
        command
    );
  }
  const tokens = split(command);

  const endNode: any = {
    commandToken: null,
    flags: [],
    arguments: [],
    path: [],
  };
  let i;
  for (i = tokens.length - 1; i > 0; i--) {
    const token = tokens[i];

    if (isArgument(token)) {
      endNode.arguments.push(token);
    } else if (isFlag(token)) {
      endNode.arguments.push(token);
    } else if (isCommandFragment(token)) {
      endNode.commandToken = token;
      break;
    }
  }
  // We need the remaining path. It's here.
  endNode.path = [...tokens.slice(0, i)];
  // if commandToken is not there or path is not there, something went wrong
  if (!endNode.commandToken || !endNode.path) {
    console.log(endNode);
    throw new Error(
      'Unexpected state, please check the command if it is valid: ' + command
    );
  }
  return endNode;
};
