let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgamebtn=document.querySelector("#newgamebtn");
let msgcon=document.querySelector(".msgcon");
let msg=document.querySelector("#msg");

let turn=true;

const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let count=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("clicked");
        if(turn===true){
            box.innerText="O";
            turn=false;
        }
        else{
            box.innerText="X";
            turn=true;
        }
        count++;
        box.disabled=true;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
          gamedraw();
        }
    });
});

const gamedraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcon.classList.remove("hide");
    disableboxes();
};

const resetgame = () => {
    count=0;
    turn=true;
    enableboxes();
    msgcon.classList.add("hide");
};

enableboxes =() => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

disableboxes =() => {
    for(let box of boxes){
        box.disabled=true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcon.classList.remove("hide");
    disableboxes();
  };

const checkWinner= () => {
    for(let pattern of winPattern){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val===pos2val && pos2val===pos3val){
                // console.log(count);
                showWinner(pos1val);
                return true;
            }
            
        }
    }
};

newgamebtn.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);