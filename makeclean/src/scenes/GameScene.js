import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.vehicleId = data.vehicleId || 'car';
        this.requiredTool = data.requiredTool || 'tool-cream';
        this.selectedTool = null;
        this.isWinner = false;
        this.isPointerDown = false;

        // Grid system to estimate clean percentage
        this.gridCols = 10;
        this.gridRows = 10;
        this.cleanedCells = new Set();
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Center coordinates for the vehicle model
        this.modelX = width / 2 - 50;
        this.modelY = height / 2;

        // 1. Add Clean Image at bottom
        this.cleanImage = this.add.image(this.modelX, this.modelY, `${this.vehicleId}-clean`)
            .setScale(0.8);
        this.cleanBounds = this.cleanImage.getBounds();

        // 2. Add RenderTexture for dirty layer
        this.rt = this.add.renderTexture(0, 0, width, height);

        // Draw the dirty image exactly over the clean image
        const dirtyImage = this.add.image(this.modelX, this.modelY, `${this.vehicleId}-dirty`)
            .setScale(0.8)
            .setVisible(false); // Hide the actual sprite, just use it for texture

        this.rt.draw(dirtyImage);

        // 3. Create Tools Sidebar
        this.createSidebar();

        // 4. Input Events
        this.input.on('pointerdown', this.handlePointerDown, this);
        this.input.on('pointerup', this.handlePointerUp, this);
        this.input.on('pointermove', this.handlePointerMove, this);

        // 5. Particles for cleaning effect
        this.particles = this.add.particles(0, 0, 'particle', {
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 500,
            gravityY: 200,
            emitting: false
        });

        // 6. Back Button
        const backBtn = this.add.text(20, 20, '< Back', { fontSize: '24px', color: '#ffffff' })
            .setInteractive({ useHandCursor: true });

        backBtn.on('pointerdown', () => {
            // Hide CTA if visible
            document.getElementById('cta-container').classList.add('hidden');
            this.scene.start('SelectScene');
        });

        // Instructions
        this.instructions = this.add.text(width / 2 - 50, 40, 'Choose the correct tool and clean!', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Progress Indication
        this.progressText = this.add.text(width / 2 - 50, 75, 'Progress: 0%', {
            fontSize: '20px',
            color: '#aaaaaa'
        }).setOrigin(0.5);
    }

    createSidebar() {
        const tools = [
            'tool-chisel',
            'tool-cream',
            'tool-razor',
            'tool-scissors',
            'tool-screwdriver'
        ];

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const startY = height / 2 - 150;
        const spacing = 80;
        const sidebarX = width - 80;

        // Sidebar bg
        this.add.rectangle(sidebarX, height / 2, 100, height, 0x222222, 0.8);

        this.toolIcons = [];

        tools.forEach((tool, index) => {
            const y = startY + (index * spacing);
            const bg = this.add.circle(sidebarX, y, 25, 0x444444)
                .setInteractive({ useHandCursor: true });

            const icon = this.add.image(sidebarX, y, tool).setScale(0.25);

            bg.on('pointerdown', () => this.selectTool(tool, index));

            this.toolIcons.push({ bg, icon, toolName: tool });
        });
    }

    selectTool(toolName, index) {
        if (this.isWinner) return;

        this.selectedTool = toolName;

        // Highlight selected tool
        this.toolIcons.forEach((t, i) => {
            if (i === index) {
                t.bg.setFillStyle(0x4ade80); // green
            } else {
                t.bg.setFillStyle(0x444444); // default
            }
        });

        // Feedback
        if (toolName === this.requiredTool) {
            this.instructions.setText('Correct! Now start rubbing.');
            this.instructions.setColor('#4ade80');
        } else {
            this.instructions.setText('Wrong tool! Will not work.');
            this.instructions.setColor('#ef4444');
        }
    }

    handlePointerDown(pointer) {
        if (this.isWinner) return;
        this.isPointerDown = true;
        this.eraseAtPointer(pointer);
    }

    handlePointerUp() {
        this.isPointerDown = false;
        this.particles.stop();
    }

    handlePointerMove(pointer) {
        if (this.isPointerDown) {
            this.eraseAtPointer(pointer);
        }
    }

    eraseAtPointer(pointer) {
        if (this.isWinner || !this.selectedTool) return;

        if (this.selectedTool !== this.requiredTool) {
            // Wrong tool - do nothing
            return;
        }

        // Check if pointer is within the bounds of the image
        if (
            pointer.x >= this.cleanBounds.centerX - this.cleanBounds.width / 2 &&
            pointer.x <= this.cleanBounds.centerX + this.cleanBounds.width / 2 &&
            pointer.y >= this.cleanBounds.centerY - this.cleanBounds.height / 2 &&
            pointer.y <= this.cleanBounds.centerY + this.cleanBounds.height / 2
        ) {
            // Erase from RenderTexture
            this.rt.erase('brush', pointer.x, pointer.y);

            // Particles effect
            this.particles.setX(pointer.x);
            this.particles.setY(pointer.y);
            this.particles.start();

            this.updateCleaningProgress(pointer.x, pointer.y);
        }
    }

    updateCleaningProgress(x, y) {
        // Relative position inside the image bounds
        const relX = x - this.cleanBounds.left;
        const relY = y - this.cleanBounds.top;

        // Total width/height
        const w = this.cleanBounds.width;
        const h = this.cleanBounds.height;

        // Cell width/height
        const cellW = w / this.gridCols;
        const cellH = h / this.gridRows;

        const col = Math.floor(relX / cellW);
        const row = Math.floor(relY / cellH);

        // Valid cell check
        if (col >= 0 && col < this.gridCols && row >= 0 && row < this.gridRows) {
            const cellId = `${col},${row}`;
            this.cleanedCells.add(cellId);

            this.checkWinCondition();
        }
    }

    checkWinCondition() {
        const totalCells = this.gridCols * this.gridRows;
        const cleanedPercentage = this.cleanedCells.size / totalCells;

        const progressNumber = Math.min(100, Math.floor(cleanedPercentage * 100));
        this.progressText.setText(`Progress: ${progressNumber}%`);

        // If 85% of the sectors are rubbed, trigger win
        if (cleanedPercentage >= 0.85 && !this.isWinner) {
            this.progressText.setText(`Progress: 100%`);
            this.triggerWin();
        }
    }

    triggerWin() {
        this.isWinner = true;
        this.particles.stop();
        this.instructions.setText('Sparkling Clean!');
        this.instructions.setColor('#4ade80');

        // Fade out the dirty RT completely
        this.tweens.add({
            targets: this.rt,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Show CTA
                document.getElementById('cta-container').classList.remove('hidden');

                // Add some celebration scale animation to the clean vehicle
                this.tweens.add({
                    targets: this.cleanImage,
                    scale: 0.9,
                    duration: 500,
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    }
}
