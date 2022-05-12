const board = document.getElementById("board");
let elem;
let cnt = 0;
let players = [];


let newArr = [];
function check(symbol){
// for(i=1; i<=9; i++){//בדיקה מאוזן
//     if(players[i]==symbol){
//         newArr.push(symbol);
//     }
    // else{
    //     newArr = [];
    // }
    // if(newArr.length==3){
    //     alert(`${symbol} win`)
    // }  
// }
 newArr = [];
for(i=1;i<=9;i++){// בדיקה מאונך
    if(players[i]==symbol){
        newArr.push(symbol);
        i+=Math.sqrt(9)-1
    }
    else{
        newArr = [];
        
    }
    if(newArr.length==3){
        alert(`${symbol} win`)
    }
}
newArr=[];
for(i=1;i<=9;i++){//בדיקה אלכסון חיובי
    if(players[i]==symbol){
        newArr.push(symbol);
        i+=Math.sqrt(9)
    }
    else{
        newArr = [];
        
    }
    if(newArr.length==3){
        alert(`${symbol} win`)
    }
}
newArr=[];
for(i=1;i<=9;i++){//בדיקה אלכסון שלילי
    if(players[i]==symbol){
        newArr.push(symbol);
        i+=Math.sqrt(9)-2
    }
    else{
        newArr = [];   
    }
    if(newArr.length==3){
        alert(`${symbol} win`)
    }
}
}



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
    e.target.innerText = 'X';
    players[e.target.id] = 'X';
    e.target.onclick = noClick
    if (cnt >= 4) {
      check('X');
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

// function check(symbol) {
   
//     if(cnt==8){
//         alert('tako')
//     }

// }

function noClick(){}
















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


// for (i = 1; i <= 9; i+=3) {
//     if (players[i] == symbol && players[i + 1] == symbol && players[i + 2] == symbol ){
//       alert(`${symbol} win`);
// }
//   }
//   for (i = 1; i <= 3; i++) {
//     if (players[i] == symbol && players[i + 3] == symbol && players[i + 6] == symbol ) {
//         alert(`${symbol} win`);
//     }
//   }
  
//     if (players[1] == symbol && players[5] == symbol && players[9] == symbol) {
//       alert(`${symbol} win`);
//     }
//     if (players[3] == symbol && players[5] == symbol && players[7] == symbol) {
//       alert(`${symbol} win`);
//     }







