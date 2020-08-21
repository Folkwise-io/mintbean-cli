"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var scifi_platform_BG1_jpg_1 = __importDefault(require("../assets/scifi_platform_BG1.jpg"));
var scifi_platformTiles_32x32_png_1 = __importDefault(require("../assets/scifi_platformTiles_32x32.png"));
var star_png_1 = __importDefault(require("../assets/star.png"));
var utils_1 = require("../utils");
var box;
var cursors;
exports.default = new phaser_1.default.Class({
    Extends: phaser_1.default.Scene,
    initialize: function () {
        phaser_1.default.Scene.call(this, { key: "game" });
        window.GAME = this;
    },
    preload: function preload() {
        this.load.image("background", scifi_platform_BG1_jpg_1.default);
        this.load.spritesheet("tiles", scifi_platformTiles_32x32_png_1.default, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("star", star_png_1.default);
    },
    create: function create() {
        var _this = this;
        this.add.image(400, 300, "background");
        var stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setScale: { x: 0.2, y: 0.2 },
            setXY: { x: 400, y: 300 },
        });
        stars.children.iterate(function (child) {
            child.setBounceY(phaser_1.default.Math.FloatBetween(0.4, 0.8));
            child.setVelocityX(150 - Math.random() * 300);
            child.setVelocityY(150 - Math.random() * 300);
            child.setBounce(1, 1);
            child.setCollideWorldBounds(true);
        });
        cursors = this.input.keyboard.createCursorKeys();
        box = this.physics.add.image(400, 100, "tiles", 15);
        var processCollision = function (box, star) {
            star.destroy();
            var starsLeft = stars.countActive();
            if (starsLeft === 0) {
                _this.scene.start("winscreen");
            }
        };
        this.physics.add.collider(stars, box, processCollision, null, this);
        box.setBounce(1, 1);
        box.setCollideWorldBounds(true);
    },
    update: function () {
        var velocity = box.body.velocity;
        if (cursors.space.isDown) {
            var x = utils_1.decelerate(velocity.x);
            var y = utils_1.decelerate(velocity.y);
            box.setVelocity(x, y);
        }
        if (cursors.up.isDown)
            box.setVelocityY(utils_1.accelerate(velocity.y, -1));
        if (cursors.right.isDown)
            box.setVelocityX(utils_1.accelerate(velocity.x, 1));
        if (cursors.down.isDown)
            box.setVelocityY(utils_1.accelerate(velocity.y, 1));
        if (cursors.left.isDown)
            box.setVelocityX(utils_1.accelerate(velocity.x, -1));
    },
});
