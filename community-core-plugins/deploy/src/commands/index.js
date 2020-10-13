import { deployHandler } from "../handlers/index";

const deploy = {
  command: "mint deploy",
  description: "This command will walk you through deployment",
  handler: deployHandler,
};

export default deploy;
