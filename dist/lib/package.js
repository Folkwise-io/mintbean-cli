"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPackagesCmd = void 0;
// this syntax works for both 'yarn' and 'npm'
exports.installPackagesCmd = function (packageManager) {
    console.log(packageManager + " install");
    return packageManager + " install";
};
