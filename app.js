let board;
let game = new Chess();

let config = {
  draggable: true,
  position: "start",
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = new Chessboard("board", config);

function onDragStart(source, piece, position, o) {
  if (game.game_over()) return false;
  if (game.turn() == "w" && piece.search(/^b/) != -1) return false
  if (game.turn() == "b" && piece.search(/^w/) != -1) return false;
}

function onDrop(source, target) {
  let move = game.move({ from: source, to: target, promotion: "q"});
  if (move == null) return "snapback";

  update();
}

function onSnapEnd() {
  board.position(game.fen());
}

function update() {
  let moveColor = "white";
  if (game.turn() == "b") moveColor = "black";

  document.getElementById("status").innerHTML = moveColor + " turn";

  if (game.in_checkmate()) {
    document.getElementById("status").innerHTML = "Game over, " + moveColor + " has lost.";
    document.getElementById("reset").style.visibility = "visible";
  }
  else if (game.in_draw()) {
    document.getElementById("status").innerHTML = "Game over, its a tie!";
    document.getElementById("reset").style.visibility = "visible";
  }
  else {
    if (game.in_check()) {
      document.getElementById("status").innerHTML += ", " + moveColor + " is in check";
    }
  }
}

function reset() {
  board = new Chessboard("board", config);
  game = new Chess();
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById("status").innerHTML = "white turn";
}