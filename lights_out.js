//3X3 matrix for the board.
// 0="off"     1="on"
let board = [[0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]];
let level_count = document.getElementById("level_count");


let blocks = document.getElementsByClassName("block");





for (let i=0; i<25; i++) {
    blocks[i].addEventListener("click", function () {
        toggle(blocks[i]);
        if (!blocks[i].matches(".upper"))
        {
            toggle(blocks[i-5]);
        }
        if (!blocks[i].matches(".left"))
        {
            toggle(blocks[i-1]);
        }
        if (!blocks[i].matches(".bottom"))
        {
            toggle(blocks[i+5]);
        }
        if (!blocks[i].matches(".right"))
        {
            toggle(blocks[i+1]);
        }
        setTimeout(checkForWin, 100);
    })
}

animate();

function toggle(block)
{
    let name = block.id;
    let i = parseInt(name[1]);
    let j = parseInt(name[2]);
    if ( board[i][j] === 0)
    {
        block.style.backgroundColor = "gold";
        board[i][j] = 1;
    }
    else
    {
        block.style.backgroundColor = "slategray";
        board[i][j] = 0;
    }
}
//check for all blocks toggled 0
function checkForWin()
{
    for (let i=0; i<5; i++)
    {
        for (let j=0; j<5; j++)
            if (board[i][j] === 1)
                return 0;
    }
    alert("Level Passed!");
    level_count.innerText = parseInt(level_count.innerText) +1;
    animate();
}
//get current level and set up game
function levelUp() {
    let level = parseInt(level_count.innerText);
    for (let i=0; i<level; i++)
    {
        let random = Math.floor(Math.random() * 25);
        blocks[random].click();
    }

}


function animate(iter = 24) {
    flash(blocks[iter], blocks[iter].style.backgroundColor);
    if (iter+1 === parseInt(level_count.innerText)) {
        setTimeout(function () {
            flash(blocks[iter],blocks[iter].style.backgroundColor);
        }, 115);
        setTimeout(function () {
            flash(blocks[iter],blocks[iter].style.backgroundColor);
        }, 230);
        setTimeout(function(){levelUp();},500);
        return 0;
    }

    else if  (iter > 0) {
        setTimeout(function() {animate(iter -1)}, 115);
    } else {
        setTimeout(function(){levelUp();},500);


    }

}


function flash(block, color){
        toggle(block);
        setTimeout(toggle, 150, block);

}


