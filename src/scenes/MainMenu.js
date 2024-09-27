import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.menuSong = this.sound.add("main-menu-audio", { loop: true });
    this.startGameSound = this.sound.add("start-game", { loop: true });
    this.menuSong.play();
    this.imageStart = ["start-game-1", "start-game-2"];

    this.cursor = this.input.keyboard.createCursorKeys();

    this.currentPositionSpace = 0;

    this.currentNumber = 0;

    this.backgroundMenu = this.add
      .tileSprite(0, 0, 512, 384, "background-game-3")
      .setScale(3);

    this.backgroundMenu.setOrigin(0, 0);

    // generate font start
    this.textStart = this.add
      .sprite(750, 600, "start-game-2")
      .setScale(0.5)
      .setAlpha(1);

    this.textStart.setInteractive();

    this.ufo = this.add.image(200, 200, "ufo").setScale(0.4);
    this.ufo.flipX = true;
    this.ufo.x = -100;

    this.meteor = this.add.image(1500, 0, "meteor").setScale(0.4);

    this.planet = this.add.image(1300, 870, "planet").setScale(1.8);

    this.pesawatLuarAngkasa = this.add
      .image(200, 160, "pesawat-luar-angkasa")
      .setScale(0.8);
    this.pesawatLuarAngkasa.flipX = true;

    this.logoPrimary = this.add.image(750, 300, "logo-primary").setScale(1.1);
    // this.logoPrimary.setInteractive();

    this.positionSpace = setInterval(() => {
      if (this.currentPositionSpace == 0) {
        this.currentPositionSpace = 1;
      } else if (this.currentPositionSpace == 1) {
        this.currentPositionSpace = 0;
      }
    }, 2500);

    this.handleChangeFont = setInterval(() => {
      if (this.currentNumber >= 1) {
        this.currentNumber = 0;
        this.textStart.setTexture("start-game-1");

        this.textStart.setInteractive();
      } else {
        this.currentNumber += 1;
        this.textStart.setTexture("start-game-2");

        this.textStart.setInteractive();
      }
    }, 1000);

    this.textStart.on("pointerdown", () => {
      this.startGameSound.play();
      clearInterval(this.positionSpace);
      clearInterval(this.handleChangeFont);
      this.menuSong.stop();
      setTimeout(() => {
        this.startGameSound.stop();
      }, 750);
      this.scene.start("LoadingPage");
    });

    // this.logoPrimary.on("pointerdown", () => {
    //   clearInterval(this.positionSpace);
    //   clearInterval(this.handleChangeFont);
    //   this.menuSong.stop();
    //   this.scene.start("PlayGame");
    // });
  }

  handleMoveUfo(ufo) {
    let setPositionY = Math.round(
      Math.random() * 1250 - Math.random() * 1250 + 5
    );
    if (ufo.x >= 1500) {
      ufo.x = 0;
      ufo.y = setPositionY;
    } else {
      ufo.x += 4;
      ufo.y += 2;
    }
  }

  update() {
    this.handleMoveUfo(this.ufo);

    if (this.currentPositionSpace == 1) {
      this.pesawatLuarAngkasa.y += 0.3;
      this.planet.y += 0.3;
    } else if (this.currentPositionSpace == 0) {
      this.pesawatLuarAngkasa.y -= 0.3;
      this.planet.y -= 0.3;
    }

    // this.planet.angle += 1;
    this.meteor.angle += 1;
    this.meteor.y += 0;
    this.meteor.x -= 2;
    this.backgroundMenu.tilePositionX -= 0.9;
  }
}
