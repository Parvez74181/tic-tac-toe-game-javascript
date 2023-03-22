const reset = document.querySelector("button"); // reset button
let cells = document.querySelectorAll(".box"); // all cells
const xPlayerScore = document.querySelector("#x-player-score"); // x player score
const oPlayerScore = document.querySelector("#o-player-score"); // y player score
cells = Array.from(cells); // make array from cells, cause selecting all cells will return a nodelists

// making winning chances array when to declare a winner
const winnigChances = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X"; // currentPlayer
let score = 0; // base score

// after content loading, show the score from localStorage. if localStorage has no score then show '0'
window.addEventListener("DOMContentLoaded", () => {
  xPlayerScore.innerText = `X - Player Score : ${
    localStorage.getItem("X") != null ? localStorage.getItem("X") : 0
  }`;

  oPlayerScore.innerText = `O - Player Score : ${
    localStorage.getItem("O") != null ? localStorage.getItem("O") : 0
  }`;
});

// game reset function
const gameReset = () => {
  cells.forEach((cell) => {
    cell.classList.remove("highlight"); // remove highlight class from the cells
    cell.innerText = ""; // clear the all text from the cells
  });
};

// cell highlight function
const highlightCells = (combination) => {
  combination.forEach((i) => {
    cells[i].classList.add("highlight"); // add highlight class to the winning combination cells to show the user who is winner

    xPlayerScore.innerText = `X - Player Score : ${
      localStorage.getItem("X") != null ? localStorage.getItem("X") : 0
    }`; // update the x player score

    oPlayerScore.innerText = `O - Player Score : ${
      localStorage.getItem("O") != null ? localStorage.getItem("O") : 0
    }`; // update the o player score

    setTimeout(() => {
      gameReset();
    }, 2000); // after 2sec, call the game reset function to clear the display
  });
};

// winner checking function
const checkWinner = () => {
  winnigChances.forEach((combination) => {
    let check = combination.every(
      (index) => cells[index].innerText.trim() == currentPlayer
    ); // cheking for every combination is cells contains the same currentPlayer or not

    if (check) {
      let x_palyer = localStorage.getItem("X");
      let o_palyer = localStorage.getItem("O");

      /*
       *if currentPlayer === "X" then update the xPlayerScore (if x_palyer return null then increse the score else update the score)*
       *else update the oPlayerScore (if o_palyer return null then increse the score else update the score)*
       */
      currentPlayer === "X"
        ? x_palyer
          ? localStorage.setItem("X", parseInt(x_palyer) + 1)
          : localStorage.setItem(currentPlayer, ++score)
        : o_palyer
        ? localStorage.setItem("O", parseInt(o_palyer) + 1)
        : localStorage.setItem(currentPlayer, ++score);

      highlightCells(combination); // call the highlightCells function to highlight the winning cells
    }
  });
};
// player showing function
const showPlayer = (cell) => {
  if (cell.innerText != "") return; // if cell contains any value then do not add another value

  cell.innerText = currentPlayer; // show the currentPlayer into the clicked cells
  checkWinner(); // call the checkWinner function to check that is there is any winner here or not

  currentPlayer = currentPlayer === "X" ? "O" : "X"; // if currentPlayer ==="X" then make it "O" else make as it was
};

cells.forEach((cell) => {
  cell.addEventListener("click", () => showPlayer(cell));
});

reset.addEventListener("click", () => {
  gameReset();
});
