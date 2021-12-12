const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATION=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements =document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessage = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')

let circleTurn;

startGame();
restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn =false;
    cellElements.forEach(cell=> {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click",handleclick);
        cell.addEventListener("click",handleclick, {once: true});
        
    })
    setBoardHoverClass();
    winningMessage.classList.remove('show')
}

function handleclick(e){
    const cell= e.target;
    const currentClass= circleTurn ? CIRCLE_CLASS: X_CLASS;
    placemark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)

    }
    else if(isDraw()){
        endGame(true)
    }
    else {
        swapTurns()
        setBoardHoverClass()

    }
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else{
        board.classList.add(X_CLASS)
    }
}
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText= "Draw!"
    
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessage.classList.add('show')
}

function placemark(cell, currentClass){
    cell.classList.add(currentClass)

}

function isDraw(){
    return [...cellElements].every(cell=>{
        return(

            cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        );
    })
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination =>{ 
        return combination.every(index=>{    
            return cellElements[index].classList.contains(currentClass)

        })

    })

}