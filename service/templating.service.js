const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');
const ejs = require('ejs');

/**
 * @typedef {Object} TemplateOptions
 * @property {string} projectName
 */

// taken from https://stackoverflow.com/a/16684530/1204556
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
            absolutePath,
            pathFromDirectoryRoot
          });
      }
  });

  return results;
}

const getTemplatesPath = () => path.join(__dirname, '..', 'templates', name);
const getTemporaryDirectory = () => {
  tmp.dir((err, path, cleanupCallback) => {
    if (err) {
      console.log("Failed to create temporary directory. Process will exit.");
      throw err;
    }

    return path;
  })
}

/**
 * @param {TemplateOptions} options 
 */
const validateOptions = options => {
  if (!options) {
    throw new Error("No options received. This is an illegal state. Please report it to the author of this project with the following trace.")
  }

  if (!options.projectName) {
    throw new Error("No project name specified");
  }
}

const getTarget = projectName => path.join(process.cwd(), projectName);

const validateTarget = projectName => {
  const conflict = fs.existsSync(getTarget());
  if (conflict) {
    throw new Error("Whoops! A file or directory by the name already exists at " + projectName);
  }
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

module.exports = class TemplatingService {
  /**
   * 
   * @param {*} name 
   * @param { TemplateOptions } options 
   */
  template(name='vanilla', options = {}) {
    validateOptions(options);
    validateTarget(options.projectName);

    const templatesPath = getTemplatesPath();
    const files = walk(templatesPath);
    const temporaryDirectory = getTemporaryDirectory();

    files.forEach(({ absolutePath, pathFromDirectoryRoot }) => {
      const template = fs.readFileSync(absolutePath).toString("utf-8");
      const output = ejs.compile(template)(options);
      const tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
      fs.writeFileSync(tmpDestination, output);
    });

    const finalTarget = getTarget(options.projectName);
    ensureDirectoryExistence(finalTarget);
    // fs.copySync(temporaryDirectory, finalTarget);
  }  
}