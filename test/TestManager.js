import cmd from "./testUtils";
import tmp from "tmp";
import fs from "fs";

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

  listFiles() {
    return fs.readdirSync(this.dir.name);
  }

  cleanUp() {
    // Manual cleanup
    this.dir.removeCallback();
  }
}

export default TestManager
