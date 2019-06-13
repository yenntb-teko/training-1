import { Frame } from "./frame";
import { FinalFrame } from "./finalFrame";

export class Game {
  frames = [];
  frameScores = [];
  gameScore = null;

  initialNewArray = () => {
    for (let i = 1; i <= 9; i++) {
      this.frames.push(new Frame(this));
    }
    this.frames[9] = new FinalFrame(this);
  };

  collateFrameScores = () => {
    for (let i = 0; i < this.frames.length; i++) {
      this.frames[i].calculateTotalScore();
      this.frameScores.push(this.frames[i].totalScore || 0);
    }
  };

  calculateGameScore = () => {
    this.collateFrameScores();
    this.gameScore = this.frameScores.reduce((sum, score) => {
      return sum + score;
    }, 0);
    return this.gameScore;
  };
}
