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
            absolutePath
          });
      }
  });

  return results;
}

const setRelativePaths = (dir, files=[]) => files.map(({ absolutePath }) => ({
  absolutePath,
  pathFromDirectoryRoot: path.relative(dir, absolutePath)
}));

const getTemplatesPath = (name) => path.join(__dirname, '..', 'templates', name);
const getTemporaryDirectory = () => tmp.dirSync();

const getTarget = projectName => path.join(process.cwd(), projectName);

const checkFileOrDirExists = path => fs.existsSync(path);

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
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

  const target = getTarget(options.projectName);
  const conflict = checkFileOrDirExists(target);
  if (conflict) {
    throw new Error("Whoops! A file or directory by the name already exists at " + projectName);
  }
}

module.exports = class TemplatingService {
  /**
   * 
   * @param {*} templateName 
   * @param { TemplateOptions } options 
   */
  template(templateName='vanilla', options = {}) {
    validateOptions(options);

    const templatesPath = getTemplatesPath(templateName);
    const files = setRelativePaths(templatesPath, walk(templatesPath));
    const temporaryDirectory = getTemporaryDirectory().name;

    files.forEach(({ absolutePath, pathFromDirectoryRoot }) => {
      const template = fs.readFileSync(absolutePath).toString("utf-8");
      const output = ejs.compile(template)(options);
      const tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
      ensureDirectoryExistence(tmpDestination);
      fs.writeFileSync(tmpDestination, output);
    });

    const finalTarget = getTarget(options.projectName);
    ensureDirectoryExistence(finalTarget);
    fs.copySync(temporaryDirectory, finalTarget);
  }  
}