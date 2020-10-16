import { deployHandler } from "../handlers/index";

const featurepeek = {
  command: "mint deploy featurepeek",
  description: "This command will walk you through a featurepeek deployment",
  handler: () => {deployHandler({ platform: "featurePeek" });}
};

export default featurepeek;
