"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accelerate = exports.decelerate = void 0;
var ACCELERATION = 10;
var MAX_SPEED = 300;
function decelerate(oldValue) {
    var polarity = Math.sign(oldValue);
    if (polarity === 0) {
        // value was 0
        return 0;
    }
    else {
        var newVal = (Math.abs(oldValue) - ACCELERATION);
        if (newVal < 0)
            newVal = 0;
        return polarity * newVal;
    }
}
exports.decelerate = decelerate;
function accelerate(oldValue, direction) {
    var newValue = oldValue + (direction * ACCELERATION);
    var limitFunc = direction < 0 ? Math.min : Math.min;
    return limitFunc(newValue, MAX_SPEED);
}
exports.accelerate = accelerate;
