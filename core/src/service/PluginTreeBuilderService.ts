import chalk from 'chalk';

const createBranch = (
  mainTree: CommandBranchChildren,
  subBranch: PluginProjectDefinitionLexed
) => {
  const { lexedCommands, path } = subBranch;
  const grabPath = () => path;
  // Create a branch for each command in the plugin off the main tree
  return lexedCommands.reduce(
    (tree: CommandBranchChildren, subBranch): CommandBranchChildren => {
      // Create a walkable version of the tree
      let branch: CommandBranchChildren = tree;
      const { command, path, qualifiedCommand } = subBranch;
      // Walk through the tree to the appropriate branch
      path.forEach(fragment => {
        // Create branch if necessary
        branch[fragment] = branch[fragment] || {
          children: {},
        };

        // Switch to children branch of tree
        branch = branch[fragment].children || {};
      });
      // Create child if it doesn't exist
      branch[command] = branch[command] || {
        children: {},
      };
      // Check for command for conflicts throws error if true
      if (branch[command].command) {
        throw new Error(
          chalk.red(
            `${
              branch[command].qualifiedCommand
            } is in conflict with ${qualifiedCommand} from plugin at ${grabPath()}`
          )
        );
      } else {
        // Populate child with command branch
        branch[command] = {
          ...subBranch,
          ...branch[command],
        };
      }
      return tree;
    },
    mainTree
  );
};

export class PluginTreeBuilderServiceImpl implements PluginTreeBuilderService {
  // Create Command Tree from all plugin files
  createTree(
    PluginProjectDefinitionsLexed: PluginProjectDefinitionLexed[]
  ): CommandBranchChildren {
    try {
      return PluginProjectDefinitionsLexed.reduce((mainTree, subBranch) => {
        // Create Branch for each namespace
        createBranch(mainTree, subBranch);
        return mainTree;
      }, {});
    } catch (error) {
      console.error(error)
      return {};
    }
  }
}
