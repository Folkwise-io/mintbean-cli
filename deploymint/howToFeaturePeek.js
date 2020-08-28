let description = {
  description: [
    "# FeaturePeek gives you superpowers in some way that I",
    "# can't explain right now, but trust me, they are awesome.",
    "# Copy paste the following command to get started.",
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
    "# When your ready to deploy a new version run the following command",
  ],
  command: "featurepeek",
  instructions: [
    "# some magic will happen behind the scenes and spit our a url where you can find your project",
  ],
};

module.exports = {
  description,
  gettingStarted,
  login,
  init,
  deployment,
};
