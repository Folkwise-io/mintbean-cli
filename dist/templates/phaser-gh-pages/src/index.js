"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var MainMenu_1 = __importDefault(require("./scenes/MainMenu"));
var Game_1 = __importDefault(require("./scenes/Game"));
var WinScreen_1 = __importDefault(require("./scenes/WinScreen"));
var config = {
    type: phaser_1.default.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0, x: 0 },
        },
    },
    scene: [MainMenu_1.default, Game_1.default, WinScreen_1.default],
};
var game = new phaser_1.default.Game(config);
