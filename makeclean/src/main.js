import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import SelectScene from './scenes/SelectScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#555555',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, SelectScene, GameScene]
};

const game = new Phaser.Game(config);

// Expose game instance globally for debugging or DOM interactions
window.game = game;
