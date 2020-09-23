import cmd from "./testUtils";
import tmp from "tmp";
import path from "path";
import { compareSync } from "dir-compare";

// "/usr/local/bin/mint"

function generateTestProgram() {
  const program = createProgram();
  program.exitOverride();
  return program;
}

class TestManager {
  constructor(tmpDir, program) {
    this.dir = tmpDir;
    this.currentDir = tmpDir;
    this.program = program;
  }

  static build() {
    const options = {
      unsafeCleanup: true,
    };
    const tempDir = tmp.dirSync(options);
    const program = cmd.create("/usr/local/bin/mint");
    return new TestManager(tempDir, program);
  }

  switchToTmpDir() {
    process.chdir(this.dir.name);
    this.currentDir = process.cwd();
    return this;
  }

  async execute(args, inputs, opts) {
    return await this.program.execute(args, inputs, opts);
  }

  compareFiles(templateName) {
    const testProjectPath = path.join(this.dir.name, "testProject");
    const templatePath = path.resolve(
      __dirname,
      "../../templates",
      templateName.toLowerCase()
    );
    const match = compareSync(testProjectPath, templatePath, {
      compareContent: true,
      compareSize: true,
      // These files are different intentionally excluded from compare
      excludeFilter: "package.json, .git",
    });
    return match.same;

  }

  cleanUp() {
    // Manual cleanup
    this.dir.removeCallback();
  }
}

export default TestManager;
