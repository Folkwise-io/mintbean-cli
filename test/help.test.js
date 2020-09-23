import TestManager from "./Tools/TestManager";

describe("Mintbean-CLI Help", () => {
  let testManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    testManager.cleanUp();
  });

  it("`mint -h` command prints help menu", async () => {
    const terminalPrint = await testManager.execute(["-h"]);
    const results = terminalPrint.includes("Usage: mint [options] [command]");
    expect(results).toBe(true);
  });
});
