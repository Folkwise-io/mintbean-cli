import chalk from "chalk";
import { getConfig } from "../lib/config.js";
import { setConfig } from "../lib/config.js";

export const config = (cmdObj) => {
  // return if choosing multiple connection types simultaneously
  if (cmdObj.ssh && cmdObj.https) {
    console.log(
      chalk.red(
        "Nooo! Choose only one connection type: ssh (-S) OR https (-H). Try again."
      )
    );
    return false;
  }
  if (cmdObj.view || cmdObj.parent.args.length === 1) {
    console.log(chalk.cyanBright("Your current config:"));
    console.log(`github username:  ${getConfig("github")}`);
    console.log(
      `token:            ${getConfig("token") ? "<hidden>" : "undefined"}`
    );
    console.log(
      `connection type:  ${
        getConfig("connection") ? getConfig("connection") : "undefined"
      }`
    );
    console.log(
      chalk.cyanBright(
        "Run 'mint config -h' to learn how to update preferences"
      )
    );
    return true;
  }

  if (cmdObj.github) {
    setConfig("github", cmdObj.github);
    console.log(
      chalk.cyanBright(`Successfully set github username to '${cmdObj.github}'`)
    );
  }

  if (cmdObj.token) {
    setConfig("token", cmdObj.token);
    console.log(
      chalk.cyanBright(`Successfully set github personal access token.`)
    );
  }

  if (cmdObj.ssh) {
    setConfig("connection", "ssh");
    console.log(
      chalk.cyanBright(`Successfully set github connection type to ssh.`)
    );
  }
  if (cmdObj.https) {
    setConfig("connection", "https");
    console.log(
      chalk.cyanBright(`Successfully set github connection type to https.`)
    );
  }
};
