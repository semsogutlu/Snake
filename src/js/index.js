//Create the board, create inital postion of the snake and then wire up the controllers.

import {CreateBoard, InitiateSnake} from './init'
import WireUpArrowKeys from './controls'
import {GenerateFood} from './foodActions';

const bodyElement = document.getElementsByTagName("body")[0];
const board = CreateBoard(bodyElement);

//Create first food yum!
GenerateFood(board);

let snakeArray = InitiateSnake();

WireUpArrowKeys(bodyElement, snakeArray);