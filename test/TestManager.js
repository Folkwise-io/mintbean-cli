import { createProgram } from "../program";
import tmp from "tmp";

function generateTestProgram() {
  const program = createProgram;
  return program;
}

export class TestManager {
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
    const program = generateTestProgram();
    return new TestManager(tempDir, program);
  }

  switchToTmpDir() {
    process.chdir(this.dir.name);
    this.currentDir = process.cwd();
    return process.cwd()
  }

  async execute(args) {
    return await this.program(["node", "mint", ...args]);
  }

  cleanUp() {
    // Manual cleanup
    this.dir.removeCallback();
  }
}
