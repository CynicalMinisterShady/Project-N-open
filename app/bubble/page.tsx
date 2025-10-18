// 'use client';

// import { useEffect, useRef } from 'react';

// export default function BubblePopGame() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const gameRef = useRef<Phaser.Game | null>(null);
//   const initRef = useRef(false);

//   useEffect(() => {
//     if (initRef.current || !containerRef.current) return;
    
//     const loadPhaser = async () => {
//       if (typeof window === 'undefined') return;
      
//       if (!(window as any).Phaser) {
//         await import('phaser');
//       }

//       initRef.current = true;
//       const Phaser = (window as any).Phaser;

//       class GameScene extends Phaser.Scene {
//         private redBubbles!: Phaser.Physics.Arcade.Group;
//         private whiteBubbles!: Phaser.Physics.Arcade.Group;
//         private scoreText!: Phaser.GameObjects.Text;
//         private missedText!: Phaser.GameObjects.Text;
//         private timerText!: Phaser.GameObjects.Text;
//         private spawnTimer!: Phaser.Time.TimerEvent;
//         private gameTimer!: Phaser.Time.TimerEvent;

//         constructor() {
//           super({ key: 'GameScene' });
//         }

//         preload() {
//           this.load.image('whiteBubble', 'https://res.cloudinary.com/dzhczzqwf/image/upload/v1760173920/nirveonx-white-bubble_hjphhh.png');
//           this.load.image('redBubble', 'https://res.cloudinary.com/dzhczzqwf/image/upload/v1760173920/nirveonx-red-bubble_m7rm5u.png');
//         }

//         create() {
//           this.data.set('redBurstCount', 0);
//           this.data.set('missedCount', 0);
//           this.data.set('gameTime', 15);
//           this.data.set('gameOver', false);

//           this.redBubbles = this.physics.add.group();
//           this.whiteBubbles = this.physics.add.group();

//           const fontSize = Math.max(16, Math.min(this.scale.width, this.scale.height) / 25);

//           this.scoreText = this.add.text(16, 16, 'Red Burst: 0', {
//             fontSize: `${fontSize}px`,
//             color: '#ff4444',
//             fontStyle: 'bold'
//           }).setDepth(1000);

//           this.missedText = this.add.text(16, 16 + fontSize * 1.8, 'Missed: 0', {
//             fontSize: `${fontSize}px`,
//             color: '#ffffff',
//             fontStyle: 'bold'
//           }).setDepth(1000);

//           this.timerText = this.add.text(16, 16 + fontSize * 3.6, 'Time: 15', {
//             fontSize: `${fontSize}px`,
//             color: '#44ff44',
//             fontStyle: 'bold'
//           }).setDepth(1000);

//           this.gameTimer = this.time.addEvent({
//             delay: 1000,
//             callback: this.updateTimer,
//             callbackScope: this,
//             loop: true
//           });

//           this.spawnTimer = this.time.addEvent({
//             delay: 500,
//             callback: this.spawnBubble,
//             callbackScope: this,
//             loop: true
//           });

//           this.input.on('gameobjectdown', this.onBubbleClick, this);
//           this.scale.on('resize', this.handleResize, this);
//         }

//         handleResize(gameSize: { width: number; height: number }) {
//           if (this.data.get('gameOver')) return;

//           const fontSize = Math.max(16, Math.min(gameSize.width, gameSize.height) / 25);

//           this.scoreText?.setFontSize(fontSize).setPosition(16, 16);
//           this.missedText?.setFontSize(fontSize).setPosition(16, 16 + fontSize * 1.8);
//           this.timerText?.setFontSize(fontSize).setPosition(16, 16 + fontSize * 3.6);
//         }

//         spawnBubble() {
//           if (this.data.get('gameOver')) return;

//           const w = this.scale.width;
//           const h = this.scale.height;
//           const scale = Math.min(w, h) / 1600;
//           const side = Phaser.Math.Between(0, 2);
          
//           let x: number, y: number, vx: number, vy: number;
          
//           if (side === 0) {
//             x = Phaser.Math.Between(50, w - 50);
//             y = h + 50;
//             vx = Phaser.Math.Between(-100, 100);
//             vy = Phaser.Math.Between(-150, -100);
//           } else if (side === 1) {
//             x = -50;
//             y = Phaser.Math.Between(h * 0.3, h);
//             vx = Phaser.Math.Between(100, 150);
//             vy = Phaser.Math.Between(-150, -50);
//           } else {
//             x = w + 50;
//             y = Phaser.Math.Between(h * 0.3, h);
//             vx = Phaser.Math.Between(-150, -100);
//             vy = Phaser.Math.Between(-150, -50);
//           }

//           const isRed = Math.random() < 0.2;
//           const bubble = (isRed ? this.redBubbles : this.whiteBubbles)
//             .create(x, y, isRed ? 'redBubble' : 'whiteBubble');

//           bubble
//             .setScale(scale)
//             .setInteractive()
//             .setVelocity(vx, vy)
//             .setData('type', isRed ? 'red' : 'white')
//             .setData('clicked', false);
//         }

