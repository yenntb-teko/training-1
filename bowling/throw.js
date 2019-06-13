var checkPinsDown = function(pinsDown) {
  return pinsDown <= 10;
};
// first throw
export function Throw(frame) {
  this.score = null;
  this.frame = frame;
}
Throw.prototype.assignScore = function(pinsDown) {
  if (this.checkPinsDown(pinsDown)) {
    this.score = pinsDown;
  }
  return this.score;
};
Throw.prototype.checkPinsDown = checkPinsDown;
// second throw
export function SecondThrow(frame) {
  this.score = null;
  this.frame = frame;
}
SecondThrow.prototype.checkPinsDown = checkPinsDown;
SecondThrow.prototype.isFinalFrame = function() {
  return (this.frame.type = "FinalFrame");
};
SecondThrow.prototype.assignScore = function(pinsDown) {
  if (this.isFinalFrame() && this.checkPinsDown(pinsDown)) {
    this.score = pinsDown;
  } else if (pinsDown <= 10 - this.frame.throw1.score) {
    this.score = pinsDown;
  }
  return this.score;
};
//third throw
export function ThirdThrow(frame) {
  this.score = null;
  this.frame = frame;
}
ThirdThrow.prototype.checkPinsDown = checkPinsDown;
ThirdThrow.prototype.assignScore = function(pinsDown) {
  if (this.checkPinsDown(pinsDown)) {
    this.score = pinsDown;
  }
  return this.score;
};
