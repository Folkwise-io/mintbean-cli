import chalk from 'chalk';

/**
 * @param mainTree - A command object that all command branches will attach to
 * @param pluginBundle - A plugin bundle contains all of the command definitions and metadata for the plugin
 */
const createBranch = (
  mainTree: CommandBranchChildren,
  pluginBundle: PluginProjectDefinitionLexed
) => {
  // Create a branch for each command in the plugin off the main tree
  pluginBundle.lexedCommands.reduce(
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
            `${branch[command].qualifiedCommand} is in conflict with ${qualifiedCommand} from plugin at ${pluginBundle.path}`
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
  /** Create Command Tree from all plugin files
   * @param PluginProjectDefinitionsLexed - Array of plugin data
   */
  createTree(
    PluginProjectDefinitionsLexed: PluginProjectDefinitionLexed[]
  ): CommandBranchChildren {
    try {
      return PluginProjectDefinitionsLexed.reduce((mainTree, pluginBundle) => {
        // Create Branch for each namespace
        createBranch(mainTree, pluginBundle);
        return mainTree;
      }, {});
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
