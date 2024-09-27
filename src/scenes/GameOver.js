import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  init(lastScore) {
    this.score = lastScore;
  }

  create() {
    this.backgroundGameOver = this.add
      .tileSprite(750, 384, 750, 384, "background-gameover-1")
      .setScale(2);
    // this.add.image(512, 384, 'background').setAlpha(0.5);

    this.isScore = this.add.text(750, 500, this.score, {
      fontSize: 50,
      color: "0xfff",
    });
    this.add
      .text(750, 384, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }

  update() {
    this.backgroundGameOver.tilePositionX += 0.6;
  }
}
