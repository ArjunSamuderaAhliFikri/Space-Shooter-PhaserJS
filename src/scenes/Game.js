import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("PlayGame");
    this.meteors = [];
  }
  init() {
    this.texting = "arjun samudera ahli fikri";
  }

  preload() {
    this.load.image("logoku", "assets/logo.png");
  }

  create() {
    this.cursor = this.input.keyboard.createCursorKeys();

    this.backgroundMenu = this.add
      .tileSprite(750, 384, 750, 384, "background-menu")
      .setScale(2.5);

    this.laserBlue = this.physics.add
      .sprite(750, 600, "laser-blue")
      .setScale(2);
    this.player = this.physics.add
      .sprite(750, 650, "player-blue")
      .setScale(1.3);

    this.player.setMaxVelocity(200);

    this.current = 750;

    for (let i = 0; i < 5; i++) {
      this.meteor = this.physics.add
        .image(this.current, 200, "meteor")
        .setScale(0.4);
      this.current += 50 * 2;
      this.meteors.push(this.meteor);
    }

    this.physics.add.collider(
      this.laserBlue,
      this.meteors,
      this.hitEnemy,
      null,
      this
    );
  }

  hitEnemy(player, enemy) {
    enemy.destroy();
  }

  // fungsi handleMovePlayer berada diluar fungsi 'create()'
  // fungsi untuk menggerakkan rocket
  handleMovePlayer(player, laser, cursor) {
    if (cursor.left.isDown) {
      // player.velocityFromAngle();
      player.x -= 10;
      player.angle = -6;
      laser.x -= 10;

      setTimeout(() => {
        player.angle = 0;
      }, 100);
    } else if (cursor.right.isDown) {
      player.x += 10;
      player.angle = 6;
      laser.x += 10;

      setTimeout(() => {
        player.angle = 0;
      }, 100);
    }
  }

  // fungsi ini dibuat diluar fungsi 'create()'
  // fungsi untuk menembak laser
  handleShootLaser(laser, meteor) {
    if (laser.y < -20) {
      laser.y = 650;
    } else {
      if (laser.y == meteor.y && laser.x == meteor.x) {
        laser.y = 650;
      } else {
        laser.y -= 50;
      }
    }
  }

  update() {
    this.handleMovePlayer(this.player, this.laserBlue, this.cursor);
    this.handleShootLaser(this.laserBlue, this.meteor);
    this.backgroundMenu.tilePositionY -= 0.5;

    this.player.setVelocity(0);

    for (let i = 0; i < this.meteors.length; i++) {
      this.meteors[i].angle += 2;
    }
  }
}
