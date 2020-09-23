import TestManager from "./TestManager";

const helpResponse = `Usage: mint [options] [command]

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  new|n [options] [project]  Start new project from template
  deploy|d                   Deploy project as prescribed in package.json >
                             "mintbean" predeploy and deploy scripts.
  repo|r [options]           Create GitHub remote repo with project name (RUN
                             FROM PROJECT ROOT))
  config [options]           Set up or view config (Github credentials etc.)
  help [command]             display help for command
`;

describe("Mintbean-CLI Help", () => {
  let testManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    testManager.cleanUp();
  });

  it.only("`mint -h` command prints help menu", async () => {
    const results = await testManager.switchToTmpDir().execute(["-h"]);
    console.log(results);
    expect(results).toBe(helpResponse);
  });
});
