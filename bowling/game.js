import { Frame } from "./frame";
import { FinalFrame } from "./finalFrame";

export function Game() {
  this.frames = [];
  for (let i = 1; i <= 9; i++) {
    this.frames.push(new Frame(this));
  }
  this.frames[9] = new FinalFrame(this);
  this.frameScores = [];
  this.gameScore = null;
}

Game.prototype.collateFrameScores = function() {
  let scoreFrame;
  for (let i = 0; i < this.frames.length; i++) {
    this.frames[i].calculateTotalScore();
    scoreFrame = this.frames[i].totalScore;
    if (scoreFrame !== null) {
      this.frameScores.push(scoreFrame);
    } else {
      this.frameScores.push(0);
    }
  }
  console.log("game.frameScores: ", this.frameScores);
};

Game.prototype.calculateGameScore = function() {
  this.collateFrameScores();
  this.gameScore = this.frameScores.reduce((sum, score) => {
    return sum + score;
  });
  return this.gameScore;
};
