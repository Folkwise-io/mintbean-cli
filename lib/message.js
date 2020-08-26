const CFonts = require("cfonts");
const size = require("window-size");
const terminalLink = require("terminal-link");

module.exports = {
  banner: () => {
    const { width } = size.get();
    const banner = width >= 70 ? "Mintbean" : "Mint|Bean";
    const startingMsg = "Let mintbean do the hard work... you do the coding \n";

    CFonts.say(banner, {
      font: "slick", // define the font face
      align: "center", // define text alignment
      background: "black", // define the background color
      letterSpacing: 3,
      space: true, // define if the output text should have empty lines on top and on the bottom
      gradient: ["#02ed9d", "#009be2"], // define your two gradient colors
      transitionGradient: true, // define if this is a transition between colors directly
      env: "node", // define the environment CFonts is being executed in
    });
    CFonts.say(startingMsg, {
      font: "console", // define the font face
      align: "center", // define text alignment
      space: true, // define if the output text should have empty lines on top and on the bottom
      env: "node", // define the environment CFonts is being executed in
    });

  },
  sponsorBanner: () => {
    const link = terminalLink(
      "FeaturePeek",
      "https://featurepeek.com/"
    );

    const blurb = `FeaturePeek creates supercharged deployment |previews of your frontend that you can share with your team to quickly get feedback on |your implementation in progress. |${link}`;

    CFonts.say("Sponsored by:", {
      font: "console", // define the font face
      align: "center", // define text alignment
      space: false, // define if the output text should have empty lines on top and on the bottom
      env: "node", // define the environment CFonts is being executed in
    });

    CFonts.say("Feature", {
      font: "chrome", // define the font face
      align: "center", // define text alignment
      space: false, // define if the output text should have empty lines on top and on the bottom
      colors: ["#1f2337", "#1f2337", "#1f2337"], // define your two gradient colors
      letterSpacing: .5, // define letter spacing
      env: "node", // define the environment CFonts is being executed in
    });

    CFonts.say("Peek", {
      font: "chrome", // define the font face
      align: "center", // define text alignment
      letterSpacing: .5, // define letter spacing
      space: false, // define if the output text should have empty lines on top and on the bottom
      colors: ["#05c5cc", "#05c5cc", "#05c5cc"], // define your two gradient colors
      env: "node", // define the environment CFonts is being executed in
    });

    CFonts.say(blurb, {
      font: "console", // define the font face
      align: "center", // define text alignment
      space: true, // define if the output text should have empty lines on top and on the bottom
      env: "node", // define the environment CFonts is being executed in
      maxLength: "45",
    });

  },
};
