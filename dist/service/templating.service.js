"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var tmp_1 = __importDefault(require("tmp"));
var ejs_1 = __importDefault(require("ejs"));
var shelljs_1 = __importDefault(require("shelljs"));
var mime_1 = __importDefault(require("mime"));
var chalk_1 = __importDefault(require("chalk"));
var files_1 = require("../lib/files");
var files_2 = require("../lib/files");
var package_1 = require("../lib/package");
var setRelativePaths = function (dir, files) {
    if (files === void 0) { files = []; }
    return (files.map(function (_a) {
        var absolutePath = _a.absolutePath;
        return ({
            absolutePath: absolutePath,
            pathFromDirectoryRoot: path_1.default.relative(dir, absolutePath)
        });
    }));
};
var getTemplatePath = function (name) { return path_1.default.join(__dirname, '../../templates', name); };
var getTemporaryDirectory = function () { return tmp_1.default.dirSync(); };
var getTargetPath = function (projectName) { return path_1.default.join(process.cwd(), projectName); };
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
var isEjsTemptable = function (file) {
    var ext = path_1.default.extname(file).replace('.', '');
    var mimetype = mime_1.default.getType(ext);
    return (/^(text\/)|(application\/)/).test(mimetype);
};
var TemplatingService = /** @class */ (function () {
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
        var files = setRelativePaths(templatesPath, files_1.walk(templatesPath));
        var temporaryDirectory = getTemporaryDirectory().name;
        files.forEach(function (_a) {
            var absolutePath = _a.absolutePath, pathFromDirectoryRoot = _a.pathFromDirectoryRoot;
            var templateBuffer = fs_extra_1.default.readFileSync(absolutePath);
            // only run ejs.compile on text files
            var isTemplatable = isEjsTemptable(absolutePath);
            var output = isTemplatable ?
                ejs_1.default.compile(templateBuffer.toString('utf-8'))(options) :
                templateBuffer;
            var tmpDestination = path_1.default.join(temporaryDirectory, pathFromDirectoryRoot);
            files_2.ensureDirectoryExistence(tmpDestination);
            fs_extra_1.default.writeFileSync(tmpDestination, output);
        });
        var finalTarget = getTargetPath(projectName);
        files_2.ensureDirectoryExistence(finalTarget);
        console.log(chalk_1.default.cyanBright("Building project from template..."));
        fs_extra_1.default.copySync(temporaryDirectory, finalTarget);
        console.log(chalk_1.default.cyanBright("Installing packages..."));
        shelljs_1.default.exec("cd " + projectName + " && " + package_1.installPackagesCmd(packageManager));
        console.log(chalk_1.default.cyanBright("Done! Created new project '" + projectName + "' for github user '" + githubUsername + "'"));
        console.log(chalk_1.default.bold.cyanBright("'cd " + projectName + "'"), chalk_1.default.cyanBright('to start coding!'));
    };
    return TemplatingService;
}());
exports.default = TemplatingService;
