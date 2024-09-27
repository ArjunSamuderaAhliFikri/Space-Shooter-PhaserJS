import { Scene } from "phaser";

// class Bullet extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y) {
//     super(scene, x, y, "bullet");
//   }

//   fire(x, y) {
//     this.body.reset(x, y);

//     this.setActive(true);
//     this.setVisible(true);

//     this.setScale(5);

//     this.setVelocityY(-1000);
//   }

//   preUpdate(time, delta) {
//     super.preUpdate(time, delta);

//     if (this.y <= -32) {
//       this.setActive(false);
//       this.setVisible(false);
//     }
//   }
// }

// class Bullets extends Phaser.Physics.Arcade.Group {
//   constructor(scene) {
//     super(scene.physics.world, scene);

//     this.createMultiple({
//       frameQuantity: 100,
//       key: "bullet",
//       active: false,
//       visible: false,
//       classType: Bullet,
//     });
//   }

//   fireBullet(x, y) {
//     const bullet = this.getFirstDead(false);

//     if (bullet) {
//       bullet.fire(x, y);
//     }
//   }
// }

export class Game extends Scene {
  constructor() {
    super("PlayGame");
    this.meteors = [];
    this.currentScore = 0;
    this.setMaxEnemy = 10;
    this.healthPointPlayer = 100;
    this.moveBackground = 0.5;
    this.maxHealthPoint = 4;
    this.healthPointItems = [];
    this.statusPage = "Game";

    this.position = {
      x: 750,
      y: 384,
    };
  }

  init() {
    this.statusPage = "Game";
    console.log("initialized!");
  }

  create() {
    this.backgroundMenu = this.add
      .tileSprite(750, 384, 750, 384, "background-game-3")
      .setScale(2);
    // this.bullets = new Bullets(this);

    this.isBetween = this.setBetween(0, 1600);

    this.text = this.add.text(30, 30, "", {
      font: "16px Courier",
      fill: "0xfff6",
    });

    this.spawnNewEnemy = setInterval(() => {
      if (this.statusPage == "GameOver") {
        return;
      }

      if (this.setMaxEnemy > 0) {
        this.newMeteor = this.physics.add
          .image(750, 384, "meteor")
          .setScale(0.25);

        this.newMeteor.x = Math.round(Math.random() * 1450 + 5);
        this.newMeteor.y = -5;
        this.meteors.push(this.newMeteor);
        this.setMaxEnemy -= 1;
      } else if (this.setMaxEnemy == 0) {
        setTimeout(() => {
          this.setMaxEnemy = 10;
        }, 2500);
      }
    }, 500);

    this.thrust = this.add.image(750, 640, "thrust");
    this.cursor = this.input.keyboard.createCursorKeys();

    this.laserBlue = this.physics.add
      .sprite(750, 500, "laser-blue")
      .setScale(1.3);

    this.fireBlue = this.physics.add.sprite(750, 700, "fire-blue");
    this.fireBlue.setScale(0.2).flipY = true;
    this.fireBlue.setVisible(false);

    this.player = this.physics.add
      .sprite(750, 650, "player-blue")
      .setScale(0.3);

    this.scoreText = this.add.text(50, 50, "Score : 0", {
      fontSize: 32,
    });
    this.healthPoint = this.add.text(50, 100, "HP : 100", {
      fontSize: 24,
    });

    this.player.setDamping(true);
    this.player.setMaxVelocity(500);
    this.player.setBodySize(this.player.width * 0.7, this.player.height * 0.7);

    this.current = 750;

    // TODO  || WILL BE CHANGED

    // for (let i = 0; i < this.setMaxEnemy; i++) {
    //   this.meteor = this.physics.add.image(750, 384, "meteor").setScale(0.25);
    //   this.meteors.push(this.meteor);
    //   this.meteors[i].x = Math.round(Math.random() * 1450 + 5);
    //   this.meteors[i].y = -5;
    // }

    this.physics.add.collider(
      this.laserBlue,
      this.meteors,
      this.handleDestroyMeteors,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.meteors,
      this.handleDamagePlayer,
      null,
      this
    );

    this.isDamage = false;
  }

  handleDamagePlayer(player, meteor) {
    meteor.setTexture("explosion-2").setScale(5);
    this.healthPointPlayer -= 25;
    this.healthPoint.setText(`HP : ${this.healthPointPlayer}`);
    // this.healthPointItems = this.healthPointItems.slice(0, 2);
    this.maxHealthPoint -= 1;
    console.log(this.maxHealthPoint);
    this.isDamage = true;

    // setTimeout(() => {
    //   this.isDamage = false;
    // }, 10);
    setTimeout(() => {
      meteor.destroy();
    }, 1);
  }

