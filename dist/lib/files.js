"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePackageDotJson = exports.ensureDirectoryExistence = exports.checkFileOrDirExists = exports.directoryIsEmpty = exports.directoryExists = exports.getCurrentDirectoryBase = exports.walk = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// taken from https://stackoverflow.com/a/16684530/1204556
// returns array with path of every file in dir
exports.walk = function (dir) {
    var results = [];
    var list = fs_1.default.readdirSync(dir);
    list.forEach(function (pathFromDirectoryRoot) {
        var absolutePath = dir + "/" + pathFromDirectoryRoot;
        var stat = fs_1.default.statSync(absolutePath);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(exports.walk(absolutePath));
        }
        else {
            /* Is a file */
            results.push({
                absolutePath: absolutePath,
            });
        }
    });
    return results;
};
exports.getCurrentDirectoryBase = function () {
    return path_1.default.basename(process.cwd());
};
exports.directoryExists = function (filePath) {
    return fs_1.default.existsSync(filePath);
};
exports.directoryIsEmpty = function (path) {
    return fs_1.default.readdirSync(path).length === 0;
};
exports.checkFileOrDirExists = function (path) { return fs_1.default.existsSync(path); };
exports.ensureDirectoryExistence = function (filePath) {
    var dirname = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dirname)) {
        fs_1.default.mkdirSync(dirname, { recursive: true });
    }
};
exports.parsePackageDotJson = function () {
    var str = fs_1.default
        .readFileSync(path_1.default.join(process.cwd(), "./package.json"))
        .toString();
    return JSON.parse(str);
};
