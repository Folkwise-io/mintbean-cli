import TestManager from "./Tools/TestManager";
import fs from "fs";
import path from "path";
import cmd from "./Tools/testUtils";
const TEMPLATE_CHOICES = fs.readdirSync(path.join(__dirname, "../templates"));
const templates = TEMPLATE_CHOICES.map((template) => [template, true]);

describe("Mintbean-CLI Template Creation", () => {
  let testManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    testManager.cleanUp();
  });

  // Tests every template creation to see if the copy process worked
  it.each(templates)("Should Create %s from template", async (input, expected) => {
    const index = TEMPLATE_CHOICES.indexOf(input);
    const downs = new Array(index).fill(cmd.DOWN)

    await testManager
      .switchToTmpDir()
      .execute(["new", "testProject", "-ni"], [...downs,cmd.ENTER]);
    expect(testManager.compareFiles(input)).toBe(expected);
  });
});
