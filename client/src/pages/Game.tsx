import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import Phaser from "phaser";
import bg from "../assets/bg.png";
import basket from "../assets/basket.png";
import apple from "../assets/apple.png";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const Game = () => {
  const navigate = useNavigate();
  const gameRef = useRef<Phaser.Game | null>(null);
  const [points, setPoints] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5)

  useEffect(() => {
    const speedDown = 800;

    class GameScene extends Phaser.Scene {
      player: Phaser.Physics.Arcade.Image;
      cursor: Phaser.Types.Input.Keyboard.CursorKeys;
      playerSpeed: number;
      target: Phaser.Physics.Arcade.Image;
      points: number;
      textTime: Phaser.GameObjects.Text;
      timedEvent: Phaser.Time.TimerEvent;
      remainingTime: number;
      textScore: Phaser.GameObjects.Text;
      isGameOver: boolean;
      navigate: Function;

      init(data: any) {
        this.navigate = data.navigate;
      }

      constructor() {
        super({ key: "scene-game" });

        this.player = {} as Phaser.Physics.Arcade.Image;
        this.cursor = {} as Phaser.Types.Input.Keyboard.CursorKeys;
        this.playerSpeed = speedDown - 100;
        this.target = {} as Phaser.Physics.Arcade.Image;
        this.points = 0;
        this.textTime = {} as Phaser.GameObjects.Text;
        this.timedEvent = {} as Phaser.Time.TimerEvent;
        this.remainingTime = 5
        this.textScore = {} as Phaser.GameObjects.Text;
        this.isGameOver = false;
        this.navigate = () => {};
      }

      preload() {
        this.load.image("bg", bg);
        this.load.image("basket", basket);
        this.load.image("apple", apple);
      }

      create() {
        const background = this.add.image(0, 0, "bg").setOrigin(0, 0);
        background.setScale(
          sizes.width / background.width,
          sizes.height / background.height
        );

        this.player = this.physics.add
          .image(0, sizes.height - 100, "basket")
          .setOrigin(0, 0);
        this.player.setImmovable(true);
        this.player.setGravity(0, 0);
        this.player.setCollideWorldBounds(true);

        this.player
          .setSize(
            this.player.width - this.player.width / 4,
            this.player.height / 6
          )
          .setOffset(
            this.player.width / 10,
            this.player.height - this.player.height / 10
          );

        if (this.input && this.input.keyboard) {
          this.cursor = this.input.keyboard.createCursorKeys();
        }

        this.target = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
        this.target.setMaxVelocity(100, speedDown);

        this.physics.add.overlap(
          this.target,
          this.player,
          this.targetHit,
          undefined,
          this
        );

        this.textScore = this.add.text(sizes.width - 110, 10, "Score:0", {
          font: "25px Arial",
          color: "#000000",
        });
        this.textTime = this.add.text(10, 10, "Remaining Time: 01:00", {
          font: "25px verdana",
          color: "#000000",
        });

        this.timedEvent = this.time.addEvent({
          delay: 1000,
          callback: this.updateTime,
          callbackScope: this,
          loop: true,
        });

        this.input.on("pointermove", this.handleTouchMove, this);
      }

      handleTouchMove(pointer: Phaser.Input.Pointer) {
        if (!this.isGameOver) {
          const touchX = pointer.x;
          const playerX = this.player.x + this.player.width / 2;

          if (touchX < playerX) {
            this.player.setVelocityX(-this.playerSpeed);
          } else if (touchX > playerX) {
            this.player.setVelocityX(this.playerSpeed);
          } else {
            this.player.setVelocityX(0);
          }
        }
      }

      updateTime() {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          setRemainingTime(this.remainingTime);
          this.textTime.setText(
            `Remaining Time: ${this.formatTime(this.remainingTime)}`
          );
        } else {
          this.gameOver();
        }
      }

      formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
      }

      update() {
        if (this.target.y >= sizes.height) {
          this.target.setY(0);
          this.target.setX(this.getRandomX());
        }

        const { left, right } = this.cursor ?? {};

        if (left?.isDown) {
          this.player.setVelocityX(-this.playerSpeed);
        } else if (right?.isDown) {
          this.player.setVelocityX(this.playerSpeed);
        } else {
          this.player.setVelocityX(0);
        }
      }

      getRandomX() {
        return Math.floor(Math.random() * 950);
      }

      targetHit() {
        this.target.setY(0);
        this.target.setX(this.getRandomX());
        this.points++;
        setPoints(this.points);
        this.textScore.setText(`Score: ${this.points}`);
      }

      gameOver() {
        const gameEndScoreSpan = document.getElementById("gameEndScoreSpan");
        const gameWinLoseSpan = document.getElementById("gameWinLoseSpan");

        if (gameEndScoreSpan && gameWinLoseSpan) {
          if (this.points >= 45) {
            gameEndScoreSpan.textContent = this.points.toString();
            gameWinLoseSpan.textContent = "Win! :>";
          } else {
            gameEndScoreSpan.textContent = this.points.toString();
            gameWinLoseSpan.textContent = "Lose! :<";
          }
        }

        this.navigate("/gameover"); // Use navigate function
        this.isGameOver = true;

        this.scene.stop();
      }
    }

    const config = {
      type: Phaser.WEBGL,
      width: sizes.width,
      height: sizes.height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: speedDown },
          debug: false,
        },
      },
      scene: [GameScene],
    };

    gameRef.current = new Phaser.Game(config);
    gameRef.current.scene.start("scene-game", { navigate });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [navigate]);

  return (
    <>
      <main>
        <canvas
          id="gameCanvas"
          ref={gameRef}
          className="h-screen w-full"
        ></canvas>
      </main>
    </>
  );
};

export default Game;
