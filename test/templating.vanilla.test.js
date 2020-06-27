const { execute, isFile, isDirectory } = require('./testutils');
const { version } = require('../package.json');
const fs = require('fs');
const path = require('path');

const githubUsername = 'test-user';
const template = 'vanilla-js';


describe('vanilla template', () => {
  it('returns the version', () => {
    let errorOccurred = false;
    try {
      execute('-V');
    } catch (e) {
      errorOccurred = true;
      expect(e.message).toBe(version);
    }
    expect(errorOccurred).toBeTruthy();
  });

  // it('templates correctly', () => {
  //   const projectName = 'test-project';
  //   const dir = execute('new', projectName);
    // expect(isDirectory(dir, projectName)).toBeTruthy();
    // expect(isFile(dir, projectName, 'index.html')).toBeTruthy();
    // expect(isFile(dir, projectName, 'package.json')).toBeTruthy();
    // expect(isDirectory(dir, projectName, 'src')).toBeTruthy();
    // expect(isFile(dir, projectName, 'src', 'index.js')).toBeTruthy();
    // expect(isDirectory(dir, projectName, 'styles')).toBeTruthy();
    // expect(isFile(dir, projectName, 'styles', 'style.css')).toBeTruthy();
  // });
});
