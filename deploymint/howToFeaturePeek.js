const terminalLink = require("terminal-link");


function createLink(as, url) {
  return terminalLink(as, url);
}

let description = {
  description: [
    "# FeaturePeek gives you super speed and more! Deploy in a flash!",
    `# Also check out their other revolutionary features ${createLink(
      "here",
      "https://youtu.be/OSvst-lCySE"
    )}`,
    "# Copy & paste the following commands to get started.",
  ],
};
let gettingStarted = {command:"npm install -g @featurepeek/peek"};

let login = {
  description: ["First time using FeaturePeak(per device)"],
  command: "featurepeek login",
  instructions: [
    "# Creates a FeaturePeek account for you if you don't have one already, and authenticate you in your CLI.",
  ],
};

let init = {
  description: [ "# We Have include a default config in all of our templates so you can skip this step if you used one,",],
  command: "featurepeek init",
  instructions: [
    "# Generates a configuration file that the CLI uses in your project,",
  ],
};

let deployment = {
  description: [
    "# When you're ready to deploy a new version run the following commands.(Every Time)",
  ],
  command: "npm run build && featurepeek",
  instructions: [
    "# Once your site is done compiling FeaturePeak will provide you with a URL to view your deployment.",
  ],
};

module.exports = {
  description,
  gettingStarted,
  login,
  init,
  deployment,
};
