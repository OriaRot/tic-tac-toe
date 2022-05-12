const board = document.getElementById("board");
const XorO = "X";
let elem;
let cnt = 0;
let players = [];
function tableGame() {
  for (i = 1; i <= 9; i++) {
    elem = document.createElement("div");

    elem.className = "card hidden";
    elem.id = i;
    board.appendChild(elem);
    elem.onclick = click;
  }
}
tableGame();
function click(e) {
  e.target.classList.remove("hidden");
  if (cnt % 2 == 0) {
    e.target.innerText = "X";
    players[e.target.id] = "X";
    e.target.onclick = noClick
    if (cnt >= 4) {
      check("X");
    }
  } else {
    e.target.innerText = "O";
    players[e.target.id] = "O";
    e.target.onclick = noClick
    if (cnt >= 4) {
      check("O");
    }
  }
  cnt++;
}

function check(symbol) {
    
  for (i = 1; i <= 9; i+=3) {
    if (players[i] == symbol && players[i + 1] == symbol && players[i + 2] == symbol ){
      alert(`${symbol} win`);
}
  }
  for (i = 1; i <= 3; i++) {
    if (players[i] == symbol && players[i + 3] == symbol && players[i + 6] == symbol ) {
      alert(`${symbol} win`);
    }
  }
  
    if (players[1] == symbol && players[5] == symbol && players[9] == symbol) {
      alert(`${symbol} win`);
    }
    if (players[3] == symbol && players[5] == symbol && players[7] == symbol) {
      alert(`${symbol} win`);
    }
    if(cnt==8){
        alert('tako')
    }

}

function noClick(){}