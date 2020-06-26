const fs = require('fs');
const path = require('path');

// taken from https://stackoverflow.com/a/16684530/1204556
// returns array with path of every file in dir
const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(pathFromDirectoryRoot) {
      const absolutePath = dir + '/' + pathFromDirectoryRoot;

      const stat = fs.statSync(absolutePath);
      if (stat && stat.isDirectory()) {
          /* Recurse into a subdirectory */
          results = results.concat(walk(absolutePath));
      } else {
          /* Is a file */
          results.push({
            absolutePath
          });
      }
  });
  return results;
}

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  directoryIsEmpty: (path) => {
    return fs.readdirSync(path).length === 0;
  },

  checkFileOrDirExists: path => fs.existsSync(path),

  ensureDirectoryExistence: (filePath) => {
    var dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
  },

  walk,
};
