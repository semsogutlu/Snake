/*
Conrolling the snake:
- Event listener was added to body which only functions with arrows.
- Move function gets triggered every 75 ms unless snake hits the wall.
- If snake hits the wall, interval gets cancelled and eventlistener removed.
- To play again, refresh the page.
- Snake cannot get reverted, so if you are going left, the only arrows you can press are up or down.

- TODO: make time interval dynamic so the game gets harder
- TODO: as a player, I would like to re-play the game after I fail without refreshing the page.
    - display a "try-again" button that initiates the board

*/


import {MoveSnake} from './snakeActions'
import {ARROW_DOWN, ARROW_LEFT, ARROW_UP, ARROW_RIGHT} from './config'

let allowedMovesArray = [ARROW_LEFT, ARROW_DOWN, ARROW_UP, ARROW_RIGHT];
let listener;
let intervalId = 0;

export default function WireUpArrowKeys (bodyElement, snakeArray) {
    bodyElement.addEventListener("keydown", listener = (event) => {
        if(allowedMovesArray.indexOf(event.key)  > -1 ) {
            calculateMovement(bodyElement, event.key, snakeArray, document.getElementById("snake-board"));
        }        
      }
    )
};

const calculateMovement = (bodyElement, arrowKey, snakeArray, board) => {
    const boardHeight = board.clientHeight;
    const boardWidth = board.clientWidth;
    if(intervalId !== 0) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        if(arrowKey === ARROW_DOWN) {
            if(boardHeight >= snakeArray[0].y + 10) {
                snakeArray.unshift({x: snakeArray[0].x, y: snakeArray[0].y + 10})
                allowedMovesArray = [ARROW_LEFT, ARROW_RIGHT];
            }
            else {
                //hit the wall! Remove event listener and stop movement of the snake
                bodyElement.removeEventListener("keydown", listener);
                clearInterval(intervalId);
                
            }
        } else if (arrowKey === ARROW_UP) {
            
            if(snakeArray[0].y > 10) {
                snakeArray.unshift({x: snakeArray[0].x, y: snakeArray[0].y - 10})
                allowedMovesArray = [ARROW_LEFT, ARROW_RIGHT];        
            }
            else {
                //hit the wall! Remove event listener and stop movement of the snake
                bodyElement.removeEventListener("keydown", listener);
                clearInterval(intervalId);
            } 
        }

        else if (arrowKey === ARROW_RIGHT) {
            
            if(boardWidth >= snakeArray[0].x + 10) {
                snakeArray.unshift({x: snakeArray[0].x + 10, y: snakeArray[0].y})
                allowedMovesArray = [ARROW_DOWN, ARROW_UP];
            }
            else {
                //hit the wall! Remove event listener and stop movement of the snake
                bodyElement.removeEventListener("keydown", listener);
                clearInterval(intervalId);
            } 
        }

        else if (arrowKey === ARROW_LEFT) {
            if(snakeArray[0].x > 10) {
                snakeArray.unshift({x: snakeArray[0].x - 10, y: snakeArray[0].y})
                allowedMovesArray = [ARROW_DOWN, ARROW_UP];
            }
            else {
                //hit the wall! Remove event listener and stop movement of the snake
                bodyElement.removeEventListener("keydown", listener);
                clearInterval(intervalId);
            } 
        }

        MoveSnake(board, snakeArray, arrowKey, listener, bodyElement, intervalId);
    }, 75)
}

