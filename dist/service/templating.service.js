"use strict";
var fs = require('fs-extra');
var path = require('path');
var tmp = require('tmp');
var ejs = require('ejs');
var shell = require('shelljs');
var mime = require('mime');
var chalk = require('chalk');
var walk = require('../lib/files').walk;
var ensureDirectoryExistence = require('../lib/files').ensureDirectoryExistence;
var installPackagesCmd = require('../lib/package').installPackagesCmd;
var setRelativePaths = function (dir, files) {
    if (files === void 0) { files = []; }
    return (files.map(function (_a) {
        var absolutePath = _a.absolutePath;
        return ({
            absolutePath: absolutePath,
            pathFromDirectoryRoot: path.relative(dir, absolutePath)
        });
    }));
};
var getTemplatePath = function (name) { return path.join(__dirname, '../../templates', name); };
var getTemporaryDirectory = function () { return tmp.dirSync(); };
var getTargetPath = function (projectName) { return path.join(process.cwd(), projectName); };
/**
 * @param {TemplateOptions} options
 */
var validateOptions = function (options) {
    if (!options) {
        throw new Error("No options received. This is an illegal state. Please report it to the author of this project with the following trace.");
    }
    if (!options.templateName) {
        throw new Error("No template name specified");
    }
};
// returns true if file is of mimetype 'text/...' or 'application/...'
var isEjsTemplatable = function (file) {
    var ext = path.extname(file).replace('.', '');
    var mimetype = mime.getType(ext);
    return (/^(text\/)|(application\/)/).test(mimetype);
};
module.exports = /** @class */ (function () {
    function TemplatingService() {
    }
    /**
     *
     * @param {*} templateName
     * @param { TemplateOptions } options
     */
    TemplatingService.prototype.template = function (options) {
        if (options === void 0) { options = {}; }
        validateOptions(options);
        var templateName = options.templateName, projectName = options.projectName, githubUsername = options.githubUsername, packageManager = options.packageManager;
        var templatesPath = getTemplatePath(templateName);
        var files = setRelativePaths(templatesPath, walk(templatesPath));
        var temporaryDirectory = getTemporaryDirectory().name;
        files.forEach(function (_a) {
            var absolutePath = _a.absolutePath, pathFromDirectoryRoot = _a.pathFromDirectoryRoot;
            var templateBuffer = fs.readFileSync(absolutePath);
            // only run ejs.compile on text files
            var isTemplatable = isEjsTemplatable(absolutePath);
            var output = isTemplatable ?
                ejs.compile(templateBuffer.toString('utf-8'))(options) :
                templateBuffer;
            var tmpDestination = path.join(temporaryDirectory, pathFromDirectoryRoot);
            ensureDirectoryExistence(tmpDestination);
            fs.writeFileSync(tmpDestination, output);
        });
        var finalTarget = getTargetPath(projectName);
        ensureDirectoryExistence(finalTarget);
        console.log(chalk.cyanBright("Building project from template..."));
        fs.copySync(temporaryDirectory, finalTarget);
        console.log(chalk.cyanBright("Installing packages..."));
        shell.exec("cd " + projectName + " && " + installPackagesCmd(packageManager));
        console.log(chalk.cyanBright("Done! Created new project '" + projectName + "' for github user '" + githubUsername + "'"));
        console.log(chalk.bold.cyanBright("'cd " + projectName + "'"), chalk.cyanBright('to start coding!'));
    };
    return TemplatingService;
}());
