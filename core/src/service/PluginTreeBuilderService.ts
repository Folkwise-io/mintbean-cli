import chalk from 'chalk';

/**
 * @param rootTree - A command object that all command branches will attach to
 * @param pluginBundle - A plugin bundle contains all of the command definitions and metadata for the plugin
 */
const createBranch = (
  rootTree: CommandBranchChildren,
  pluginBundle: PluginProjectDefinitionLexed
) => {
  // Create a branch for each command in the plugin off the main tree
  pluginBundle.lexedCommands.reduce(
    (branch: CommandBranchChildren, lexedCommand): CommandBranchChildren => {
      // Create a walkable version of the branch
      let subBranch: CommandBranchChildren = branch;
      const { command, path, qualifiedCommand } = lexedCommand;
      // Walk through the branch to the appropriate subBranch
      path.forEach(fragment => {
        // Create branch if necessary
        subBranch[fragment] = subBranch[fragment] || {
          children: {},
        };

        // Switch to children branch of subBranch
        subBranch = subBranch[fragment].children || {};
      });
      // Create child if it doesn't exist
      subBranch[command] = subBranch[command] || {
        children: {},
      };
      // Check for command for conflicts throws error if true
      if (subBranch[command].command === command) {
        throw new Error(
          chalk.red(
            `${subBranch[command].qualifiedCommand} is in conflict with ${qualifiedCommand} from plugin at ${pluginBundle.path}`
          )
        );
      } else {
        // Populate child with command branch
        subBranch[command] = {
          ...lexedCommand,
          ...subBranch[command],
        };
      }
      return branch;
    },
    rootTree
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
      return PluginProjectDefinitionsLexed.reduce((rootTree, pluginBundle) => {
        // Create Branch for each namespace
        createBranch(rootTree, pluginBundle);
        return rootTree;
      }, {});
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}
