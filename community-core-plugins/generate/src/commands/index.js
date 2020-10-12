import { newProject } from "../handlers/index";

// Command Definition
const generate = {
  command: "mint generate [projectName]",
  description: "This command will walk you through project creation. Run mint generate --help for project type specific commands",
  handler: newProject,
};

export default generate;
