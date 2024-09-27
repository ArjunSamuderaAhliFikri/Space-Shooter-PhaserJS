import { Scene } from "phaser";

export class LoadingPage extends Scene {
  constructor() {
    super("LoadingPage");
    this.setLoading = 1;
    this.setTexting = 1;
    this.processBar = 0;
  }

  create() {
    this.testingText = this.add.text(1300, 600, "", {
      fontFamily: "Arial Black",
      stroke: 10,
      fontSize: 64,
    });

    this.loadingLogo = this.add.image(1165, 640, "loading-logo").setScale(0.5);

    this.createRectangle = this.add.rectangle(1, 680, 1, 20, 0xffff);

    this.setBarLoading = setInterval(() => {
      if (this.setLoading > 1250) {
        this.setLoading = 1;
        this.processBar = 0;
        clearInterval(this.setBarLoading);
        clearInterval(this.changeLoadingText);
        this.createRectangle.width = this.setLoading;
        this.scene.start("PlayGame");
      } else {
        this.setLoading += 20;
        this.processBar += 2;
        this.createRectangle.width = this.setLoading;
      }
    }, 50);

    this.changeLoadingText = setInterval(() => {
      if (this.setLoading > 1250) {
        clearInterval(this.setBarLoading);
        clearInterval(this.changeLoadingText);
        this.scene.start("PlayGame");
      }
      if (this.setTexting > 3) {
        this.setTexting = 0;
      }
      if (this.setTexting == 1) {
        this.testingText.setText(".");
      } else if (this.setTexting == 2) {
        this.testingText.setText("..");
      } else if (this.setTexting == 3) {
        this.testingText.setText("...");
      } else {
        this.testingText.setText("");
      }
      this.setTexting += 1;
    }, 500);
  }

  update() {}
}
