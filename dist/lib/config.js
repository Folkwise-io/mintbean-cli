"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.getConfig = void 0;
var dotpref_1 = require("dotpref");
// returns false if no key or value is undefined, returns value if key
exports.getConfig = function (key) {
    var value = dotpref_1.Pref.get(key);
    if (typeof value === "undefined")
        return false;
    return value;
};
exports.setConfig = function (key, val) {
    dotpref_1.Pref.set(key, val);
};
