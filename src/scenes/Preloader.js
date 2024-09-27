import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    this.load.image("logo", "logo.png");

    this.load.text("testing-init", "ini adalah contoh inisialisasi");

    this.load.image("background-menu", "background/game-menu.png");

    // start game font
    this.load.image("start-game-1", "atribut/Start-game-1.png");
    this.load.image("start-game-2", "atribut/Start-game-2.png");

    this.load.image("planet", "atribut/planet-1.png");
    this.load.image("ufo", "atribut/ufo-1.png");

    this.load.image("pesawat-luar-angkasa", "atribut/pesawat.png");

    // logo primary
    this.load.image("logo-primary", "atribut/Logo-primary-removebg.png");
    this.load.image("background-game", "background/background-game-menu.png");
    this.load.image("background-game-1", "background/background-game-1.png");
    this.load.image("background-game-2", "background/background-game-2.png");
    this.load.image("background-game-3", "background/background-game-3.png");

    // background game over
    this.load.image("background-gameover-1", "background/Game-Over-1.jpg");
    this.load.image(
      "background-gameover-2",
      "background/background-game-over-2.jpg"
    );
    // this.load.image("background-gameover-3", "background/Game-Over-1.jpg");

    // player

    this.load.image("player-blue", "player/Ship-1.png");
    this.load.image("player-blue-2", "player/Ship-2.png");
    this.load.image("player-blue-3", "player/Ship-3.png");
    this.load.image("player-blue-4", "player/Ship-4.png");

    this.load.image("health-point", "player/health-point-player.png");

    this.load.image("laser-blue", "laser/laser-blue.png");
    this.load.image("meteor", "atribut/meteor.png");

    // enemy
    this.load.image("ufo-red", "enemy/ufoRed.png");
    this.load.image("enemy-1", "enemy/enemy-1-removebg.png");
    this.load.image("enemy-2", "enemy/enemy-2-removebg.png");

    // explosion reference
    this.load.image("explosion-1", "atribut/explosion-removebg-1.png");
    this.load.image("explosion-2", "atribut/explosion-removebg-2.png");

    this.load.image("game-over-logo", "atribut/game-over-logo-remove.png");
    this.load.image("continue-logo", "atribut/continue-logo-remove.png");
    this.load.image("score-logo", "atribut/score-logo-remove.png");

    // fire blue for player
    this.load.image("fire-blue", "atribut/fire-blue-removebg.png");

    this.load.image("destroy-ship", "destroy/destroy-player.png");

    this.load.audio("main-menu-audio", "audio/main-menu.mp3");
    this.load.audio("sound-laser", "sound effect/sound-laser.mp3");
    this.load.audio("in-game-song", "sound effect/in-game-song.mp3");
    this.load.audio("game-over-song", "sound effect/game-over-song.mp3");
    this.load.audio("start-game", "sound effect/game-start.mp3");
    this.load.audio("damage-player", "sound effect/destroy-player.mp3");

    this.load.image("continue-game-over", "screnn/continue-final.png");
    this.load.image("mainmenu-game-over", "screnn/main-menu-final.png");

    this.load.image("loading-logo", "screnn/Loading-Font.png");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}

// scene adalah tempat kumpulan object, property untuk game kita
// contoh logo, gambar, pesawat, dll
