const split = (command: string) => command.split(' ');
const isArgument = (token: string) => /^\[\w+\]$/g.test(token);
const isCommandFragment = (token: string) => /^\w+$/g.test(token);
const isFlag = (token: string) => /^--\w+$/g.test(token);

export const lex = (rawCommand: RawCommand): LexedCommand => {
  const { command: qualifiedCommand, description, args, handler } = rawCommand;

  // It must start with "mint".
  if (qualifiedCommand.indexOf('mint') !== 0) {
    throw new Error(
      'Commands must all start with "mint". Instead, the command we got was: ' +
        qualifiedCommand
    );
  }
  const tokens = split(qualifiedCommand);

  const endNode: LexedCommand = {
    command: '', // This is NOT the same as the RawCommand.command
    description,
    flags: [],
    args: args || [],
    path: [],
    qualifiedCommand,
    handler,
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
  endNode.path = [...tokens.slice(0, i)];
  // if command is not there or path is not there, something went wrong
  if (!endNode.command || !endNode.path) {
    console.log(endNode);
    throw new Error(
      'Unexpected state, please check the command if it is valid: ' +
        qualifiedCommand
    );
  }
  return endNode;
};
