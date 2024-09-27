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
    this.load.image("logo-primary", "atribut/primary-logo.png");
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

    this.load.image("player-blue", "player/pesawat-2.png");
    this.load.image("health-point", "player/health-point-player.png");

    this.load.image("laser-blue", "laser/laser-blue.png");
    this.load.image("bullet", "atribut/bullet7.png");
    this.load.image("meteor", "atribut/meteor.png");

    this.load.image("thrust", "atribut/effect_yellow.png");
    this.load.image("ufo-red", "enemy/ufoRed.png");

    // explosion reference
    this.load.image("explosion-1", "atribut/explosion-removebg-1.png");
    this.load.image("explosion-2", "atribut/explosion-removebg-2.png");

    // fire blue for player
    this.load.image("fire-blue", "atribut/fire-blue-removebg.png");

    this.load.image("destroy-ship", "destroy/destroy-player.png");
    this.load.audio("main-menu-audio", "audio/main-menu.mp3");
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
