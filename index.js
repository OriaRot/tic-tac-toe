const board01 = document.getElementById("board01");
const $ipt1 = document.getElementById("ipt1");
const $ipt2 = document.getElementById("ipt2");
const $startGame = document.getElementById("startGame");
const $saveGame = document.getElementById("saveGame");
const $loadGame = document.getElementById("loadGame");
const $p1Name = document.getElementById("p1Name");
const $p2Name = document.getElementById("p2Name");
const $undoPlay = document.getElementById("undoPlay");
const $timer = document.getElementById("timer");
const $newGame = document.getElementById("newGame");
const $stopGame = document.getElementById("stopGame");
const $clearPlayers = document.getElementById("clearPlayers");
const $recordTime = document.getElementById("recordTime");
const $recordCnt = document.getElementById("recordCnt");
const $bs3 = document.getElementById("bs3");
const $bs4 = document.getElementById("bs4");
const $bs5 = document.getElementById("bs5");

let boardSize;
let elem;
let cnt = 0;
let players = [];
let flagCnt = 0;
let undo = [];
let stopTimer = "stop";
let timerArray = [];
let pointsX = 0;
let pointsO = 0;
let Timescore = [];
let movesScore = [];

tableGame();

$startGame.addEventListener("click", startGame);
$undoPlay.addEventListener("click", undoPlay);
$saveGame.addEventListener("click", saveGame);
$loadGame.addEventListener("click", loadGame);
$newGame.addEventListener("click", newGame);
$stopGame.addEventListener("click", stopGame);
$clearPlayers.addEventListener("click", clearPlayers);

function boardSizeFun(e) {
  boardSize = Number(e.value);
  cnt = 0;
  clearBoard();
  stopTimer = "stop";
  clock();
  mls = 0;
  sec = 0;
  min = 0;
  $timer.innerText = `0${min}:0${sec}:0${mls}`;
}

function clearPlayers() {
  pointsO = 0;
  pointsX = 0;
  $p1Name.innerText = `Player 1 : ${pointsX}`;
  $p2Name.innerText = `Player 2 : ${pointsO}`;
}

//Clear Board
function clearBoard() {
  let divBoard = document.querySelectorAll(".board");
  for (i = 0; (div00 = divBoard[i]); i++) {
    div00.parentNode.removeChild(div00);
  }
}

function startGame() {
  if (!$bs3.checked && !$bs4.checked && !$bs5.checked) {
    console.log(`you didnt choose board size`);
    return;
  }
  if ($ipt1.value == "") {
    $p1Name.innerText = `Player 1 : ${pointsX}`;
  } else {
    $p1Name.innerText = `${$ipt1.value} : ${pointsX}`;
  }
  if ($ipt2.value == "") {
    $p2Name.innerText = `Player 2 : ${pointsO}`;
  } else {
    $p2Name.innerText = `${$ipt2.value} : ${pointsO}`;
  }
  $p1Name.classList.add("border");
  $p2Name.classList.remove("border");
  clearBoard();
  setToZero();
}

function newGame() {
  if (!$bs3.checked && !$bs4.checked && !$bs5.checked) {
    console.log(`you didnt choose board size`);
    return;
  }
  let divBoard = document.querySelectorAll(".board");
  for (i = 0; (div00 = divBoard[i]); i++) {
    div00.parentNode.removeChild(div00);
  }
  setToZero();
}

function setToZero() {
  tableGame(boardSize);
  players = [];
  undo = [];
  cnt = 0;
  stopTimer = "run";
  mls = 0;
  sec = 0;
  min = 0;
  flagCnt = 0;
  clock();
}

function stopGame() {
  stopTimer = "stop";
  clock();
}

function undoPlay() {
  cnt--;
  if (cnt < 0) {
    cnt = 0;
  }
  document.getElementById(undo[undo.length - 1]).innerText = " ";
  document.getElementById(undo[undo.length - 1]).className = "card hidden";
  document.getElementById(undo[undo.length - 1]).onclick = click;
  undo.pop();
}

function saveGame() {
  if (saveArray.length == 0) {
    saveArray.push(...players);
  }
  saveArray[0] = cnt;
  for (i in players) {
    if (players != undefined) {
      saveArray[i] = players[i];
    }
  }
  saveArray[boardSize ** 2 + 1] = boardSize;
  timerArray[0] = min;
  timerArray[1] = sec;
  timerArray[2] = mls;
  stopTimer = "stop";
}

function loadGame() {
  cnt = saveArray[0];
  let divBoard = document.querySelectorAll(".board");
  for (i = 0; (div00 = divBoard[i]); i++) {
    div00.parentNode.removeChild(div00);
  }

  tableGame(saveArray[saveArray.length - 1]);
  for (i = 1; i < saveArray.length - 1; i++) {
    if (saveArray[i] != undefined) {
      document.getElementById(i).className = "card";
      document.getElementById(i).innerText = saveArray[i];
    }
  }
  min = timerArray[0];
  sec = timerArray[1];
  mls = timerArray[2];
  stopTimer = "run";
  clock();
}

