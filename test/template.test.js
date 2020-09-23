import TestManager from "./TestManager";
import fs from "fs";
import path from "path";
import cmd from "./testUtils";
const TEMPLATE_CHOICES = fs.readdirSync(path.join(__dirname, "../templates"));

describe("Mintbean-CLI New command", () => {
  let testManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    testManager.cleanUp();
  });

  it("should create new bluma project", async () => {
    const results = await testManager
      .switchToTmpDir()
      .execute(["new"], [cmd.ENTER, cmd.DOWN, cmd.ENTER]);
    console.log(testManager.listFiles());
  });
});
