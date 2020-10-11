import { Command } from "commander";
import { config } from "./commands/config";
import { newProject } from "./commands/new";
import { repo } from "./commands/repo";
import { deploy } from "./commands/deploy";
import { version } from "./package.json";

export const createProgram = (args) => {
  const program = new Command();

  program.version(version);

  program
    .command("new [project]")
    .alias("n")
    .description("Start new project from template")
    .action(function (project) {
      newProject(project);
    });

  program
    .command("lint [lintSources]")
    .alias("l")
    .description("Lint the code of the project")
    .action(function (lintSources) {
      lint(lintSources);
    });

  program
    .command("deploy")
    .alias("d")
    .description(
      'Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.'
    )
    .action(function () {
      deploy();
    });

  program
    .command("repo")
    .alias("r")
    .option("-O, --org [organization]", "Set Organization")
    .description(
      "Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))"
    )
    .action(function (cmdObj) {
      repo(cmdObj);
    });

  program
    .command("config")
    .description("Set up or view config (Github credentials etc.)")
    .option("-v, --view", "view current config")
    .option("-g, --github <username>", "set github username")
    .option("-t, --token <token>", "set github personal access token")
    .option("-S, --ssh", "set github connection type to ssh")
    .option("-H, --https", "set github connection type to https")
    .action((cmdObj) => {
      config(cmdObj);
    });

  program.parse(args);
};
