"use strict";
var fs = require('fs');
var path = require('path');
// taken from https://stackoverflow.com/a/16684530/1204556
// returns array with path of every file in dir
var walk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (pathFromDirectoryRoot) {
        var absolutePath = dir + '/' + pathFromDirectoryRoot;
        var stat = fs.statSync(absolutePath);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(absolutePath));
        }
        else {
            /* Is a file */
            results.push({
                absolutePath: absolutePath
            });
        }
    });
    return results;
};
module.exports = {
    getCurrentDirectoryBase: function () {
        return path.basename(process.cwd());
    },
    directoryExists: function (filePath) {
        return fs.existsSync(filePath);
    },
    directoryIsEmpty: function (path) {
        return fs.readdirSync(path).length === 0;
    },
    checkFileOrDirExists: function (path) { return fs.existsSync(path); },
    ensureDirectoryExistence: function (filePath) {
        var dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }
    },
    parsePackageDotJson: function () {
        var str = fs.readFileSync(path.join(process.cwd(), './package.json')).toString();
        return JSON.parse(str);
    },
    walk: walk,
};
