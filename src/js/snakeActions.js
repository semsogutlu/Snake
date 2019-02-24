/*
Moving Snake
- Before the snake is moved, first the function checks if snake has eaten any food.
- If so, snake grows before move.
- Function also checks if snake hit its tail, if that's the case, game is over. Refresh the page.
- Move algoritm is smiliar to how to reverse a singly link list:
- Pop the last element then add the popped element as a new head.

- TODO: as a player, I would like to know how many food that I ate
    - display count of eaten foods.
- TODO: As a developer, I would like to check if snake hit its tail only when snake turns, 
    so that a function does not get called unnecessarily.
    - There's no chance to hit the tail unless snake turns. 

Growing Snake
- Growing snake is simple: a new square is added at the end of its tail.
- The position of the last square is determined by the which arrow is pressed.
*/

import {GenerateFood} from './foodActions';
import {ARROW_DOWN, ARROW_LEFT, ARROW_UP, ARROW_RIGHT} from './config'

export function MoveSnake (board, snakeArray, arrowKey, listener, bodyElement, intervalId) {
    
    const foodSquare = document.getElementById("yummy");
    if(snakeArray[0].x + "px" === foodSquare.style.left && snakeArray[0].y + "px" === foodSquare.style.top) {
        GenerateFood(board);
        GrowSnake(board, snakeArray, arrowKey);
    }

    checkForSnakeHittingTheTail(snakeArray, listener, bodyElement, intervalId);

    let lastElem = snakeArray.pop();
    lastElem.element.style.left = snakeArray[0].x + "px";
    lastElem.element.style.top = snakeArray[0].y + "px";
    snakeArray[0].element = lastElem.element;
}

export function GrowSnake (board, snakeArray, arrowKey) {
    
    const snakeSquare = document.createElement("div");
    snakeSquare.className = "snake-block";
    const lastIndex = snakeArray.length - 1;
    let newSnakeSquare = {};

    if(arrowKey === ARROW_DOWN) {
        newSnakeSquare.y = snakeArray[lastIndex].y - 10;
        newSnakeSquare.x = snakeArray[lastIndex].x;
        newSnakeSquare.element = snakeSquare;
        
    }
    else if (arrowKey === ARROW_UP) {
        newSnakeSquare.y = snakeArray[lastIndex].y + 10;
        newSnakeSquare.x = snakeArray[lastIndex].x;
        newSnakeSquare.element = snakeSquare;
    }
    else if (arrowKey === ARROW_LEFT) { 
        newSnakeSquare.x = snakeArray[lastIndex].x - 10;
        newSnakeSquare.y = snakeArray[lastIndex].y;
        newSnakeSquare.element = snakeSquare;
    }
    else if (arrowKey === ARROW_RIGHT) {
        newSnakeSquare.x = snakeArray[lastIndex].x + 10;
        newSnakeSquare.y = snakeArray[lastIndex].y;
        newSnakeSquare.element = snakeSquare;
    }

    snakeArray.push(newSnakeSquare);
    board.insertBefore(newSnakeSquare.element, board.lastChild);

}

const checkForSnakeHittingTheTail = (snakeArray, listener, bodyElement, intervalId) => {
    if(snakeArray.length < 4) {
        return;
    }
    const snakeHead = snakeArray[0];
    for(let i=1; i < snakeArray.length; i++) {
        if(snakeArray[i].x === snakeHead.x && snakeArray[i].y === snakeHead.y)
        {
            //die by tail
            bodyElement.removeEventListener("keydown", listener, true);
            clearInterval(intervalId);
        }
    }
}