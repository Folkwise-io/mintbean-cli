import { TestManager } from "../TestManager";

describe("Mintbean-CLI", () => {
  let testManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    testManager.cleanUp();
  });

  it("dummy test", async () => {
    testManager.switchToTmpDir();
    const results = testManager.execute(["-h"]);
    expect(results).toBe("true");
  });
});
