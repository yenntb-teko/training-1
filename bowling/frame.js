import { Throw, SecondThrow } from "./throw";

export function Frame(game) {
  this.throw1 = new Throw(this);
  this.throw2 = new SecondThrow(this);
  this.game = game;
  this.throwScore = null;
  this.bonusScore = null;
  this.totalScore = null;
}

Frame.prototype.calculateThrowScore = function() {
  if (this.throw2.score === null) {
    this.throwScore = this.throw1.score;
  } else {
    this.throwScore = this.throw1.score + this.throw2.score;
  }
  return this.throwScore;
};

Frame.prototype.calculateBonusScore = function() {
  if (this.isStrike()) {
    this.calculateStrikeBonus();
  } else if (this.isSpare()) {
    this.calculateSpareBonus();
  }
  return this.bonusScore;
};

Frame.prototype.isStrike = function() {
  return this.throw1.score === 10;
};
Frame.prototype.isSpare = function() {
  return this.throwScore === 10;
};
Frame.prototype.calculateStrikeBonus = function() {
  if (this.isNextFrameStrike() && this.currentFrame() !== 8) {
    this.doubleStrikeBonus();
  } else {
    this.strikeStandardBonus();
  }
};
Frame.prototype.currentFrame = function() {
  return this.game.frames.indexOf(this);
};
Frame.prototype.nextFrameFirstThrow = function() {
  let i = this.nextFrameIndex();
  return this.game.frames[i].throw1.score;
};
Frame.prototype.nextFrameIndex = function() {
  return this.currentFrame() + 1;
};
Frame.prototype.isNextFrameStrike = function() {
  return this.nextFrameFirstThrow() === 10;
};
Frame.prototype.doubleStrikeBonus = function() {
  this.bonusScore = this.nextFrameFirstThrow() + this.nextNextFrameFirstThrow();
};
Frame.prototype.nextNextFrameFirstThrow = function() {
  let j = this.nextNextFrameIndex();
  return this.game.frames[j].throw1.score;
};
Frame.prototype.nextNextFrameIndex = function() {
  return this.currentFrame() + 2;
};
Frame.prototype.strikeStandardBonus = function() {
  this.bonusScore = this.nextFrameFirstThrow() + this.nextFrameSecondThrow();
};
Frame.prototype.nextFrameSecondThrow = function() {
  let i = this.nextFrameIndex();
  return this.game.frames[i].throw2.score;
};
Frame.prototype.calculateSpareBonus = function() {
  this.bonusScore = this.nextFrameFirstThrow();
};

Frame.prototype.calculateTotalScore = function() {
  this.calculateThrowScore();
  this.calculateBonusScore();
  this.totalScore = this.throwScore + this.bonusScore;
  return this.totalScore;
};
