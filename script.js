let toggleMode=0;

let modeButton=document.querySelector("#change-mode");
let gameBox=document.querySelector(".game");

modeButton.addEventListener("click",()=>{
    toggleMode^=1;
    if(toggleMode)
    {
        document.querySelector("body").style.backgroundColor="black"; // Dark Mode
        document.querySelector("body").style.color="red";
        modeButton.innerText="Dark Mode";
        gameBox.style.color="brown";
        modeButton.style.boxShadow="3px 3px 7px white"
        modeButton.style.borderColor="white";
        document.querySelector("body").style.boxShadow="7px 7px 15px red";
    }
    else
    {
        document.querySelector("body").style.backgroundColor="white"; // Light Mode
        document.querySelector("body").style.color="brown";
        modeButton.innerText="Light Mode";
        document.querySelector("body").style.boxShadow="7px 7px 7px black";
    }
})

let turn=0;  // 0 for Player 1 and 1 for Player 2
let display=document.querySelector(".turn");
let gameOver=false;

function checkWin()
{
    let grid=[[],[],[]];
    let row=0;
    for(let i=1;i<=9;++i)
    {
        if((i-1)!=0 && (i-1)%3==0)
        ++row;
        
        let cell=document.querySelector(`#cell${i}`);
        grid[row][(i-1)%3]=cell.innerText;
    }

    for(let i=0;i<3;++i)
    {
        if(grid[i][0]===grid[i][1] && grid[i][0]===grid[i][2]  && grid[i][0]!=='-')
        {
            return true;
        }
        
        if(grid[0][i]===grid[1][i] && grid[2][i]===grid[0][i] && grid[0][i]!=='-')
        {
            return true;
        }
    }

    if(grid[0][0]===grid[1][1] && grid[0][0]===grid[2][2] && grid[0][0]!=='-')
    {
        return true;
    }

    if(grid[2][0]===grid[1][1] && grid[1][1]===grid[0][2] && grid[1][1]!=='-')
    {
        return true;
    }
    return false;
}

function isDraw()
{
    for(let i=1;i<=9;++i)
    {
        let cell=document.querySelector(`#cell${i}`);
        if(cell.innerText==='-')
        return false;
    }
    return true;
}

let reset;
function resetCells()
{
    for(let i=1;i<=9;++i)
    {
        document.querySelector(`#cell${i}`).innerText='-';
    }
    turn=0;
    gameOver=false;
    display.innerText=`Turn : Player-${turn+1}`;
    let btn=document.querySelector("#resetBtn");
    if(btn)
    btn.remove();
}

let resetButton;
function createResetButton()
{
    resetButton=document.createElement("button");
    resetButton.innerText="Reset Cells";
    resetButton.style.marginTop="10px";
    resetButton.id="resetBtn";
    resetButton.style.cursor="pointer";
    resetButton.style.backgroundColor="brown";
    resetButton.style.color="white";
    resetButton.style.boxShadow="2px 2px 5px black";
    gameBox.append(resetButton);
    reset=resetButton.addEventListener("click",()=>{
        resetCells();
    })
}
function gamePlay()
{
    display.innerText=`Turn : Player-${turn+1}`;
    for(let i=1;i<=9;++i)
    {
        let cell=document.querySelector(`#cell${i}`);
        cell.addEventListener("click",()=>{
            if(gameOver)
            return;

            if(cell.innerText!=='-')
            {
                alert("Cell Already Occupied!");
                return;
            }

            cell.innerText=(turn ? 'O' : 'X');

            if(checkWin())
            {
                display.innerText=`Player-${turn+1} Wins!`;
                gameOver=true;
                createResetButton();
                return;
                
            }
            else if(isDraw())
            {
                display.innerText="Match Draws!";
                createResetButton();
                gameOver=true;
            }
            else
            {
                turn^=1;
                display.innerText=`Turn : Player-${turn+1}`;
            }
        });
    }
}

gamePlay();