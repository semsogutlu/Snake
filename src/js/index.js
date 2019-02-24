//Create the board, create inital postion of the snake and then wire up the controllers.

import {CreateBoard, InitiateSnake} from './init'
import WireUpArrowKeys from './wireUpControls'

const bodyElement = document.getElementsByTagName("body")[0];
CreateBoard(bodyElement);

let snakeArray = InitiateSnake();

WireUpArrowKeys(bodyElement, snakeArray);