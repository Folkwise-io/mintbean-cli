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

  const endNode: LexedCommand = {
    command: '',
    flags: [],
    args: [],
    path: [],
    fullCommand: '',
  };
  let i;
  for (i = tokens.length - 1; i > 0; i--) {
    const token = tokens[i];

    if (isArgument(token)) {
      endNode.args.push(token);
    } else if (isFlag(token)) {
      endNode.args.push(token);
    } else if (isCommandFragment(token)) {
      endNode.command = token;
      break;
    }
  }
  // We need the remaining path. It's here.
  endNode.fullCommand = command;
  endNode.path = [...tokens.slice(0, i)];
  // if command is not there or path is not there, something went wrong
  if (!endNode.command || !endNode.path) {
    console.log(endNode);
    throw new Error(
      'Unexpected state, please check the command if it is valid: ' + command
    );
  }
  return endNode;
};
