//Player factory function
const player = (name, marker) => {
  return { name, marker };
};

//gameboard object
const gameBoard = (() => {
  let board = [];
  for (i = 0; i < 9; i++) {
    board.push("");
  }

  let squares = document.querySelector(".squares");

  board.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    squares.appendChild(square);
  });

  return { board };
})();
