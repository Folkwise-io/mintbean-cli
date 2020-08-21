"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var createProgram = require('../program').createProgram;
var fs = require('fs');
var tmp = require('tmp');
var path = require('path');
var switchToTempDir = function () {
    var tempDir = tmp.dirSync();
    process.chdir(tempDir.name);
    return process.cwd();
};
var generateTestProgram = function () {
    var program = createProgram();
    program.exitOverride();
    return program;
};
var stat = function () {
    var filepaths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        filepaths[_i] = arguments[_i];
    }
    return fs.statSync(path.join.apply(path, filepaths));
};
module.exports = {
    execute: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dir = switchToTempDir();
        var program = generateTestProgram();
        program.parse(__spreadArrays(['node', 'mint'], args));
        return dir;
    },
    isFile: function () {
        var filepaths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filepaths[_i] = arguments[_i];
        }
        return stat.apply(void 0, filepaths).isFile();
    },
    isDirectory: function () {
        var filepaths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filepaths[_i] = arguments[_i];
        }
        return stat.apply(void 0, filepaths).isDirectory();
    }
};
