/* 
- The function below generates a 10px by 10px vegan square and places on the board randomly to be eaten.
- The +10 and -10 on random number generator makes sure that food square is within the board.
*/

export function GenerateFood(board) {

    const existingFoodSquare = document.getElementById("yummy");
    if(existingFoodSquare) {
        existingFoodSquare.parentNode.removeChild(existingFoodSquare);
    }

    const foodSquare = document.createElement("div");
    foodSquare.className = "food-block";
    foodSquare.id = "yummy";
    foodSquare.style.left = getRandomInt(board.clientWidth) + "px";
    foodSquare.style.top = getRandomInt(board.clientHeight) + "px";
    board.insertBefore(foodSquare, board.lastChild);
}

const getRandomInt = (max) => {
    let rand = Math.floor(Math.random() * Math.floor(max));
    if(rand < 10) {
        rand = rand + 10;
    } else if (rand > max - 10) {
        rand = rand - 10;
    }
    return rand - rand % 10;
  }