import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(lastScore) {
    this.score = lastScore;
  }

  create() {
    this.startGame = this.sound.add("start-game", { loop: true });
    this.gameOverSong = this.sound.add("game-over-song", { loop: true });
    this.gameOverSong.play();
    this.backgroundGameOver = this.add
      .tileSprite(750, 384, 750, 384, "background-gameover-1")
      .setScale(2);

    this.gameOverLogo = this.add
      .image(750, 300, "game-over-logo")
      .setScale(1.3);

    this.mainMenuLogo = this.add
      .image(550, 600, "mainmenu-game-over")
      .setScale(0.6)
      .setInteractive();

    this.mainMenuLogo.on("pointerdown", () => {
      this.startGame.play();
      this.gameOverSong.stop();
      setTimeout(() => {
        this.startGame.stop();
      }, 750);
      this.scene.start("MainMenu");
    });

    this.continueLogo = this.add
      .image(950, 600, "continue-game-over")
      .setScale(0.6)
      .setInteractive();

    this.continueLogo.on("pointerdown", () => {
      this.startGame.play();
      this.gameOverSong.stop();
      setTimeout(() => {
        this.startGame.stop();
      }, 750);
      this.scene.start("PlayGame");
    });

    this.isScore = this.add.text(620, 485, `High Score : ${this.score}`, {
      fontFamily: "Arial Black",
      fontSize: 32,
      fill: "#ffff",
    });
  }

  update() {
    this.backgroundGameOver.tilePositionX += 0.6;
  }
}
