import {GenerateFood} from './foodActions';

let board;

export function CreateBoard (bodyElement) {
    
    board = document.createElement("div");
    board.id = "snake-board"

    //The app is responsive to the width of the browser.
    //The width of the board from browser. So no horizontal scroll. 
    const browserWidth = getWidth();

    //Keeping board with divisible by 10 to deal with misalignment in various widths.
    board.style.width = browserWidth - (browserWidth % 10) + "px";
    board.className = "board";
    bodyElement.insertBefore(board, bodyElement.lastChild);
    
    //Create first food yum!
    GenerateFood(board);
    

}

export function InitiateSnake () {
    //Inital coordinates of snakehead.
    const initXCoor = (board.clientWidth / 10) - (board.clientWidth / 10 % 10);
    const initYCoor = board.clientHeight / 10;

    //This is the the representation of the snake.
    const snakeArray = [
        {x: initXCoor, y: initYCoor, element: createBlock(initXCoor, initYCoor)}
        
    ];
    
    return snakeArray;
}

const createBlock = (x, y) => {
    //Create a snake square and then put it on the board.
    const snakeSquare = document.createElement("div");
    snakeSquare.className = "snake-block";
    snakeSquare.id = "element";
    snakeSquare.style.left = x + "px";
    snakeSquare.style.top = y + "px";
    board.insertBefore(snakeSquare, board.lastChild);
    return snakeSquare;
    
}

const getWidth = () => {
    return Math.min(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}