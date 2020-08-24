"use strict";
var Pref = require('dotpref').Pref;
// returns false if no key or value is undefined, returns value if key
var getConfig = function (key) {
    var value = Pref.get(key);
    if (typeof value === 'undefined')
        return false;
    return value;
};
var setConfig = function (key, val) {
    Pref.set(key, val);
};
module.exports = {
    getConfig: getConfig,
    setConfig: setConfig
};
