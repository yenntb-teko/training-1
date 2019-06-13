import { Game } from "../game";

var game;
beforeEach(() => {
  game = new Game();
  game.initialNewArray();
});

it("Gutter game scores zero - When you roll all misses, you get a total score of zero.", () => {
  for (let i = 0; i < 10; i++) {
    game.frames[i].throw1.assignScore(0);
    game.frames[i].throw2.assignScore(0);
  }
  game.calculateGameScore();
  expect(game.gameScore).toBe(0);
});

it("All ones scores 20 - When you knock down one pin with each ball, your total score is 20.", () => {
  for (let i = 0; i < 10; i++) {
    game.frames[i].throw1.assignScore(1);
    game.frames[i].throw2.assignScore(1);
  }
  game.calculateGameScore();
  expect(game.gameScore).toBe(20);
});

it("A spare in the first frame, followed by three pins, followed by all misses scores 16.", () => {
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      game.frames[i].throw1.assignScore(4);
      game.frames[i].throw2.assignScore(6);
    } else if (i === 1) {
      game.frames[i].throw1.assignScore(3);
      game.frames[i].throw2.assignScore(0);
    } else {
      game.frames[i].throw1.assignScore(0);
      game.frames[i].throw2.assignScore(0);
    }
  }
  game.calculateGameScore();
  expect(game.gameScore).toBe(16);
});

it("A strike in the first frame, followed by three and then four pins, followed by all misses, scores 24.", () => {
  for (let i = 0; i < 10; i++) {
    if (i === 0) {
      game.frames[i].throw1.assignScore(10);
    } else if (i === 1) {
      game.frames[i].throw1.assignScore(3);
      game.frames[i].throw2.assignScore(4);
    } else {
      game.frames[i].throw1.assignScore(0);
      game.frames[i].throw2.assignScore(0);
    }
  }
  game.calculateGameScore();
  expect(game.gameScore).toBe(24);
});

it("A perfect game (12 strikes) scores 300.", () => {
  for (let i = 0; i < 10; i++) {
    game.frames[i].throw1.assignScore(10);
  }
  game.frames[9].throw2.assignScore(10);
  game.frames[9].throw3.assignScore(10);
  game.calculateGameScore();
  expect(game.gameScore).toBe(300);
});
