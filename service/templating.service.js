const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');
const ejs = require('ejs');
const shell = require('shelljs')
const mime = require ('mime');

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

// returns true if file is of mimetype 'text/...' or 'application/...'
const isEjsTemplatable = (file) => {
  const ext = path.extname(file).replace('.','');
  const mimetype= mime.getType(ext);
  return (/^(text\/)|(application\/)/).test(mimetype)
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
      const templateBuffer = fs.readFileSync(absolutePath)

      // only run ejs.compile on text files
      const isTemplatable = isEjsTemplatable(absolutePath)
      const output = isTemplatable ?
                   ejs.compile(templateBuffer.toString('utf-8'))(options) :
                   templateBuffer;
      const tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
      ensureDirectoryExistence(tmpDestination);
      fs.writeFileSync(tmpDestination, output);
    });

    const finalTarget = getTargetPath(options.projectName);
    ensureDirectoryExistence(finalTarget);
    fs.copySync(temporaryDirectory, finalTarget);
  }
}
