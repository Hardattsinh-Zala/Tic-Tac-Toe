let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".newGame");
let reset = document.querySelector(".reset");
let turn0 = true;
let count = 1;

winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetBut = () => {
    turn0 = true;
    for(let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    add();
}

const showWinner = (val) => {
    let element = document.querySelector("#win-msg");
    element.innerText = `Congratulations, Winner is ${val}.`;
}

const add = () => {
    count = 1;
    let element = document.querySelector(".winner");
    element.classList.add("hiden");
}

const remove = () => {
    count = 1;
    let element = document.querySelector(".winner");
    element.classList.remove("hiden");
}

const disableAll = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const draw = (count) => {
    let element = document.querySelector("#win-msg");
    if(count > 8) {
        remove();
        element.innerText = "DRAW";
    }
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                remove();
                showWinner(pos1);
                disableAll();
            }
        }
        
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.innerText = 'O';
            box.style.color = "red";
            turn0 = false;
        }else {
            box.innerText = 'X';
            box.style.color = "blue";
            turn0 = true;
        }
        box.disabled = true;
        draw(count);
        count++;

        checkWinner();
    });
})

reset.addEventListener("click", resetBut);
newGame.addEventListener("click", resetBut);
