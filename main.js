//Player factory function
const createPlayer = (name, marker) => {
  return { name, marker };
};

//gameboard object
const gameBoard = (() => {
  //Create gameboard square
  let board = [];
  for (i = 0; i < 9; i++) {
    board.push("");
  }

  //create squares container
  let squares = document.querySelector(".squares");

  //create square elements
  board.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    squares.appendChild(square);
  });

  Array.from(squares.children).forEach((square, index) => {
    square.addEventListener("click", () => {
      //add active player marker
      square.classList.add(game.playerTurn.marker);
      square.setAttribute("data", game.playerTurn.marker);
      //add that marker to the index clicked on
      board[index] = game.playerTurn.marker;
      square.style.pointerEvents = "none";
      game.remainingTurns -= 1;
      game.checkWinner();
      //check remaining spots
      if (game.winner == false) {
        game.nextPlayerAlert();
        game.nextPlayer();
      } else if (game.remainingTurns == 0) {
        game.gameTied();
      }
    });
  });

  function gameReset() {}

  return { board, gameReset };
})();

//game object
const game = (() => {
  //create players
  const playerOne = createPlayer("Player 1", "x");
  const playerTwo = createPlayer("Player 2", "o");

  //start of game
  let playerTurn = playerOne;
  let winner = false;
  let remainingTurns = 9;

  //messages to DOM
  let messages = document.querySelector(".messages"); //to display winner
  let playerName = document.querySelector(".playerName");

  //winning conditions
  let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //check for winner
  function checkWinner() {
    winningConditions.forEach((item, index) => {
      if (
        gameBoard.board[item[0]] === this.playerTurn.marker &&
        gameBoard.board[item[1]] === this.playerTurn.marker &&
        gameBoard.board[item[2]] === this.playerTurn.marker
      ) {
        console.log("Winner!");
        messages.textContent = `${playerTurn.name} is the winner!`;
      }
    });
  }

  function nextPlayerAlert() {
    this.playerTurn === playerOne
      ? (playerName.textContent = "Player 2")
      : (playerName.textContent = "Player 1");
  }

  function nextPlayer() {
    this.playerTurn === playerOne
      ? (this.playerTurn = playerTwo)
      : (this.playerTurn = playerOne);
    console.log("nextPlayer() ran");
    console.log("active player: " + playerTurn.name);
  }

  function gameTied() {
    messages.innerHTML = "<b>TIED GAME!</b>";
  }

  return {
    playerTurn,
    winner,
    remainingTurns,
    checkWinner,
    nextPlayer,
    winningConditions,
    nextPlayerAlert,
    gameTied,
  };
})();
