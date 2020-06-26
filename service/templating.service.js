const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');
const ejs = require('ejs');

const walk = require('../lib/files').walk;
const ensureDirectoryExistence = require('../lib/files').ensureDirectoryExistence

const setRelativePaths = (dir, files=[]) => (
  files.map(({ absolutePath }) => ({
  absolutePath,
  pathFromDirectoryRoot: path.relative(dir, absolutePath)
  }))
);

const getTemplatePath = (name) => path.join(__dirname, '../templates', name);
const getTemporaryDirectory = () => tmp.dirSync();
const getTargetPath = projectName => path.join(process.cwd(), projectName);

/**
 * @param {TemplateOptions} options
 */
const validateOptions = options => {
  if (!options) {
    throw new Error("No options received. This is an illegal state. Please report it to the author of this project with the following trace.")
  }

  if (!options.templateName) {
    throw new Error("No template name specified");
  }
}

module.exports = class TemplatingService {
  /**
   *
   * @param {*} templateName
   * @param { TemplateOptions } options
   */
  template(options = {}) {
    validateOptions(options);
    const { templateName } = options;

    const templatesPath = getTemplatePath(templateName);
    const files = setRelativePaths(templatesPath, walk(templatesPath));
    const temporaryDirectory = getTemporaryDirectory().name;

    files.forEach(({ absolutePath, pathFromDirectoryRoot }) => {
      const template = fs.readFileSync(absolutePath).toString("utf-8");
      const output = ejs.compile(template)(options);
      const tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
      ensureDirectoryExistence(tmpDestination);
      fs.writeFileSync(tmpDestination, output);
    });

    const finalTarget = getTargetPath(options.projectName);
    ensureDirectoryExistence(finalTarget);
    fs.copySync(temporaryDirectory, finalTarget);
  }
}
