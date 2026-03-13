import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load Models (Clean & Dirty)
        this.load.image('airplane-clean', 'assets/model/airplane-clean.png');
        this.load.image('airplane-dirty', 'assets/model/airplane-dirty.png');
        this.load.image('car-clean', 'assets/model/car-clean.png');
        this.load.image('car-dirty', 'assets/model/car-dirty.png');
        this.load.image('tank-clean', 'assets/model/tank-clean.png');
        this.load.image('tank-dirty', 'assets/model/tank-dirty.png');

        // Load Tools
        this.load.image('tool-chisel', 'assets/tools/chisel-icon.png');
        this.load.image('tool-cream', 'assets/tools/cream-icon.png');
        this.load.image('tool-razor', 'assets/tools/razor-icon.png');
        this.load.image('tool-scissors', 'assets/tools/scissors-icon.png');
        this.load.image('tool-screwdriver', 'assets/tools/screwdriver-icon.png');

        // Create a temporary brush texture internally for erasure
        this.createBrushTexture();
        this.createParticleTexture();
    }

    create() {
        this.scene.start('SelectScene');
    }

    createBrushTexture() {
        const graphics = this.make.graphics();
        graphics.fillStyle(0xffffff);
        // Erase circle
        graphics.fillCircle(30, 30, 30);
        graphics.generateTexture('brush', 60, 60);
        graphics.destroy();
    }

    createParticleTexture() {
        const graphics = this.make.graphics();
        graphics.fillStyle(0xffffff, 0.8);
        graphics.fillCircle(5, 5, 5);
        graphics.generateTexture('particle', 10, 10);
        graphics.destroy();
    }
}
