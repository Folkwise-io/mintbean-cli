import fs from "fs";
import path from "path";

// taken from https://stackoverflow.com/a/16684530/1204556
// returns array with path of every file in dir
export const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (pathFromDirectoryRoot) {
    const absolutePath = dir + "/" + pathFromDirectoryRoot;

    const stat = fs.statSync(absolutePath);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(absolutePath));
    } else {
      /* Is a file */
      results.push({
        absolutePath,
      });
    }
  });
  return results;
};

export const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

export const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

export const directoryIsEmpty = (path) => {
  return fs.readdirSync(path).length === 0;
};

export const checkFileOrDirExists = (path) => fs.existsSync(path);

export const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

export const parsePackageDotJson = () => {
  const str = fs
    .readFileSync(path.join(process.cwd(), "./package.json"))
    .toString();
  return JSON.parse(str);
};
