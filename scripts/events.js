const slider_asset = document.getElementById("slider_asset");
const slider_value = document.getElementById("slider_value");
const custom_Grid = document.getElementById("customGrid");
const square_content = document.getElementById("squarecontent");
const click_counter = document.getElementById("clickCounter");
const clickDiv = document.getElementById("clickDiv");
const masterSquare = document.getElementById("squarecontent");
const prompt = document.getElementById("prompt");
const challengeDiv = document.getElementById("challengeDiv");

const restart_button = document.getElementById("restart");
const bicolor_button = document.getElementById("bicolor");
const challenge_button = document.getElementById("challenge");
const reset_button = document.getElementById("reset");
const go_button = document.getElementById("go_button");

const sliderdiv = document.getElementById("sliderDiv");
const squarebox = document.getElementById("squarebox");
const introtext = document.getElementById("introText");
const gameModeDiv = document.getElementById("gameMode");
const displayMode = document.getElementById("mode");
const clickPrompt = document.getElementById("clickPrompt");

//--------------------------- EVENTS --------------------------//

gameModeDiv.onclick = selectMode;

reset_button.onclick = resetGame;

go_button.onclick = gameStart;

restart_button.onclick = restart;

slider_asset.oninput = function () {
    squares = Math.pow(slider_asset.value, 2);
    slider_value.innerHTML = squares; //Display value
    initGame();
    // createDivsInSquare(slider_asset.value);
    // displayDiv(go_button, "flex");
}

slider_asset.onclick = function () {
    squares = Math.pow(slider_asset.value, 2);
    slider_value.innerHTML = squares; //Display value
    initGame();
}

slider_asset.onmouseup = function () {
    displayDiv(go_button, "flex");
}

slider_asset.onmousedown = function () {
    displayDiv(go_button, "none");
}

challengeDiv.onclick = selectDifficulty;

square_content.onclick = playColor;
square_content.onmouseover = playColor;
square_content.onmouseout = playColor;
