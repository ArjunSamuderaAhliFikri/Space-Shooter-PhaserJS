import { Scene } from "phaser";

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
  }

  create() {
    this.playerDamaged = this.sound.add("damage-player", { loop: true });
    this.inGameSong = this.sound.add("in-game-song", { loop: true });
    this.inGameSong.play();
    this.soundLaser = this.sound.add("sound-laser", { loop: true });
    this.backgroundMenu = this.add
      .tileSprite(750, 384, 750, 384, "background-game-3")
      .setScale(2);

    this.text = this.add.text(30, 30, "", {
      font: "16px Courier",
      fill: "0xfff6",
    });

    this.spawnNewEnemy = setInterval(() => {
      if (this.statusPage == "GameOver") {
        return;
      }

      if (this.setMaxEnemy > 0) {
        if (this.currentScore >= 30 && this.currentScore <= 45) {
          this.newEnemy = this.physics.add
            .sprite(750, 384, "enemy-1")
            .setScale(0.9);

          this.newEnemy.x = Math.round(Math.random() * 1450 + 5);
          this.newEnemy.y = -5;
          this.meteors.push(this.newEnemy);
          this.setMaxEnemy -= 1;
        } else if (this.currentScore >= 45) {
          this.newEnemySecondary = this.physics.add
            .sprite(750, 384, "enemy-2")
            .setScale(0.75);

          this.newEnemySecondary.x = Math.round(Math.random() * 1450 + 5);
          this.newEnemySecondary.y = -5;
          this.meteors.push(this.newEnemySecondary);
          this.setMaxEnemy -= 1;
        } else {
          this.newMeteor = this.physics.add
            .sprite(750, 384, "meteor")
            .setScale(0.25);

          this.newMeteor.x = Math.round(Math.random() * 1450 + 5);
          this.newMeteor.y = -5;
          this.meteors.push(this.newMeteor);
          this.setMaxEnemy -= 1;
        }

        this.newEnemy.x = Math.round(Math.random() * 1450 + 5);
        this.newEnemy.y = -5;
        this.meteors.push(this.newEnemy);
        this.setMaxEnemy -= 1;
      } else if (this.setMaxEnemy == 0) {
        setTimeout(() => {
          this.setMaxEnemy = 10;
        }, 2500);
      }
    }, 500);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.laserBlue = this.physics.add
      .sprite(750, 500, "laser-blue")
      .setScale(1.3);

    this.fireBlue = this.physics.add.sprite(750, 700, "fire-blue");
    this.fireBlue.setScale(0.2).flipY = true;
    this.fireBlue.setVisible(false);

    this.player = this.physics.add
      .sprite(750, 650, "player-blue")
      .setScale(0.5);
    this.player.flipY = true;

    this.scoreText = this.add.text(215, 55, "0", {
      fontSize: 32,
    });
    this.scoreLogo = this.add.image(120, 70, "score-logo").setScale(0.3);
    this.healthPointLogo = this.add
      .image(75, 130, "health-point")
      .setScale(0.3);

    this.healthPoint = this.add.text(100, 115, " : 100%", {
      fontSize: 24,
    });

    this.player.setDamping(true);
    this.player.setMaxVelocity(500);
    this.player.setBodySize(this.player.width * 0.7, this.player.height * 0.7);

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
  }

  handleDamagePlayer(player, meteor) {
    this.playerDamaged.play();
    meteor.setTexture("explosion-2").setScale(5);
    this.healthPointPlayer -= 25;
    this.healthPoint.setText(` : ${this.healthPointPlayer}%`);
    this.maxHealthPoint -= 1;
    setTimeout(() => {
      this.playerDamaged.stop();
      meteor.destroy();
    }, 1);
  }

  handleDestroyMeteors(laser, meteor) {
    this.soundLaser.play();
    meteor.setTexture("explosion-2");
    laser.y = this.player.y;
    this.currentScore += 1;
    this.scoreText.setText(`${this.currentScore}`);
    setTimeout(() => {
      meteor.destroy();
      this.soundLaser.stop();
    }, 100);
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
  handleShootLaser(player, laser, score) {
    laser.x = player.x;

    if (laser.y < -20) {
      laser.y = 650;
    } else {
      if (score >= 0 && score <= 15) {
        laser.y -= 25;
      } else if (score >= 15 && score <= 30) {
        laser.y -= 30;
      } else if (score >= 30 && score <= 45) {
        laser.y -= 35;
      } else if (score >= 45) {
        laser.y -= 40;
      }
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
    // this.scene.start("GameOver");
    if (this.healthPointPlayer <= 0) {
      clearInterval(this.spawnNewEnemy);
      this.scene.start("GameOver", this.currentScore);
      this.statusPage = "GameOver";
      this.meteors = [];
      this.currentScore = 0;
      this.setMaxEnemy = 5;
      this.healthPointPlayer = 100;
      this.moveBackground = 0.5;
      this.maxHealthPoint = 4;
      this.healthPointItems = [];
      this.inGameSong.stop();
      return;
    }

    this.handleShootLaser(this.player, this.laserBlue, this.currentScore);

    if (this.cursor.left.isDown) {
      this.fireBlue.setVisible(true);

      this.player.body.setAccelerationX(-1500);
      this.player.angle = -5;
    } else if (this.cursor.right.isDown) {
      this.fireBlue.setVisible(true);
      this.player.body.setAccelerationX(1500);
      this.player.angle = 5;
    } else {
      this.fireBlue.setVisible(false);
      this.player.setAcceleration(0);
      this.fireBlue.setAcceleration(0);
      this.player.angle = 0;
    }

    this.physics.world.wrap(this.player, 50);
    this.calcThrustPosition();

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
          this.player.setTexture("player-blue-2");
          this.meteors[i].y += 8;
          this.meteors[i].setScale(0.45);
          this.moveBackground = 2.5;
          this.laserBlue.setScale(1.5);
        } else if (this.currentScore >= 30 && this.currentScore <= 45) {
          this.player.setTexture("player-blue-3");
          this.meteors[i].y += 10;
          this.meteors[i].setScale(0.5);
          this.moveBackground = 3.5;
          this.laserBlue.setScale(1.7);
        } else if (this.currentScore >= 45) {
          this.player.setTexture("player-blue-4");
          this.meteors[i].y += 12.5;
          this.meteors[i].setScale(0.55);
          this.moveBackground = 4.5;
          this.laserBlue.setScale(1.9);
        }
      }
    }
  }
}
