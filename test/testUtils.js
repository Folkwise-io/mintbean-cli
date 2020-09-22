import { createProgram } from "../program";
import fs from "fs";
import tmp from "tmp";
import path from "path";

const switchToTempDir = () => {
  const options = {
    unsafeCleanup: true,
  };
  const tempDir = tmp.dirSync(options);
  process.chdir(tempDir.name);
  return process.cwd();
};

const 

const stat = (...filepaths) => fs.statSync(path.join(...filepaths));

export const cmd = {
  execute: (...args) => {
    const dir = switchToTempDir();
    const program = generateTestProgram();
    program(["node", "mint", ...args]);
    return dir;
  },
  isFile: (...filepaths) => stat(...filepaths).isFile(),
  isDirectory: (...filepaths) => stat(...filepaths).isDirectory(),
};
