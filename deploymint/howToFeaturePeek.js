const terminalLink = require("terminal-link");


function createLink(as, url) {
  return terminalLink(as, url);
}

let description = {
  description: [
    "# FeaturePeek gives you super speed and more! Deploy in a flash!",
    `# Also checkout their other revolutionary features ${createLink(
      "here",
      "https://youtu.be/OSvst-lCySE"
    )}`,
    "# Copy paste the following commands to get started.",
  ],
};
let gettingStarted = {command:"npm install -g @featurepeek/peek"};

let login = {
  command: "featurepeek login",
  instructions: [
    "# this will create a FeaturePeek account for you if you don't have one already, and authenticate you in your CLI.",
  ],
};

let init = {
  command: "featurepeek init",
  instructions: [
    "# this generates a configuration file that the CLI uses in your project",
  ],
};

let deployment = {
  description: [
    "# When your ready to deploy a new version run the following commands",
  ],
  command: "npm run build && featurepeek",
  instructions: [
    "# Once your site is done compiling FeaturePeak will provide you with a URL to view your deployment ",
  ],
};

module.exports = {
  description,
  gettingStarted,
  login,
  init,
  deployment,
};
