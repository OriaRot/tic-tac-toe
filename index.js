const board = document.getElementById("board");
const startBtn = document.getElementById("btn");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
let elem;
let cnt = 0;
let players = [];
let boardSize = 0;
let flagCnt = 0;
let size = 0;

let newArr = [];
// function check(symbol){
// // for(i=1; i<=9; i++){//בדיקה מאוזן
// //     if(players[i]==symbol){
// //         newArr.push(symbol);
// //     }
//     // else{
//     //     newArr = [];
//     // }
//     // if(newArr.length==3){
//     //     alert(`${symbol} win`)
//     // }
// // }
//  newArr = [];
// for(i=1;i<=9;i++){// בדיקה מאונך
//     if(players[i]==symbol){
//         newArr.push(symbol);
//         i+=Math.sqrt(9)-1
//     }
//     else{
//         newArr = [];

//     }
//     if(newArr.length==3){
//         alert(`${symbol} win`)
//     }
// }
// newArr=[];
// for(i=1;i<=9;i++){//בדיקה אלכסון חיובי
//     if(players[i]==symbol){
//         newArr.push(symbol);
//         i+=Math.sqrt(9)
//     }
//     else{
//         newArr = [];

//     }
//     if(newArr.length==3){
//         alert(`${symbol} win`)
//     }
// }
// newArr=[];
// for(i=1;i<=9;i++){//בדיקה אלכסון שלילי
//     if(players[i]==symbol){
//         newArr.push(symbol);
//         i+=Math.sqrt(9)-2
//     }
//     else{
//         newArr = [];
//     }
//     if(newArr.length==3){
//         alert(`${symbol} win`)
//     }
// }
// }

function tableGame(size) {
  for (i = 1; i <= size; i++) {
    elem = document.createElement("div");
    elem.className = "card hidden";
    elem.id = i;
    board.appendChild(elem);
    elem.onclick = click;
  }
}
//tableGame();
function click(e) {
  e.target.classList.remove("hidden");
  if (cnt % 2 == 0) {
    e.target.innerText = "X";
    players[e.target.id] = "X";
    e.target.onclick = noClick;
    if (cnt >= size * 2 - 2) {
      check("X");
    }
  } else {
    e.target.innerText = "O";
    players[e.target.id] = "O";
    e.target.onclick = noClick;
    if (cnt >= size * 2 - 2) {
      check("O");
    }
  }
  cnt++;
}
function noClick() {}

startBtn.onclick = noClick;
btn3.onclick = small;
btn4.onclick = middle;
btn5.onclick = biggest;

function small() {
  board.classList.add("nine");
  startBtn.onclick = clickToStart;
  btn4.onclick = noClick;
  btn5.onclick = noClick;
  boardSize = 9;
  size = 3;
}

function middle() {
  board.classList.add("sixteen");
  startBtn.onclick = clickToStart;
  btn3.onclick = noClick;
  btn5.onclick = noClick;
  boardSize = 16;
  size = 4;
}

function biggest() {
  board.classList.add("twentyfive");
  startBtn.onclick = clickToStart;
  btn3.onclick = noClick;
  btn4.onclick = noClick;
  boardSize = 25;
  size = 5;
}

function clickToStart() {
  let hide = document.getElementById("before");
  hide.classList.add("hidden");
  cnt = 0;
  tableGame(boardSize);
}
function startAgain() {
  board.innerHTML = "";
  let hide = document.getElementById("before");
  hide.classList.remove("hidden");
  board.classList.remove("twentyfive");
  board.classList.remove("sixteen");
  board.classList.remove("nine");
  flagCnt = 0;
  players = [];
  startBtn.onclick = noClick;
  btn3.onclick = small;
  btn4.onclick = middle;
  btn5.onclick = biggest;
}

//  // debugger
//  let flag = false
//  for(j=1;j<=3;j++){
//      for (i = j; i <= 9; i+=3) {
//          if (players[i]== symbol){
//              flag = true
//          }else{
//              flag = false
//          }
//      }}
//      for(j=1;j<=9;j+=3){
//      for (i = j; i <= 3; i++) {
//          if (players[i]== symbol){
//              flag = true
//          }else{
//              flag = false
//          }
//      }}

//      for (i = 1; i <= 9; i+=4) {
//          if (players[i]== symbol){
//              flag = true
//          }else{
//              flag = false
//          }
//      }
//      for (i = 3; i <= 9; i+=2) {
//          if (players[i]== symbol){
//              flag = true
//          }else{
//              flag = false
//          }
//      }
//      if(flag == true){
//          alert(`${symbol} win`);
//      }

function check(symbol) {
  //Check Collumns
  for (j = 1; j <= size; j++) {
    for (i = j; i <= size ** 2; i += size) {
      if (players[i] == symbol) {
        flagCnt++;
        if (flagCnt == size) {
          alert(`${symbol} win`);
          startAgain();
          return;
        }
      } else {
        flagCnt = 0;
        break;
      }
    }
  }

  //Check Lines
  for (j = 1, x = 1; j <= size ** 2; j += size, x++) {
    for (i = j; i <= size * x; i++) {
      if (players[i] == symbol) {
        flagCnt++;
        if (flagCnt == size) {
          alert(`${symbol} win`);
          startAgain();
          return;
        }
      } else {
        flagCnt = 0;
        break;
      }
    }
  }
  //Check \
  for (i = 1; i <= size ** 2; i += size + 1) {
    if (players[i] == symbol) {
      flagCnt++;
      if (flagCnt == size) {
        alert(`${symbol} win`);
        startAgain();
        return;
      }
    } else {
      flagCnt = 0;
      break;
    }
  }
  //Check /
  for (i = size; i < size ** 2; i += size - 1) {
    if (players[i] == symbol) {
      flagCnt++;
      if (flagCnt == size) {
        alert(`${symbol} win`);
        startAgain();
        return;
      }
    } else {
      flagCnt = 0;
      break;
    }
  }

  //No Winner
  if (cnt == size ** 2 - 1 && flagCnt != size) {
    alert("tako");
    startAgain();
  }
}
