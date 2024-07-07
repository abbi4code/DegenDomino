import { useEffect, useRef, useState } from "react";

import "./Game.css"
import Phaser from "phaser";
import bg from "../assets/bg.png"
import basket from "../assets/basket.png"
import apple from "../assets/apple.png"
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const Game = () => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [points, setPoints] = useState(0);
  const [remainingTime, setRemainingTime] = useState(60);

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
      textScore: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
      isGameOver: boolean;

      constructor() {
        super({ key: "scene-game" });

        this.player = {} as Phaser.Physics.Arcade.Image;
        this.cursor = {} as Phaser.Types.Input.Keyboard.CursorKeys;
        this.playerSpeed = speedDown - 100;
        this.target = {} as Phaser.Physics.Arcade.Image;
        this.points = 0;
        this.textTime = {} as Phaser.GameObjects.Text;
        this.timedEvent = {} as Phaser.Time.TimerEvent;
        this.remainingTime = 60;
        this.isGameOver = false;
      }

      preload() {
        this.load.image("bg",bg)
        this.load.image("basket", basket);
        this.load.image("apple", apple);
      }

      create() {
        this.scene.pause("scene-game");

        //this.add.image(0, 0, "bg").setOrigin(0, 0);
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
        this.textTime = this.add.text(10, 10, "Remaining Time: 00:60", {
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
        if (this.points >= 45) {
          gameEndScoreSpan.textContent = this.points.toString();
          gameWinLoseSpan.textContent = "Win! :>";
        } else {
          gameEndScoreSpan.textContent = this.points.toString();
          gameWinLoseSpan.textContent = "Lose! :<";
        }
        this.isGameOver = true;

        gameEndDiv.style.display = "flex";
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
    //   scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    //   },
    };
   //@ts-ignore
    gameRef.current = new Phaser.Game(config);

    const gameStartBtn = document.getElementById("gameStartBtn");
    const gameStartDiv = document.getElementById("gameStartDiv");
    const gameEndDiv = document.getElementById("gameEndDiv")!;
    const gameWinLoseSpan = document.getElementById("gameWinLoseSpan")!;
    const gameEndScoreSpan = document.getElementById("gameEndScoreSpan")!;

    if (gameStartBtn) {
      gameStartBtn.addEventListener("click", () => {
        if (gameStartDiv) {
          gameStartDiv.style.display = "none";
        }
        if (gameRef.current) {
          gameRef.current.scene.resume("scene-game");
        }
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return (
    <>
      <main>
        <canvas id="gameCanvas" className="h-screen w-full"></canvas>
        <div id="gameStartDiv" className="gameUI">
          <h1>Apple Catcher</h1>
          <p>
            <b>Welcome to the Apple Challenge!</b>
          </p>
          <p>You've got 60 seconds to master the art of apple catching.</p>
          <p>Catch more than 45 apples, and victory will be yours!</p>
          <p>Fall short of 45, and face the sweet taste of defeat.</p>
          <p>Click the start button to embark on this fruity adventure!</p>
          <button id="gameStartBtn">
            <p>Start</p>
          </button>
        </div>
        <div id="gameEndDiv" className="gameUI">
          <p>Game Over</p>
          <h1>
            You <span id="gameWinLoseSpan"></span>
          </h1>
          <h1>
            Final Score: <span id="gameEndScoreSpan"></span>
          </h1>
          <p>Refresh the page to play again</p>
          <p>Points: {points}</p>
          <p>Remaining Time: {remainingTime}</p>
        </div>
      </main>
    </>
  );
};

export default Game;
