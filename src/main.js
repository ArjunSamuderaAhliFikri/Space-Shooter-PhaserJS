import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { LoadingPage } from "./scenes/LoadingPage";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 768,
  parent: "game-container",
  physics: {
    gravity: { x: 10 },
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  //   backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, LoadingPage, Game, GameOver],
};

export default new Phaser.Game(config);

// important: overlap method, physics function, destroy()
