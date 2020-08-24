import fs  from 'fs-extra';
import path  from 'path';
import tmp  from 'tmp';
import ejs  from 'ejs';
import shell  from 'shelljs'
import mime  from 'mime';
import chalk  from 'chalk';

import { walk } from '../lib/files';
import { ensureDirectoryExistence } from '../lib/files'
import { installPackagesCmd } from '../lib/package'

const setRelativePaths = (dir, files=[]) => (
  files.map(({ absolutePath }) => ({
  absolutePath,
  pathFromDirectoryRoot: path.relative(dir, absolutePath)
  }))
);

const getTemplatePath = (name) => path.join(__dirname, '../../templates', name);
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
const isEjsTemptable = (file) => {
  const ext = path.extname(file).replace('.','');
  const mimetype= mime.getType(ext);
  return (/^(text\/)|(application\/)/).test(mimetype)
}

 class TemplatingService {
  /**
   *
   * @param {*} templateName
   * @param { TemplateOptions } options
   */
  template(options = {}) {
    validateOptions(options);
    const { templateName,
            projectName,
            githubUsername,
            packageManager
          } = options;

    const templatesPath = getTemplatePath(templateName);
    const files = setRelativePaths(templatesPath, walk(templatesPath));
    const temporaryDirectory = getTemporaryDirectory().name;

    files.forEach(({ absolutePath, pathFromDirectoryRoot }) => {
      const templateBuffer = fs.readFileSync(absolutePath)

      // only run ejs.compile on text files
      const isTemplatable = isEjsTemptable(absolutePath)
      const output = isTemplatable ?
                   ejs.compile(templateBuffer.toString('utf-8'))(options) :
                   templateBuffer;
      const tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
      ensureDirectoryExistence(tmpDestination);
      fs.writeFileSync(tmpDestination, output);
    });

    const finalTarget = getTargetPath(projectName);
    ensureDirectoryExistence(finalTarget);
    console.log(chalk.cyanBright(`Building project from template...`));
    fs.copySync(temporaryDirectory, finalTarget);

    console.log(chalk.cyanBright(`Installing packages...`));
    shell.exec(`cd ${projectName} && ${installPackagesCmd(packageManager)}`);

    console.log(chalk.cyanBright(`Done! Created new project '${projectName}' for github user '${githubUsername}'`));
    console.log(chalk.bold.cyanBright(`'cd ${projectName}'`), chalk.cyanBright('to start coding!'));
  }
}

export default TemplatingService
