import chalk from "chalk";
import { getConfig, setConfig } from "../lib/config.js";
import { addToken } from "./new";

export const config = (cmdObj) => {
  // return if choosing multiple connection types simulataneously
  if (cmdObj.ssh && cmdObj.https) {
    console.log(
      chalk.red(
        "Nooo! Choose only one connection type: ssh (-S) OR https (-H). Try again."
      )
    );
    process.exit(1);
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
  }

  if (cmdObj.github) {
    setConfig("github", cmdObj.github);
    console.log(
      chalk.cyanBright(`Successfully set github username to '${cmdObj.github}'`)
    );
  }

  if (cmdObj.token) {
    addToken();
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
