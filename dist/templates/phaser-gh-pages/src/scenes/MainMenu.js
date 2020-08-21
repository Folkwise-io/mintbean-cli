"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var graphics;
var cursors;
exports.default = new phaser_1.default.Class({
    Extends: phaser_1.default.Scene,
    initialize: function () {
        phaser_1.default.Scene.call(this, { key: "mainmenu" });
    },
    create: function () {
        cursors = this.input.keyboard.createCursorKeys();
        graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(0, 0, 800, 600);
        this.add.text(270, 300, "Press space to start.");
        this.add.text(270, 315, "Move with up, down, left, right.");
        this.add.text(270, 330, "Press spacebar to brake.");
        this.add.text(270, 345, "Collect all the stars to win.");
    },
    update: function () {
        if (cursors.space.isDown) {
            this.scene.start("game");
        }
    },
});