//Building the Board
function tableGame(boardSize) {
  let txt = "100px ".repeat(boardSize);
  elemBoard = document.createElement("div");
  elemBoard.id = "board";
  elemBoard.className = "board";
  elemBoard.style.height = boardSize * 100 + "px";
  elemBoard.style.width = boardSize * 100 + "px";
  elemBoard.style.gridTemplateColumns = txt;
  board01.appendChild(elemBoard);

  for (i = 1; i <= boardSize ** 2; i++) {
    elem = document.createElement("div");
    elem.className = "card hidden";
    elem.id = i;
    elemBoard.appendChild(elem);
    elem.onclick = click;
  }
}
let saveArray = [];
//Marking X or O on game
function click(e) {
  stopTimer = "run";
  clock();
  e.target.classList.remove("hidden");
  if (cnt % 2 == 0) {
    $p2Name.classList.add("border");
    $p1Name.classList.remove("border");
    e.target.innerText = "X";
    players[e.target.id] = "X";
    e.target.onclick = noClick;
    if (cnt >= boardSize * 2 - 2) {
      check("X");
    }
  } else {
    $p2Name.classList.remove("border");
    $p1Name.classList.add("border");

    e.target.innerText = "O";
    players[e.target.id] = "O";
    e.target.onclick = noClick;
    if (cnt >= boardSize * 2 - 2) {
      check("O");
    }
  }
  cnt++;
  undo.push(e.target.id);
}

function noClick() {}

function check(symbol, array = players) {
  if (saveArray.length != 0) {
    for (i in players) {
      if (players != undefined) {
        saveArray[i] = players[i];
      }
    }
    array = saveArray;
  }

  //Check Collumns
  for (j = 1; j <= boardSize; j++) {
    for (i = j; i <= boardSize ** 2; i += boardSize) {
      if (array[i] == symbol) {
        flagCnt++;
        if (flagCnt == boardSize) {

          winner(symbol);
        }
      } else {
        flagCnt = 0;
        break;
      }
    }
  }

  //Check Lines
  for (j = 1, x = 1; j <= boardSize ** 2; j += boardSize, x++) {
    for (i = j; i <= boardSize * x; i++) {
      if (array[i] == symbol) {
        flagCnt++;
        if (flagCnt == boardSize) {

          winner(symbol);
          return;
        }
      } else {
        flagCnt = 0;
        break;
      }
    }
  }
  //Check \
  for (i = 1; i <= boardSize ** 2; i += boardSize + 1) {
    if (array[i] == symbol) {
      flagCnt++;
      if (flagCnt == boardSize) {
        winner(symbol);
        return;
      }
    } else {
      flagCnt = 0;
      break;
    }
  }
  //Check /
  for (i = boardSize; i < boardSize ** 2; i += boardSize - 1) {
    if (array[i] == symbol) {
      flagCnt++;
      if (flagCnt == boardSize) {
        winner(symbol);
        return;
      }
    } else {
      flagCnt = 0;
      break;
    }
  }

  //No Winner
  if (cnt == boardSize ** 2 - 1 && flagCnt != boardSize) {
    alert("tako");
  }
}

function timerRecord() {
  if (cnt < 9) {
    cnt++;
  }
  movesScore.push(cnt);

  Timescore.push($timer.innerText);
  $recordCnt.innerText = `moves: ${movesScore.sort()[0]}`;

  $recordTime.innerText = `time: ${Timescore.sort()[0]}`;
}

function winner(symbol) {
  stopTimer = "stop";
  timerRecord();
  for (i = 1; i < boardSize ** 2 + 1; i++) {
    document.getElementById(i).onclick = noClick;
  }
  if (symbol == "X") {
    ++pointsX;
    $p1Name.innerText = `${$ipt1.value} : ${pointsX}`;
    $p1Name.classList.add("border");
    $p2Name.classList.remove("border");
    if ($ipt1.value == "") {
      $p1Name.innerText = `Player 1 : ${pointsX}`;
    }
    alert(`${$ipt1.value} won`);
  } else {
    ++pointsO;
    $p2Name.innerText = `${$ipt2.value} : ${pointsO}`;
    $p1Name.classList.remove("border");
    $p2Name.classList.add("border");
    if ($ipt2.value == "") {
      $p2Name.innerText = `Player 2 : ${pointsO}`;
    }
    alert(`${$ipt2.value} won`);
  }
  return;
}

let mls = 0,
  sec = 0,
  min = 0,
  hh = 0;
function clock() {
  if (stopTimer == "stop") {
    return;
  }
  if (mls < 100) {
    mls++;
  }
  if (mls == 100) {
    sec++;
    mls = 0;
  }
  if (sec == 60) {
    min++;
    sec = 0;
  }
  if (min < 10 && sec < 10 && mls < 10) {
    $timer.innerHTML = `0${min}:0${sec}:0${mls}`;
  } else if (min < 10 && sec < 10) {
    $timer.innerHTML = `0${min}:0${sec}:${mls}`;
  } else if (min < 10) {
    $timer.innerText = `0${min}:${sec}:${mls}`;
  } else {
    $timer.innerHTML = `${min}:${sec}:${mls}`;
  }
  setTimeout("clock()", 10);
}
