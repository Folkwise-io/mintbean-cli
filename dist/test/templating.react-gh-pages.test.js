"use strict";
var _a = require('./testutils'), execute = _a.execute, isFile = _a.isFile, isDirectory = _a.isDirectory;
var version = require('../package.json').version;
var fs = require('fs');
var path = require('path');
describe('react-gh-pages template', function () {
    it('returns the version', function () {
        var errorOccurred = false;
        try {
            execute('-V');
        }
        catch (e) {
            errorOccurred = true;
            expect(e.message).toBe(version);
        }
        expect(errorOccurred).toBeTruthy();
    });
    // it('templates correctly', () => {
    //   const projectName = 'test-project';
    //   const dir = execute('new', projectName);
    //   expect(isDirectory(dir, projectName)).toBeTruthy();
    //   expect(isFile(dir, projectName, 'index.html')).toBeTruthy();
    //   expect(isFile(dir, projectName, 'package.json')).toBeTruthy();
    //   expect(isDirectory(dir, projectName, 'src')).toBeTruthy();
    //   expect(isFile(dir, projectName, 'src', 'index.js')).toBeTruthy();
    //   expect(isDirectory(dir, projectName, 'styles')).toBeTruthy();
    //   expect(isFile(dir, projectName, 'styles', 'style.css')).toBeTruthy();
    // });
});