  handleDestroyMeteors(laser, meteor) {
    meteor.setTexture("explosion-2");
    laser.y = this.player.y;
    this.currentScore += 1;
    this.scoreText.setText(`Score : ${this.currentScore}`);
    setTimeout(() => {
      meteor.destroy();
    }, 100);
    console.log("is destroy!");
  }

  setBetween(min, max) {
    return Math.floor(Math.random() * (max - min * 2) + min);
  }

  // fungsi handleMovePlayer berada diluar fungsi 'create()'
  // fungsi untuk menggerakkan rocket
  handleMovePlayer(player, laser, cursor) {
    if (cursor.left.isDown) {
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
  handleShootLaser(player, laser) {
    laser.x = player.x;

    if (laser.y < -20) {
      laser.y = 650;
    } else {
      laser.y -= 25;
    }
  }

  calcThrustPosition() {
    // angle - 90 karena asset gambar menghadap ke atas. di PhaserJS 0 derajat mengarah ke kanan ( timur )
    const rotation = Phaser.Math.DegToRad(this.player.angle - 90);

    const distance = 40;
    const thrustX = this.player.x - Math.cos(rotation) * distance;
    const thrustY = this.player.y - Math.sin(rotation) * distance;

    this.fireBlue.setPosition(thrustX, thrustY);
    this.fireBlue.angle = this.player.angle;
  }

  update() {
    this.scene.start("GameOver", this.currentScore);

    if (this.healthPointPlayer == 0) {
      this.statusPage = "GameOver";
      this.scene.start("GameOver", this.currentScore);
      clearInterval(this.spawnNewEnemy);
      this.meteors = [];
      this.currentScore = 0;
      this.setMaxEnemy = 5;
      this.healthPointPlayer = 100;
      this.moveBackground = 0.5;
      this.maxHealthPoint = 4;
      this.healthPointItems = [];
      return;
    }

    // if (this.isDamage) {
    //   this.healthPointPlayer -= 1;
    //   console.log(this.healthPointPlayer);
    // }
    this.handleShootLaser(this.player, this.laserBlue);
    // this.laserBlue.x = this.player.x;
    // this.fireBlue.x = this.player.x;
    // if (this.cursor.space.isDown) {
    //   this.handleShootLaser(this.laserBlue);
    // }

    if (this.cursor.left.isDown) {
      this.fireBlue.setVisible(true);

      this.player.body.setAccelerationX(-1500);
      // this.fireBlue.body.setAccelerationX(-1500);
      this.player.angle = -5;
      // this.fireBlue.angle = -10;

      this.thrust.setVisible(true);
    } else if (this.cursor.right.isDown) {
      this.fireBlue.setVisible(true);
      this.player.body.setAccelerationX(1500);
      // this.fireBlue.body.setAccelerationX(1500);
      this.player.angle = 5;
      // this.fireBlue.angle = 10;
    } else {
      this.fireBlue.setVisible(false);
      this.player.setAcceleration(0);
      this.fireBlue.setAcceleration(0);
      this.thrust.setVisible(true);
      this.player.angle = 0;
    }

    this.physics.world.wrap(this.player, 50);
    this.calcThrustPosition();

    // this.handleShootLaser(this.laserBlue, this.meteor, this.player);
    this.backgroundMenu.tilePositionY -= this.moveBackground;

    for (let i = 0; i < this.meteors.length; i++) {
      if (this.meteors[i].y > 1050) {
        this.meteors[i].destroy();
      } else {
        if (this.currentScore >= 0 && this.currentScore <= 15) {
          this.meteors[i].y += 4;
          this.meteors[i].angle += 2;
          this.meteors[i].setScale(0.3);
          this.moveBackground = 0.5;
        } else if (this.currentScore >= 15 && this.currentScore <= 30) {
          this.meteors[i].y += 8;
          this.meteors[i].angle += 2;
          this.meteors[i].setScale(0.45);
          this.meteors[i].angle += 2;
          this.moveBackground = 2.5;
        } else if (this.currentScore >= 30 && this.currentScore <= 45) {
          this.meteors[i].y += 10;
          this.meteors[i].angle += 2;
          this.meteors[i].setScale(0.5);
          this.moveBackground = 3.5;
        } else {
          this.meteors[i].angle += 2;
          this.meteors[i].y += 12.5;
          this.meteors[i].setScale(0.55);
          this.moveBackground = 4.5;
        }
      }
    }
  }
}
