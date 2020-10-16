import { deployHandler } from "../handlers/index";

const ghPages = {
  command: "mint deploy gh-pages",
  description: "This command will deploy to github pages",
  handler: () => {
    deployHandler({ platform: "ghPages" });
  },
};

export default ghPages;
