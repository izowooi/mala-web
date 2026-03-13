import Phaser from 'phaser';

export default class SelectScene extends Phaser.Scene {
    constructor() {
        super('SelectScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, 100, 'Select a Vehicle to Clean', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Create selection buttons
        this.createSelectButton(width / 2 - 200, height / 2, 'car', 'Car', 'tool-cream');
        this.createSelectButton(width / 2, height / 2, 'tank', 'Tank', 'tool-chisel');
        this.createSelectButton(width / 2 + 200, height / 2, 'airplane', 'Airplane', 'tool-screwdriver');
    }

    createSelectButton(x, y, vehicleId, label, requiredTool) {
        const container = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 150, 150, 0x4ade80, 0.8)
            .setInteractive({ useHandCursor: true });

        // Scale down the icon slightly to fit in the container
        const icon = this.add.image(0, -20, `${vehicleId}-dirty`)
            .setScale(0.2);

        const txt = this.add.text(0, 50, label, {
            fontSize: '24px',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        container.add([bg, icon, txt]);

        bg.on('pointerdown', () => {
            this.scene.start('GameScene', { vehicleId, requiredTool });
        });

        bg.on('pointerover', () => {
            bg.setFillStyle(0x16a34a, 0.8);
        });

        bg.on('pointerout', () => {
            bg.setFillStyle(0x4ade80, 0.8);
        });
    }
}