//         onBubbleClick(_pointer: any, bubble: Phaser.GameObjects.GameObject) {
//           if (this.data.get('gameOver') || bubble.getData('clicked')) return;

//           bubble.setData('clicked', true);

//           if (bubble.getData('type') === 'red') {
//             const count = this.data.get('redBurstCount') + 1;
//             this.data.set('redBurstCount', count);
//             this.scoreText.setText(`Red Burst: ${count}`);
            
//             this.tweens.add({
//               targets: bubble,
//               scale: 0,
//               alpha: 0,
//               duration: 200,
//               onComplete: () => bubble.destroy()
//             });
//           } else {
//             const count = this.data.get('missedCount') + 1;
//             this.data.set('missedCount', count);
//             this.missedText.setText(`Missed: ${count}`);
            
//             this.tweens.add({
//               targets: bubble,
//               x: `+=${10}`,
//               duration: 50,
//               yoyo: true,
//               repeat: 3,
//               onComplete: () => bubble.destroy()
//             });
//           }
//         }

//         update() {
//           if (this.data.get('gameOver')) return;

//           const w = this.scale.width;
//           const h = this.scale.height;

//           this.redBubbles.children.each((bubble: any) => {
//             if ((bubble.y < -50 || bubble.y > h + 50 || bubble.x < -50 || bubble.x > w + 50) 
//                 && !bubble.getData('clicked')) {
//               const count = this.data.get('missedCount') + 1;
//               this.data.set('missedCount', count);
//               this.missedText.setText(`Missed: ${count}`);
//               bubble.destroy();
//             }
//             return true;
//           });

//           this.whiteBubbles.children.each((bubble: any) => {
//             if (bubble.y < -50 || bubble.y > h + 50 || bubble.x < -50 || bubble.x > w + 50) {
//               bubble.destroy();
//             }
//             return true;
//           });
//         }

//         updateTimer() {
//           if (this.data.get('gameOver')) return;

//           const time = this.data.get('gameTime') - 1;
//           this.data.set('gameTime', time);
//           this.timerText.setText(`Time: ${time}`);

//           if (time <= 0) {
//             this.endGame();
//           }
//         }

//         endGame() {
//           this.data.set('gameOver', true);
          
//           this.spawnTimer?.destroy();
//           this.gameTimer?.destroy();

//           this.redBubbles.setVelocityX(0).setVelocityY(0);
//           this.whiteBubbles.setVelocityX(0).setVelocityY(0);

//           const cx = this.scale.width / 2;
//           const cy = this.scale.height / 2;
//           const size = Math.max(20, Math.min(this.scale.width, this.scale.height) / 15);

//           this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.8).setDepth(2000);
          
//           this.add.text(cx, cy - size * 3, 'GAME OVER!', {
//             fontSize: `${size * 1.8}px`,
//             color: '#ffffff',
//             fontStyle: 'bold'
//           }).setOrigin(0.5).setDepth(2001);

//           this.add.text(cx, cy, 
//             `Red Bubbles Burst: ${this.data.get('redBurstCount')}\nMissed: ${this.data.get('missedCount')}`, {
//             fontSize: `${size}px`,
//             color: '#ffaa00',
//             fontStyle: 'bold',
//             align: 'center'
//           }).setOrigin(0.5).setDepth(2001);

//           this.add.text(cx, cy + size * 3.5, 'Click to Restart', {
//             fontSize: `${size * 0.9}px`,
//             color: '#44ff44',
//             fontStyle: 'bold'
//           }).setOrigin(0.5).setDepth(2001);

//           this.input.once('pointerdown', () => {
//             this.scene.restart();
//           });
//         }

//         shutdown() {
//           this.scale.off('resize', this.handleResize, this);
//           this.input.off('gameobjectdown', this.onBubbleClick, this);
//         }
//       }

//       const config: Phaser.Types.Core.GameConfig = {
//         type: Phaser.AUTO,
//         parent: containerRef.current!,
//         width: window.innerWidth,
//         height: window.innerHeight,
//         backgroundColor: '#181818',
//         physics: {
//           default: 'arcade',
//           arcade: {
//             gravity: { y: 0 },
//             debug: false
//           }
//         },
//         scene: GameScene,
//         scale: {
//           mode: Phaser.Scale.RESIZE,
//           autoCenter: Phaser.Scale.CENTER_BOTH
//         }
//       };

//       gameRef.current = new Phaser.Game(config);
//     };

//     loadPhaser();

//     return () => {
//       if (gameRef.current) {
//         gameRef.current.destroy(true, false);
//         gameRef.current = null;
//       }
//       initRef.current = false;
//     };
//   }, []);

//   return (
//     <div 
//       className='cursor-auto'
//       ref={containerRef}
//       style={{
//         width: '100vw',
//         height: '100vh',
//         margin: 0,
//         padding: 0,
//         overflow: 'hidden',
//         backgroundColor: '#181818',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         touchAction: 'none'
//       }}
//     />
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>
      Bubble Game is temporary off.
    </div>
  )
}

export default page